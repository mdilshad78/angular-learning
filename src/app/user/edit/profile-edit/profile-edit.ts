import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.css',
})
export class ProfileEdit {
  form = {
    username: '',
    email: "",
    phoneNumber: ''
  }

  userId: string = '';

  constructor(private http: HttpClient, private router: Router) { }



  ngOnInit() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/']); // Redirect to home/login
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    this.userId = user._id;   // MUST exist
    this.form = {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
  }

  submit() {

    const token = sessionStorage.getItem("token");

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.http.put(
      `https://angular-backend-ten.vercel.app/api/auth/user/profile/${this.userId}`,
      this.form,
      { headers }
    )
      .subscribe((res: any) => {
        alert('Profile updated successfully!');
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/profile']);
      });
  }
}
