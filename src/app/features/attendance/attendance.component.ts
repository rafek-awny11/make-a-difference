import { Meeting } from './../../core/models/meeting.interface';
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { AttendanceService } from '../../core/services/attendance/attendance.service';
import { Router, RouterLink } from "@angular/router";
import { Attendance, Attendance1 } from '../../core/models/attendance.interface';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../core/services/student/student.service';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


(pdfMake as any).vfs = (pdfFonts as any).vfs;


@Component({
  selector: 'app-attendance',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, SearchPipe, RouterLink],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})


export class AttendanceComponent implements OnInit {
  [x: string]: any;
  private readonly attendanceService =inject(AttendanceService);
  private readonly studentService =inject(StudentService);
  private readonly toastrService =inject(ToastrService);
  private readonly router=inject(Router);
  
  

  



allattendance:Attendance1 []=[]
  text:string='';

  ngOnInit(): void {
      this.allAttendance();
  }


 allAttendance(): void {
  this.attendanceService.getAllAttendance().subscribe({
    next: (res) => {
      console.log(res);
      this.allattendance = res; // 
    },
    error: (err) => {
      console.log(err);
    }
  });
}
selectedFile!: File;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}




toggleMenu(selectedItem: any) {
  this.allattendance.forEach(item => item.showMenu = false);
  selectedItem.showMenu = !selectedItem.showMenu;

  
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
//   this.router.navigate(['/show-details'],{
//      state: {
//       data: filteredData
//     }
//   });
//    item.showMenu = false;
// }



 @HostListener('document:click')
  clickOutside() {
    this.allattendance.forEach(item => item.showMenu = false);
  }


  calculateDelay(startTime: any, attendanceTime: any): string {

  const meetingDate = new Date(startTime).getTime();

  const attendanceDate = new Date(attendanceTime).getTime();

  const diffMinutes = (attendanceDate - meetingDate) / 60000;

  return diffMinutes.toFixed(1);

}





}
