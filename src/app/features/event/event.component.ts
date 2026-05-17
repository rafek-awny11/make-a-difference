import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { initFlowbite, Modal } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { EventService } from '../../core/services/event/event.service';
import { Event } from '../../core/models/event.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [ReactiveFormsModule, SearchPipe, FormsModule, RouterLink , CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  eventList: Event[] = [];
  myModal = viewChild<ElementRef>('modal');
eventForm!: FormGroup 
  isLoading: boolean = false;
  text: string = '';



  isModalOpen = false;



  ngOnInit(): void {

    this.initForm();
    this.getAllEventData();
  }

  

  initForm():void{
    this.eventForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    from: [null, [Validators.required]],
    to: [null, [Validators.required]],
    })
  }

  openModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}


  

  getAllEventData(): void {
    this.eventService.getAllEvent().subscribe({
      next: (res) => {
        console.log(res);
        this.eventList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitForm(): void {
    if (this.eventForm.valid) {
      this.isLoading = true;
      this.eventForm.markAllAsTouched();
     
    

      this.eventService.eventForm(this.eventForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res && typeof res === 'object' && (res.status === 'success' || res.message)) {
            this.toastrService.success(res.message || 'creat Event');
          } else {
            this.toastrService.success('Creat EVevt');
          }

          this.getAllEventData();
          this.eventForm.reset();

          this.isLoading = false;
          this.closeModal();
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.toastrService.success('no Creat EVevt');
        },
      });
    }
  }

  removeEvent(id: number): void {
    this.eventService.removeEventId(id).subscribe({
      next: (res) => {
        console.log(res, 'delete');
        this.getAllEventData();
        if (res && typeof res === 'object' && (res.status === 'success' || res.message)) {
          this.toastrService.success(res.message || 'Student added successfully');
        } else {
          this.toastrService.success('delete');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
