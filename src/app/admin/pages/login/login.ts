import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;
  success: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  async submit() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.password) {
      this.error = '⚠️ Please fill all fields';
      return;
    }

    this.loading = true;
    try {
      const result: any = await this.http
        .post('https://oopss-by-shreeenterprises-backend.onrender.com/api/admin/login', {
          email: this.email,
          password: this.password,
        })
        .toPromise();

      sessionStorage.setItem('token', result.token);
      this.success = '✅ Login Successful!';
      this.router.navigate(['admin/dashboard']);
    } catch (err) {
      this.error = '❌ Invalid login credentials';
    } finally {
      this.loading = false;
    }
  }
}
