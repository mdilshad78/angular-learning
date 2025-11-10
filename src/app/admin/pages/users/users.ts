import { Component, HostListener } from '@angular/core';
import { AdminRoutingModule } from "../../admin-routing-module";
import { Sidebar } from "../../component/sidebar/sidebar";
import { Heading } from "../../component/heading/heading";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AdminRoutingModule, Sidebar, Heading,CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  isDesktop = window.innerWidth >= 900;
  sidebarOpen = this.isDesktop;

  ngOnInit() { }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 1000;
    this.sidebarOpen = this.isDesktop;
  }

  setSidebarOpen(val: boolean) {
    this.sidebarOpen = val;
  }
}
