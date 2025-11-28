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
  styleUrls: ['./user-register.css'],
})
export class UserRegister {
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  };

  selectedImage!: File | null;
  error = '';
  success = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) { }

  onFileSelect(event: any) {
    this.selectedImage = event.target.files[0] ?? null;
  }

  // async uploadToCloudinary(): Promise<string> {
  //   if (!this.selectedImage) throw new Error("No file selected");

  //   const formData = new FormData();
  //   formData.append("file", this.selectedImage);
  //   formData.append("upload_preset", "unsigned_upload"); // Your unsigned preset

  //   const result: any = await firstValueFrom(
  //     this.http.post("https://api.cloudinary.com/v1_1/daig6lfhz/image/upload", formData)
  //   );

  //   return result.secure_url;
  // }

  async submit() {
    if (!this.selectedImage) {
      this.error = "Please select an image";
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const formData = new FormData();
      formData.append('username', this.formData.username);
      formData.append('email', this.formData.email);
      formData.append('password', this.formData.password);
      formData.append('confirmPassword', this.formData.confirmPassword);
      formData.append('phoneNumber', this.formData.phoneNumber);
      formData.append('image', this.selectedImage!); // send the actual file

      console.log("Sending FormData to backend");

      await firstValueFrom(
        this.http.post(
          "https://angular-backend-ten.vercel.app/api/auth/user/register",
          formData
        )
      );

      alert("User Registered Successfully");
      this.router.navigate(['/login']);
    } catch (err: any) {
      console.error("Registration error:", err);
      this.error = err?.error?.message || "Registration Failed";
    } finally {
      this.loading = false;
    }
  }


  // async submit() {
  //   if (!this.selectedImage) {
  //     this.error = "Please select an image";
  //     return;
  //   }

  //   this.loading = true;
  //   this.error = '';

  //   try {
  //     const imageUrl = await this.uploadToCloudinary();
  //     const datas = { ...this.formData, image: imageUrl };

  //     console.log("Sending to backend:", datas);

  //     await firstValueFrom(
  //       this.http.post("https://angular-backend-ten.vercel.app/api/auth/user/register", datas)
  //     );

  //     alert("User Registered Successfully");
  //     this.router.navigate(['/login']);
  //   } catch (err: any) {
  //     console.error("Registration error:", err);
  //     this.error = err?.error?.message || "Registration Failed";
  //   } finally {
  //     this.loading = false;
  //   }
  // }
}
