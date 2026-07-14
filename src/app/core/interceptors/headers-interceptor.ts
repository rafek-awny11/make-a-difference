import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService =inject(CookieService)
  const token = cookieService.get('token');

 if(cookieService.check('token')){
   req =req.clone({
    setHeaders:{
       Authorization: `Bearer ${token}`
    }
  })
 }
  return next(req);
};
