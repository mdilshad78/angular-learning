import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true, // 👈 only for standalone components
  imports: [CommonModule], // ✅ Required for *ngIf
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
