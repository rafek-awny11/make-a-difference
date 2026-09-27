import { Meeting } from './../../core/models/meeting.interface';
import { Component, inject, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../core/services/student/student.service';
import { CookieService } from 'ngx-cookie-service';
import { AvailabelComponent } from './availabel/availabel/availabel.component';
import { Student, currentStudents } from '../../core/models/student.interface';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { AttendanceService } from '../../core/services/attendance/attendance.service';
import { MeetingService } from '../../core/services/meeting/meeting.service';
import { Attendance1 } from '../../core/models/attendance.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SearchPipe, AvailabelComponent,],
})
export class DetailsComponent implements OnInit  {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly studentService = inject(StudentService);
  private readonly toastrService = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  private readonly attendanceService =inject(AttendanceService)
  private readonly meetingService =inject(MeetingService)
  private readonly router =inject(Router)


  id: number | null = null;
  eventData: any = null;

  allattendance:Attendance1 []=[]
  

  currentStudents: currentStudents[] = [];
  availableStudents: Student[] = [];

  refreshAvailable: boolean = false;

  
  currentEventId: number = 1;

  currentEntries: number = 5;
currentSearch: string = '';

  studentPhone: string = '';
meetingId: number | null = null;
allMeeting:Meeting[]=[]



showModal: boolean = false;
item: any;



  ngOnInit(): void {
    this.getIdData();
    this.getAllMeetings();
    
  }

  getIdData(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.getDetailsData(this.id);
      }
    });
  }

  getDetailsData(id: number): void {
    this.studentService.getDetails(id).subscribe({
      next: (res) => {
        console.log('Event data:', res);
        this.eventData = res;
        this.currentEventId = id;
        // this.allMeeting = res.meeting || [];

        // Map current students
        this.currentStudents =
          res.currentStudents?.map((s: any) => ({
            id: s.id,
            studentId: s.studentId ?? s.id,
            studentName: s.studentName ?? s.name,
            studentPhoneNo: s.studentPhoneNo ?? s.phoneNo,
            eventStudentId: s.eventStudentId ?? s.id,
            selected: false,
          })) || [];

        // Map available students
        this.availableStudents =
          res.availableStudents?.map((s: any) => ({
            ...s,
            selected: false,
          })) || [];
      },
      error: (err) => console.error(err),
    });
  }

  deleteSelectedStudents(): void {
  const selected = this.currentStudents.filter(s => s.selected);
  if (!selected.length) {
    this.toastrService.error('No student selected');
    return;
  }

  selected.forEach(student => {
    this.studentService.DeleteStudent(student.eventStudentId!).subscribe({
      next: () => {
        this.currentStudents = this.currentStudents.filter(
          s => s.eventStudentId !== student.eventStudentId
        );
       
        this.toastrService.success('Student deleted successfully');
      this.refreshAvailable = !this.refreshAvailable;
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Error deleting student');
      }
    });
  });
}


onStudentAdded(student: currentStudents): void {
  this.currentStudents.push(student);
  this.toastrService.success('Student added successfully');
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
goToPage(): void {
  this.router.navigate(
    ['/show-details', this.eventData?.name, this.id],
    {
      state: {
        eventId: this.id
      }
    }
  );
}


// goToPage(item: any) {
//   console.log('Go to page', item);
//    const filteredData = this.allattendance.filter(x =>
//     x.meeting?.id === item.meeting?.id). 
//   map(x => ({

//       'الأسم': x.eventName,

//       'الاجتماع': x.meeting?.name,

//       'وقت الاجتماع': x.meeting?.startTime,

//       'وقت الحضور': x.attendanceTime,

//       'التأخير (د)': this.calculateDelay(
//         x.meeting?.startTime,
//         x.attendanceTime
//       )

//     }));


//   // لو عندك Router
//   this.router.navigate(
//   ['/show-details', this.eventData?.name, this.id],
//   {
//     state: {
//       data: filteredData,
//       eventId: this.id
//     }
//   }
// );
   
// }
  calculateDelay(startTime: any, attendanceTime: string): any {
    throw new Error('Method not implemented.');
  }


}