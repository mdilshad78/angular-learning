import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  // 🔹 Token ko header me attach karo
  const modifiedReq = token
    ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    : req;

  return next(modifiedReq).pipe(
    catchError(error => {

      if (error.status === 401) {
        sessionStorage.removeItem('token');   // ❌ remove expired token
        router.navigate(['/admin/login']);    // 🔄 redirect
      }

      return throwError(() => error);
    })
  );
};
