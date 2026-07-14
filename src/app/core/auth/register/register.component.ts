import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {


  private readonly authService =inject(AuthService)

  private readonly fb =inject(FormBuilder)
  private readonly router =inject(Router)
  private readonly toastrService =inject(ToastrService)


registerForm!: FormGroup 
isLoading:boolean =false
msgErorr:string = "";


ngOnInit(): void {

  this.initForm();
}

initForm(): void{
 this.registerForm = this.fb.group({
      userName:[null, [Validators.required , Validators.minLength(2), Validators.maxLength(20)]],
      password:[null, [Validators.required ]],
      email:[null, [Validators.required , Validators.email]],
      phone:[null, [Validators.required , Validators.pattern(/^01[012345][0-9]{8}$/)]]
    })
}
 

  


  submitForm():void{
    if(this.registerForm.valid){
      this.isLoading =true
      
    console.log(this.registerForm);
    this.authService.registerForm(this.registerForm.value).subscribe({
      next:(res) =>{
        console.log(res);
        if(res.message === "Success"){

          setTimeout(() =>{
            this.msgErorr= "";
            this.router.navigate(['/login']);

          },2000);

        }
this.isLoading= false
          
        
      },
      error:(err) =>{
        console.log(this.msgErorr);

      this.msgErorr = err.message.errors.errorMessage;
      this.toastrService.error('error')


        this.isLoading= false
      }

    })

    }else{
      this.registerForm.markAllAsTouched();
    }
    
  }

}
