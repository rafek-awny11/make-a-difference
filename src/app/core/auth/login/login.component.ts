import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
   private readonly authService =inject(AuthService)

  private readonly fb =inject(FormBuilder)
  private readonly router =inject(Router)
  private readonly toastrService =inject(ToastrService)
    private readonly cookieService =inject(CookieService)


 loginForm!: FormGroup

isLoading:boolean =false
msgErorr:string = "";

ngOnInit(): void{
  this.initForm();
}
  
initForm(): void{
     this.loginForm =this.fb.group({
      userName:[null, [Validators.required , Validators.minLength(2), Validators.maxLength(20)]],
      password:[null, [Validators.required ]],
     
    })


}
 
  


  submitForm():void{
    if(this.loginForm.valid){
      this.isLoading =true;
      
    console.log(this.loginForm);
    this.authService.loginForm(this.loginForm.value).subscribe({
   next: (res) => {
  console.log(res);

  if (res.status === true) {
    this.cookieService.set('token', res.record.token);

    this.toastrService.success('Login successful');
  

    setTimeout(() => {
      this.msgErorr = '';
      this.router.navigate(['/home']);
    }, 1000);

  } else {
    this.toastrService.error('اسم المستخدم أو كلمة المرور غير صحيحة');
  }

  this.isLoading = false;
},
      error:(err) =>{
        console.log(err);

      this.msgErorr = err.errors.errorMessage;
      this.toastrService.error('error')


        this.isLoading= false
      }

    })

    } 
    
  }
  
  

}
