import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { AllstudentService } from '../../core/services/allStudent/allstudent.service';
import { Router, RouterLink } from '@angular/router';
import { Modal } from 'flowbite';
import { AllStudent } from '../../core/models/all-student.interface';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student',
  imports: [ReactiveFormsModule, FormsModule, RouterLink,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
[x: string]: any;
  private readonly allstudentService = inject(AllstudentService);
   
  private readonly router = inject(Router); 
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);


   myModal = viewChild<ElementRef>('modal');
studentData: AllStudent[]= [];
isModalOpen = false;
isLoading: boolean = false;
text:string = '';

studentForm!: FormGroup


currentPage = 1;
itemsPerPage = 5;

  ngOnInit(): void {
     
      this.initForm();
      this.getAllStudentData();
  }

initForm():void{
this.studentForm= this.fb.group({
  name: [null, [Validators.required, Validators.minLength(2)]],
  phoneNo: [null , [Validators.required , Validators.pattern(/^01[012345][0-9]{8}$/)]],
})


}
openModal(): void {
  this.isModalOpen = true;
}

closeModal(): void {
  this.isModalOpen = false;
  
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
        this.isLoading = false;
       this.closeModal();

        



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

get filteredStudents() {
  const search = this.text?.toLowerCase().trim() || '';

  return this.studentData.filter((student: any) =>
    student.name?.toLowerCase().includes(search) ||
    student.phoneNo?.toLowerCase().includes(search)
  );
}

get totalPages() {
  return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
}

get paginatedStudents() {
  const start = (this.currentPage - 1) * this.itemsPerPage;

  return this.filteredStudents.slice(
    start,
    start + this.itemsPerPage
  );
}

get pages(): number[] {
  return Array.from(
    { length: this.totalPages },
    (_, i) => i + 1
  );
}

get currentStart() {
  if (this.filteredStudents.length === 0) {
    return 0;
  }

  return (this.currentPage - 1) * this.itemsPerPage + 1;
}

get currentEnd() {
  const end = this.currentPage * this.itemsPerPage;

  return end > this.filteredStudents.length
    ? this.filteredStudents.length
    : end;
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}


}
