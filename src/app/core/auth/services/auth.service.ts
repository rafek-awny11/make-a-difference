import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient =inject(HttpClient)
  private readonly cookieService =inject(CookieService)
    private readonly router =inject(Router)



  registerForm(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'User/Register' , data)

  }

  loginForm(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'User/Login' , data)
  }

  logOut():void {
    this.cookieService.delete('token')
    this.router.navigate(['/login'])
  }
  
}
