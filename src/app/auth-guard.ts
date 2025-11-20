// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

// const helper = new JwtHelperService();

// @Injectable({
//   providedIn: 'root'
// })


// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) { }

//   canActivate(): boolean {
//     const token = sessionStorage.getItem('token');  // or cookie

//     if (token && !helper.isTokenExpired(token)) {
//       return true; // allow access
//     }

//     // if no token → redirect to login
//     this.router.navigate(['/admin/login']);
//     return false;
//   }
// }


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(): Observable<boolean> {
    const token = sessionStorage.getItem('token');

    // ❌ No token → Go to login
    if (!token) {
      this.router.navigate(['/admin/login']);
      return of(false);
    }

    // 🔥 Verify token from backend
    return this.http.get('http://localhost:5000/api/auth/admin/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['/admin/login']);
          return of(false);
        })
      );

  }
}

