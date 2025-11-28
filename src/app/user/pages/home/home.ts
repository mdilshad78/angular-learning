import { Component } from '@angular/core';
import { Heading } from "../../component/heading/heading";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Heading, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  users: any[] = []
  isLogging = false

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.isLogging = !!sessionStorage.getItem("token");

    if (!this.isLogging) {
      return
    }

    this.http.get('https://angular-backend-ten.vercel.app/api/auth/user/userdata').subscribe((res: any) => {
      this.users = res.result;
      console.log("API Data:", this.users)
    })
  }

  deleteUser(id: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    this.http.delete(`http://localhost:5000/api/auth/user/deleteUser/${id}`).subscribe((res: any) => {
      alert("user Deleted Successfully!");

      this.users = this.users.filter(u => u._id !== id)
    })
  }
}
