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

   saveUser(user: any): void {
  this.cookieService.set('userInfo', JSON.stringify(user));
}

  // جلب بيانات المستخدم
 getCurrentUser(): any {
  const user = this.cookieService.get('userInfo');

  console.log('Cookie Value:', user);

  if (user) {
    return JSON.parse(user);
  }

  return null;
}

  // جلب اسم المستخدم
getUserName(): string {
  const user = this.getCurrentUser();
  return user?.userName || '';
}

getFirstLetter(): string {
  const name = this.getUserName();
  return name ? name.charAt(0).toUpperCase() : '';
}
  logOut(): void {
    this.cookieService.delete('token');
this.cookieService.delete('userInfo');
    this.router.navigate(['/login']);
  }
  
}
