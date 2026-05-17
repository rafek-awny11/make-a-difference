import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { AllstudentService } from '../../core/services/allStudent/allstudent.service';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite, Modal } from 'flowbite';
import { AllStudent } from '../../core/models/all-student.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  imports: [ReactiveFormsModule, FormsModule, SearchPipe, RouterLink],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  private readonly allstudentService = inject(AllstudentService);
  constructor(private FlowbiteService: FlowbiteService){}
  private readonly router = inject(Router); 
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

studentData: AllStudent[]= [];
 myModal = viewChild<ElementRef>('modal');

isLoading: boolean = false;
text:string = '';

studentForm!: FormGroup

  ngOnInit(): void {
      this.FlowbiteService.loadFlowbite((flowbit)=>{
        initFlowbite();
      });
      this.initForm();
      this.getAllStudentData();
  }

initForm():void{
this.studentForm= this.fb.group({
  name: [null, [Validators.required, Validators.minLength(2)]],
  phoneNo: [null , [Validators.required , Validators.pattern(/^01[012345][0-9]{8}$/)]],
})


}
closeModal(): void {
  const modalEl = this.myModal()?.nativeElement;
  if (!modalEl) return;
   document.getElementById('open-modal-btn')?.focus();

  const modal = new Modal(modalEl);
  modal.hide();
}
  


  getAllStudentData(): void{
    this.allstudentService.getAllStudent().subscribe({
      next:(res)=>{
        console.log(res);
        this.studentData=res;
        
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
  }

submitForm():void{
   if (this.studentForm.valid) {
      this.isLoading = true;
  this.allstudentService.studentCreat(this.studentForm.value).subscribe({
    next:(res)=>{
      console.log(res);
       if (res && typeof res === 'object' && (res.status === 'success' || res.message)) {
            this.toastrService.success(res.message || 'creat Student');
          } else {
            this.toastrService.success('Creat Student');
          }
          this.studentForm.reset(); // 👈 مهم
      this.getAllStudentData(); 
       this.closeModal();

          this.isLoading = false;



      setTimeout(() => {
            this.router.navigate(['/studentDetails', res.id]);
          }, 1000);

      
    },
    error:(err)=>{
      console.log(err);
       this.isLoading =false;
      
    }

  })
   }
}


  removeStudent(id:number):void{
    this.allstudentService.removeStudentData(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllStudentData();
         if (res && typeof res === 'object' && (res.status === 'success' || res.message)) {
          this.toastrService.success(res.message || 'Student added successfully');
        } else {
          this.toastrService.success('delete');
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
