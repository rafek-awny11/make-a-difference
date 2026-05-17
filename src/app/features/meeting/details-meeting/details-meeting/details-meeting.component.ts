import { Component, inject,  OnInit } from '@angular/core';
import { MeetingService } from '../../../../core/services/meeting/meeting.service';
import { Meeting } from '../../../../core/models/meeting.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details-meeting',
  imports: [CommonModule,RouterLink],
  templateUrl: './details-meeting.component.html',
  styleUrl: './details-meeting.component.css',
})
export class DetailsMeetingComponent implements OnInit{
  private readonly meetingService =inject(MeetingService);
  private readonly route =inject(ActivatedRoute);

  update:boolean =false

 


  
  meeting!:Meeting ;




  ngOnInit(): void {
const id = Number(this.route.snapshot.paramMap.get('id'));

if (id) {
  this.getDetails(id);
  }
}

  getDetails(id:number):void{
    this.meetingService.detailsMeeting(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.meeting=res
        
      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }
  onUpdateClick() {
  this.update = true;
}


}
