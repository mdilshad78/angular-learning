import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./user/component/navbar/navbar";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showNavbar = true;
  showSidebar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        // ✅ Show sidebar for admin routes
        if (url.startsWith('/admin') || url.startsWith("/login") || url.startsWith("/register")) {
          this.showSidebar = true;
          this.showNavbar = false;
        }
        // ✅ Show navbar for user routes
        else {
          this.showSidebar = false;
          this.showNavbar = true;
        }
      }
    });
  }
}
