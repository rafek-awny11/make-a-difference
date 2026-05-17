import { Event } from './../../../../core/models/event.interface';
import { Component, inject, OnInit } from '@angular/core';
import { MeetingService } from '../../../../core/services/meeting/meeting.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Meeting } from '../../../../core/models/meeting.interface';
import { EventService } from '../../../../core/services/event/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-meeting',
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.css',
})
export class CreateMeetingComponent implements OnInit {
  private readonly meetingService =inject(MeetingService);
  private readonly fb =inject(FormBuilder);
  private readonly route =inject(ActivatedRoute);
  private readonly router =inject(Router);
  private readonly toastrService =inject(ToastrService)
  private readonly eventService =inject(EventService)


  creat:Meeting []=[];
  event:Event[]=[]
  creatForm!:FormGroup
  isLoading:boolean=false;

ngOnInit(): void {
  this.initForm();
  this.getEvent();
   if (this.event.length > 0) {
      const firstEvent = this.event[0];
      this.creatForm.patchValue({
        eventId: firstEvent.id,
        
      });
    }
    
}

initForm():void{
  this.creatForm=this.fb.group({
  name: [null, [Validators.required, Validators.minLength(2)]],
  eventId: [null, [Validators.required,]],
  meetingTime: [null, Validators.required]
  })

}
getEvent():void{
  this.eventService.getAllEvent().subscribe({
    next:(res)=>{
      console.log(res);
      this.event = res;

       if (this.event.length > 0) {
        this.creatForm.patchValue({
          eventId: this.event[0].id
        });
      }
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
   // datetime-local
  const now = new Date();
  const formattedNow = this.formatDateTimeLocal(now);
  this.creatForm.patchValue({ meetingTime: formattedNow });
}

//  datetime-local
formatDateTimeLocal(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); 
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}




  creatMeeting():void{
    if(this.creatForm.valid){
      this.isLoading=true;

      this.meetingService.meetingCreat(this.creatForm.value).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.toastrService.success('creat Meeting');
        this.router.navigate(['/meeting'])


        this.isLoading=false;
      },
      error:(err)=>{
        console.log(err);
        this.toastrService.success('No creat Meeting');
        this.isLoading=false;
        
      }
    })

    }
    
  }

  

}

