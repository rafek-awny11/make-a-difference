import { Meeting } from './../../../../core/models/meeting.interface';
import { MeetingService } from './../../../../core/services/meeting/meeting.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-meeting',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './update-meeting.component.html',
  styleUrl: './update-meeting.component.css',
})
export class UpdateMeetingComponent implements OnInit {
  private readonly meetingServic =inject(MeetingService);
  private readonly fb = inject(FormBuilder)
  private readonly router =inject(Router)
  private readonly route =inject(ActivatedRoute)

updateForm!:FormGroup
update:Meeting={
  id: 0,
  name: '',
  eventId: 0,
  eventName: '',
  meetingTime: ''
}


  ngOnInit(): void {
    this.initForm();
  const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getUpDateData(id);
      
  }

  
initForm():void{
this.updateForm= this.fb.group({
  name: [null, [Validators.required, Validators.minLength(2)]],
  eventName: [null, [Validators.required, Validators.minLength(2)]],
  meetingTime:[null , [Validators.required]]
  
})
}

getUpDateData(id:number):void{
  this.meetingServic.updateDate(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.update=res;
      this.updateForm.patchValue({
        name: res.name,
        eventName: res.eventName,
        meetingTime: res.meetingTime,
        
        
      })
      this.updateForm.get('eventName')?.disable();

     
      
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


  UpdateStudent():void{

    if(this.updateForm.valid){
      const payload = {
  id: this.update.id,
  eventId: this.update.eventId,           // لازم موجود
  ...this.updateForm.getRawValue()        // يشمل name, eventName, meetingTime
};
      this.meetingServic.updateAll(payload).subscribe({
        next:(res)=>{
          console.log('update',res);

          this.router.navigate(['/details-meeting' , this.update.id])

          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  }

}
