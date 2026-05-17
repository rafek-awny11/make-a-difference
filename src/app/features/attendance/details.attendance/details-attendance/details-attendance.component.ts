import { Meeting } from './../../../../core/models/meeting.interface';
import { Attendance, Attendance1, Attendance2 } from './../../../../core/models/attendance.interface';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event/event.service';
import { MeetingService } from '../../../../core/services/meeting/meeting.service';
import { AttendanceService } from '../../../../core/services/attendance/attendance.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event } from '../../../../core/models/event.interface';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-details-attendance',
  imports: [CommonModule, ReactiveFormsModule, ZXingScannerModule, FormsModule, RouterLink],
  templateUrl: './details-attendance.component.html',
  styleUrl: './details-attendance.component.css',
})
export class DetailsAttendanceComponent implements OnInit {
  private readonly attendanceService =inject(AttendanceService)
  private readonly eventService =inject(EventService)
  private readonly meetingService =inject(MeetingService)
  private readonly fb =inject(FormBuilder)
  private readonly toastrService = inject(ToastrService)
  private readonly router = inject(Router);


creat:Meeting[]=[];
event:Event[]=[];
formattendance!:FormGroup
allMeeting:Meeting[]=[]
scannedResult: string = '';
lastScannedCode: string = '';
isScannerEnabled: boolean = false;
isFormReady: boolean = false;
scannedCodes: Set<string> = new Set();
attendanceinter:Attendance[]=[];
attendancebarcode:Attendance2[]=[];
Attendance:Attendance1[]=[];

attendanceList: any[] = [];
isLoading: boolean = false;
showTables: boolean = false;
isProcessing: boolean = false;


previousEventId: any;
previousMeetingId: any;

filteredMeetings: Meeting[] = [];



// successSound = new Audio('assets/sounds/success.mp3');


ngOnInit(): void {


    this.initForm();
    this.getAttendance();
    this.getAllMeetings();
    this.watchForm();
    

    
    
}


initForm():void{
  this.formattendance=this.fb.group({
  name: [null, [Validators.required, Validators.minLength(2)]],
  eventId: [null, [Validators.required,]],
  meetingTime: [null, Validators.required],
  meetingId: [null, Validators.required] 
  })
}

@HostListener('window:beforeunload', ['$event'])
beforeUnloadHandler(event: BeforeUnloadEvent): void {

  // لو فيه بيانات مكتوبة أو طلاب متسجلين
  if (
    this.formattendance?.dirty ||
    this.Attendance.length > 0
  ) {

    event.preventDefault();
    event.returnValue = '';

  }

}


watchForm(): void {

  this.formattendance.get('eventId')?.valueChanges.subscribe((eventId) =>{
    this.filteredMeetings = this.allMeeting.filter(
      meeting => meeting.eventId == eventId
    );
    this.formattendance.patchValue({
      meetingId:null
    });


  })


  this.formattendance.valueChanges.subscribe((value) => {

    // لو في students اتعمل لهم scan بالفعل
    if (this.Attendance.length > 0) {
      Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'عند التغير ستفقد بيانات الحاضرين هل تريد التغير',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          // إذا ضغط نعم → مسح البيانات
          this.Attendance = [];
          this.attendancebarcode = [];
          this.isScannerEnabled = false;
          this.showTables = false;
          this.scannedCodes.clear();
        } else {
          // لو ضغط لا → ارجع الاختيار القديم
          this.formattendance.patchValue({
            eventId: this.formattendance.value.eventId,
            meetingId: this.formattendance.value.meetingId
          }, { emitEvent: false });
        }
      });
    }

    this.isFormReady = !!(value.eventId && value.meetingId);
  });
}






getAttendance():void{
  this.eventService.getAllEvent().subscribe({
    next:(res)=>{
      console.log(res);
      this.event = res;

       
   
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

getAllMeetings(): void {
  this.meetingService.getAllMeeting().subscribe({
    next: (res) => {
      console.log(res);
      this.allMeeting = res;
    },
    error: (err) => {
      console.log(err);
    }
  });
}
onCodeResult(result: string) {
   const numericValue = Number(result);

    if (this.isProcessing) return;

  this.isProcessing = true;

  if (isNaN(numericValue)) {
     this.isProcessing = false;
    console.log('QR مش رقم ');
    return;
  }

  const alreadyScanned = this.Attendance.some(
    s => s.studentId === numericValue
  );

  if (alreadyScanned) {
    this.toastrService.warning('already registered');
    console.log('already registered');
     this.isProcessing = false;
    return;
  }

  

  const attendanceData = {
    barcodeId: result,
    eventId: this.formattendance.value.eventId,
    meetingId: this.formattendance.value.meetingId,
    meetingTime: this.formattendance.value.meetingTime
  };

const existsInApi = this.attendanceList.some(
  s => s.studentId === numericValue
);

if (existsInApi) {
  this.toastrService.warning('already registerad');
   this.isProcessing = false;
  return;
}



  this.attendanceService.getStudentData(numericValue.toString()).subscribe({
    next: (res) => {

       if (this.scannedCodes.has(res.id.toString())) {
    this.toastrService.warning('already registered');
    console.log('already registered');
    this.isProcessing = false;
    
    return;
  }
      console.log("Success:", res);

  const scanTime = new Date();
      this.showTables = true;
    const selectedEvent = this.event.find(
  e => e.id == this.formattendance.value.eventId
);

const selectedMeeting = this.allMeeting.find(
  m => m.id == this.formattendance.value.meetingId
);
  this.scannedCodes.add(res.id.toString());

// جدول 1 (سريع)
this.attendancebarcode =[{
  name: res.name,
  barcodeId: result,
  studentId: res.id,
  scanTime: scanTime
}];

// جدول 2 (الكامل)
this.Attendance.unshift({
  id: 0,
   studentId: res.id,
  studentName: res.name,
  studentPhone: '',
  eventName: selectedEvent?.name || '---',
  meetingName: selectedMeeting?.name || '---',
  attendanceTime: scanTime.toISOString(),
  isAbsent: false,
  meeting: {} as any
});

this.toastrService.success('success ')
// this.successSound?.play();  
 
       this.isProcessing = false;
      


   

    },
    
    
   error: (err) => {
  console.log(err);

  if (err.status === 400 || err.status === 409) {
    this.toastrService.warning('الطالب مسجل بالفعل ❌');

    // ✅ مهم: شيله من الـ Set علشان لو حب يعيد المحاولة
    this.scannedCodes.delete(numericValue.toString());

  } else {
    this.toastrService.error('error');
  }

 this.isLoading = false;
this.isProcessing = false;

}
  });

  
}
// دالة trackBy للـ *ngFor
  trackByBarcodeId(index: number, item: Attendance1): string | number {
    return item.studentId; // لازم يكون unique لكل طالب
  }





startScanner(): void {
  if (!this.isFormReady) {
    console.log('اختار Event و Meeting الأول');
    return;
  }

  this.isScannerEnabled = true;
}

// creat
CreatStudent(): void {
  if (this.Attendance.length === 0) {
    this.toastrService.error('NO Select');
    return;
  }

  const meetingStudents = this.Attendance.map((student) => ({
    studentId: student.studentId,
    meetingId: this.formattendance.value.meetingId,
    attendanceTime: student.attendanceTime
  }));

  const body = {
    meetingStudents: meetingStudents
  };
    this.isLoading = true;

  console.log(body);

  this.attendanceService.creat(body).subscribe({
    next: (res) => {
      console.log(res);
      this.toastrService.success('Students Added');
            this.isLoading = false;
 this.router.navigate(['/attendance']);

    },
    error: (err) => {
      console.log(err);
      this.toastrService.error('error');
       this.isLoading = false;
    }
  });
}

removeStudent(studentId: number): void {
  Swal.fire({
    title: 'Delete student?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then(result => {
    if (result.isConfirmed) {

      this.Attendance = this.Attendance.filter(
        student => student.studentId !== studentId
      );

      this.attendancebarcode = this.attendancebarcode.filter(
        item => item.studentId !== studentId
      );

      this.scannedCodes.delete(studentId.toString());

      this.toastrService.success('Deleted');
    }
  });
}

}






