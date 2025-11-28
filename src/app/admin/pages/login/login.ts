import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // ✅ corrected plural (styleUrls)
  animations: [
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class Login {
  error: string = '';
  success: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  

  async submit() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.password) {
      this.error = 'Please fill all feilds';
      return;
    }

    this.loading = true;

    try {
      const result: any = await firstValueFrom(
        this.http.post('https://angular-backend-ten.vercel.app/api/auth/admin/login', {
          email: this.email,
          password: this.password,
        })
      );

      console.log('API Response:', result)

      const token = result.token
      if (token) {
        sessionStorage.setItem('token', token);
        console.log('API Token:', token);
        this.success = '✅ Login Successful!';
        this.router.navigate(['/admin/dashboard']);
      }
      else {
        console.error('No token found in response');
        this.error = '❌ Login failed: token not found';
      }


    }
    catch (err) {
      this.error = '❌ Invalid login credentials';
    }
    finally {
      this.loading = false
    }
  }
}
