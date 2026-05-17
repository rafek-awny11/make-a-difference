import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { RouterLink } from "@angular/router";
import { MeetingService } from '../../core/services/meeting/meeting.service';
import { Meeting } from '../../core/models/meeting.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting',
  imports: [FormsModule, ReactiveFormsModule, SearchPipe, RouterLink],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css',
})
export class MeetingComponent implements OnInit {
  private readonly meetingService = inject(MeetingService);
private readonly toastrService =inject(ToastrService);


allmeeting:Meeting[] = [];

  text: string = '';



  ngOnInit(): void {
      this.allMeeting();
  }

  allMeeting():void{
    this.meetingService.getAllMeeting().subscribe({
      next:(res) =>{
        console.log(res);
        this.allmeeting=res;

        
      },
      error:(err) =>{
        console.log(err);
        
      }
    })

  }

  removeData(id:number):void{
    this.meetingService.removeMeeting(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.allMeeting();
        this.toastrService.success('Delete Meeting ')
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

}
