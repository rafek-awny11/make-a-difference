import { Event } from './../../../../core/models/event.interface';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AttendanceService } from '../../../../core/services/attendance/attendance.service';
import { StudentService } from '../../../../core/services/student/student.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meeting } from '../../../../core/models/meeting.interface';
import { ToastrService } from 'ngx-toastr';
import { MeetingService } from '../../../../core/services/meeting/meeting.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-details',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css',
})
export class ShowDetailsComponent implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly studentService = inject(StudentService);
  private readonly meetingService = inject(MeetingService);

  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);

  data: any[] = [];
  allMeeting: Meeting[] = [];
  meetingId: number | null | undefined = undefined;
  id: number | null = null;
  eventData: any = null;
  studentPhone: string = '';

  eventId: number | null = null;
  eventName: string = '';

  eventList: Event[] = [];
  filteredMeetings: Meeting[] = [];
  showTable: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.data = history.state?.data || [];
    }

    this.activatedRoute.paramMap.subscribe((params) => {
      this.eventName = params.get('name') || '';

      this.id = Number(params.get('id'));

      console.log(this.id);

      this.getAllMeetings();
    });
  }

  getAllMeetings(): void {
    this.meetingService.getAllMeeting().subscribe({
      next: (res) => {
        this.allMeeting = res;
        this.filteredMeetings = this.allMeeting.filter((meeting) => meeting.eventId === this.id);
        console.log(this.filteredMeetings);
        this.meetingId = undefined;
      },
      error: (err) => console.log(err),
    });
  }

  exportAttendanceExcel(): void {
    if (!this.id) {
      this.toastrService.error('Event Id not found');
      return;
    }

    this.attendanceService
      .exportFile(this.id, this.meetingId || undefined, this.studentPhone)
      .subscribe({
        next: async (res: Blob) => {
          if (res.type.includes('application/json')) {
            const text = await res.text();

            const errorResponse = JSON.parse(text);

            this.toastrService.error(errorResponse.message);

            return;
          }

          const blob = new Blob([res], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');

          a.href = url;
          const meeting = this.allMeeting.find((x) => x.id == this.meetingId);

          const fileName = meeting?.name || 'حضور الاجتماعات';

          a.download = `${fileName}.xlsx`;

          a.click();

          window.URL.revokeObjectURL(url);

          this.toastrService.success('Excel downloaded successfully');
        },

        error: (err) => {
          console.log(err);
          this.toastrService.error('Download failed');
        },
      });
  }

  confirmExport(): void {
    this.exportAttendanceExcel();
  }



  showAttendance(): void {

  if (!this.id) {
    this.toastrService.error('Event Id not found');
    return;
  }

  this.attendanceService
    .showAttendance(
      this.id,
      this.meetingId || undefined,
      this.studentPhone
    )
    .subscribe({

      next: (res) => {

        this.eventList = res;
        console.log(res);
        

        this.showTable = true;

      },

      error: (err) => {
        console.log(err);
        this.toastrService.error('Failed to load data');
      }

    });

}


}
