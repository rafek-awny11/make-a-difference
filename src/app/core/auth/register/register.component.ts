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
showPassword: boolean = false;

passwordApiErrors: string[] = [];
ngOnInit(): void {

  this.initForm();
}

initForm(): void{
 this.registerForm = this.fb.group({
      userName:[null, [Validators.required , Validators.minLength(2), Validators.maxLength(20)]],
      password: [
  null,
  [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
  ]
],
      email:[null, [Validators.required , Validators.email]],
      phone:[null, [Validators.required , Validators.pattern(/^01[012345][0-9]{8}$/)]]
    })
}
 

  
submitForm(): void {

  this.msgErorr = '';
  this.passwordApiErrors = [];

  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;

  this.authService.registerForm(this.registerForm.value).subscribe({

    next: (res) => {

      console.log(res);

      this.isLoading = false;

      if (res.status === true || res.message === 'Success') {

        this.toastrService.success('Account created successfully');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

        return;
      }

      // Backend validation errors
      if (res.status === false && typeof res.message === 'object') {

        const errors = res.message;

        if (errors.PasswordRequiresDigit) {
          this.passwordApiErrors.push(
            'Password must contain at least one number.'
          );
        }

        if (errors.PasswordRequiresNonAlphanumeric) {
          this.passwordApiErrors.push(
            'Password must contain at least one special character.'
          );
        }

        if (errors.PasswordRequiresUpper) {
          this.passwordApiErrors.push(
            'Password must contain at least one uppercase letter.'
          );
        }

        if (errors.PasswordTooShort) {
          this.passwordApiErrors.push(
            'Password is too short.'
          );
        }

        return;
      }

      // أي error عادي من الـ API
      if (typeof res.message === 'string') {
        this.msgErorr = res.message;
      }
    },

    error: (err) => {

      console.log(err);

      this.isLoading = false;

      this.msgErorr =
        err?.error?.message ||
        'Something went wrong. Please try again.';
    }

  });
}

//   submitForm():void{
//     if(this.registerForm.valid){
//       this.isLoading =true
      
//     console.log(this.registerForm);
//     this.authService.registerForm(this.registerForm.value).subscribe({
//       next:(res) =>{
//         console.log(res);
//         if(res.message === "Success"){

//           setTimeout(() =>{
//             this.msgErorr= "";
//             this.router.navigate(['/login']);

//           },2000);

//         }
// this.isLoading= false
          
        
//       },
//       error:(err) =>{
//         console.log(this.msgErorr);

//       this.msgErorr = err.message.errors.errorMessage;
//       this.toastrService.error('error')


//         this.isLoading= false
//       }

//     })

//     }else{
//       this.registerForm.markAllAsTouched();
//     }
    
//   }
togglePassword(): void {
  this.showPassword = !this.showPassword;
}
}
