import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../../admin/admin-routing-module";

@Component({
  selector: 'app-navbar',
  standalone: true, // 👈 only for standalone components
  imports: [CommonModule, AdminRoutingModule], // ✅ Required for *ngIf
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isOpen = false;

  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // token exist = logged in
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    sessionStorage.removeItem('token');
    window.location.reload(); // page refresh to update navbar
  }
}
