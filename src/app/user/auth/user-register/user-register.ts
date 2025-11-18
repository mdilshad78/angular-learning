import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-register.html',
  styleUrl: './user-register.css',
})
export class UserRegister {
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  };

  error: string = '';
  loading: boolean = false;
  success: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  async submit() {
    this.error = '';
    this.success = '';

    // FIXED VALIDATION
    if (
      !this.formData.username ||
      !this.formData.email ||
      !this.formData.password ||
      !this.formData.confirmPassword ||
      !this.formData.phoneNumber
    ) {
      this.error = "All fields required!";
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;

    try {
      const result: any = await firstValueFrom(
        this.http.post('http://localhost:5000/api/auth/user/register', this.formData)
      );
      console.log("Api", result);
      this.success = "Register Successfully!";
      this.router.navigate(['/login'])
    } catch (error: any) {
      console.log("Error Response:", error);

      if (error.error?.message) {
        this.error = '❌ ' + error.error.message;
      } else {
        this.error = '❌ Registration failed';
      }
    }
    finally {
      this.loading = false;
    }
  }
}
