import { Student } from './../../../core/models/student.interface';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AllstudentService } from '../../../core/services/allStudent/allstudent.service';
import { AllStudent } from '../../../core/models/all-student.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements OnInit {
  private readonly allstudentService = inject(AllstudentService);
   private readonly route = inject(ActivatedRoute);
   private fb = inject(FormBuilder);
   private router = inject(Router);
   private readonly toastrService =inject(ToastrService)


   studentForm!: FormGroup
   student : AllStudent ={
    id: 0,
    name: '',
    phoneNo: '',
    barcodeId: null
   };
   isLoading:boolean =false
ngOnInit(): void {
    this.initForm();
  const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getUpDateData(id);
  
}


initForm():void{
this.studentForm= this.fb.group({
  name: [null, [Validators.required, Validators.minLength(2)]],
  phoneNo: [null , [Validators.required , Validators.pattern(/^01[012345][0-9]{8}$/)]],
})
}


getUpDateData(id:number):void{
  this.allstudentService.upDateStudent(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.student= res ;
       this.studentForm.patchValue({
        name: this.student.name,
        phoneNo: this.student.phoneNo
      });
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

UpdateStudent():void{
   if (this.studentForm.invalid) return;
     this.isLoading = true;
      this.allstudentService.update({ id: this.student.id, ...this.studentForm.value }).subscribe({
        next: (res) => {
          console.log('Updated:', res),
        this.router.navigate(['/studentDetails', this.student.id]);
        this.toastrService.success('Done Update')
         this.isLoading = false;

        },
        error: (err) => {console.log(err)
             this.isLoading = false;
        this.toastrService.error('Error'          
        );
        }

      });
    
  }

}

