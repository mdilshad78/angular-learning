import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    console.log("SESSION USER ID:", userId);

    if (!token) {
      this.router.navigate(['']);
      return;
    }

    this.http.get(
      `https://angular-backend-ten.vercel.app/api/auth/user/me/${userId}`,   // <-- FIXED
      {
        headers: { Authorization: "Bearer " + token }
      }
    ).subscribe({
      next: (res: any) => {
        this.user = res.user;
        console.log("Profile", this.user);
      },
      error: (err) => {
        console.error("Profile Load Error:", err);

        if (err.status === 401 || err.status === 403) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userId");
          this.router.navigate(['/page']);
        }
      }
    });
  }

 



}
