import { currentStudents, Student } from './../../../../core/models/student.interface';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, output, SimpleChange, SimpleChanges } from '@angular/core';
import { StudentService } from '../../../../core/services/student/student.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SearchPipe } from '../../../../shared/pipes/search-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllstudentService } from '../../../../core/services/allStudent/allstudent.service';

@Component({
  selector: 'app-availabel',
  imports: [SearchPipe, ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './availabel.component.html',
  styleUrl: './availabel.component.css',
})
export class AvailabelComponent implements OnInit , OnChanges {
  private readonly studentService = inject(StudentService);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly allstudentService = inject(AllstudentService);
@Output() studentAdded = new EventEmitter<currentStudents>();
 @Input() refreshTrigger!: boolean;

id: number | null = null;
eventData:any = null;
 studentList: Student[] = [];
 currentStudents :currentStudents[] = [];
 availabelStudents:Student[] = [];


  availableSearch: string = '';
  availableEntries: number = 5;


  ngOnInit(): void {
this.getAvailabel();
      
  }


   ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      // 🔥 سيتم تنفيذ هذا عند أي تغيير في refreshTrigger من الـ parent
      this.getAvailabel();
    }
  }
// getIdData(): void {
//   this.activatedRoute.paramMap.subscribe({
//     next: (params) => {
//       const idParam = params.get('id');
//       if (idParam) {
//         this.id = +idParam;
//         this.getAvailabel(this.id);
//       }
//     },
//   });
// }


  getAvailabel(): void {
  const eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  this.studentService.getDetails(eventId).subscribe({
    next: (eventRes) => {

      // الطلاب الموجودين في الحدث
      const eventStudentIds = (eventRes.currentStudents || []).map(
        (s: any) => s.studentId ?? s.id
      );

      // هات كل الطلاب
      this.allstudentService.getAllStudent().subscribe({
        next: (allStudents) => {

          // شيل اللي موجودين في الحدث
          this.studentList = allStudents
            .filter((s: any) => !eventStudentIds.includes(s.id))
            .map((s: any) => ({
              ...s,
              selected: false
            }));

        },
        error: (err) => console.log(err),
      });
    },
    error: (err) => console.log(err),
  });
}


//   getAvailabel():void{
//       const eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
//  this.studentService.getDetails(eventId).subscribe({
//     next: (eventRes) => {
//      const eventStudentIds = (eventRes.eventStudents || []).map(
//         (es: any) => es.studentId
//       );
      

//       // 2️⃣ هات كل الطلاب
//       this.allstudentService.getAllStudent().subscribe({
//         next: (allStudents) => {
//           // 3️⃣ شيل اللي موجودين في الـ Event
//           this.studentList = allStudents.filter(
//             (s: any) => !eventStudentIds.includes(s.id)
//           );
//         },
//         error: (err) => console.log(err),
//       });
//     },
//     error: (err) => console.log(err),
//   });
// }

  submitStudent(e: Event): void {
  e.preventDefault();
    const eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  const selectedStudent = this.studentList.filter(
    Student =>Student.selected
  );
  if(selectedStudent.length === 0){
    this.toastrService.warning('select only student');
    return;
  }
  selectedStudent.forEach(student => {
    this.studentService.AddStudent(eventId, student.id).subscribe({
      next: (res) => {
        console.log(res);
        const newCurrent: currentStudents = {
          id: student.id,
          studentId: student.id,
          studentName: student.name,
          studentPhoneNo: student.phoneNo,
          selected: false,
        };

        // إزالة الطالب من الطلاب المتاحين
        this.studentList = this.studentList.filter(s => s.id !== student.id);

        // إرسال الطالب للمكون الأب
        this.studentAdded.emit(newCurrent);
        // شيل الطالب من الليست
      
      },
      error: (err) => {
        console.log(err);
        
        this.toastrService.error(`فشل إضافة الطالب ${student.name}`);
      }
    });
  });
      
  this.toastrService.success('Add Success');

    }
    
  }

  

  

