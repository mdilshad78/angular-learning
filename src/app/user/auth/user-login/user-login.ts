import { Component } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {
  error: string = '';
  success: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  async submit() {
    this.error = "";
    this.success = '';

    if (!this.email || !this.password) {
      this.error = "Please fill all feilds";
      return
    }

    this.loading = true;

    try {
      const result: any = await firstValueFrom(
        this.http.post('http://angular-backend-ten.vercel.app/api/auth/user/login', {
          email: this.email,
          password: this.password
        })
      );

      console.log("Api result", result)
      console.log("Api result", result.user?._id)
      const token = result.token;
      const userId = result.user?._id;


      if (token && userId) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);

        sessionStorage.setItem("user", JSON.stringify(result.user));

        console.log("Api token", token);

        this.success = "successfully login";
        this.router.navigate(['/'])
      }
      else {
        console.error('No token found in response');
        this.error = '❌ Login failed: token not found';
      }
    }
    catch (err) {
      this.error = '❌ Not Data Found. Please Register first!';
    }
    finally {
      this.loading = false
    }
  }
}
