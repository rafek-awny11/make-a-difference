import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService = inject(ToastrService);

  return next(req).pipe(

    catchError((err) => {

      const message = err?.error?.message;

      // نعرض فقط الرسائل النصية العامة
      if (typeof message === 'string') {
        toastrService.error(message);
      }

      return throwError(() => err);

    })

  );
};