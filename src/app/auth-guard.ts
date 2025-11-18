import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');  // or cookie

    if (token && !helper.isTokenExpired(token)) {
      return true; // allow access
    }

    // if no token → redirect to login
    this.router.navigate(['/admin/login']);
    return false;
  }
}

