import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { faUser, faBox, faList, faTags, faHistory, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSellcast } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, FaIconComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() sidebarOpen = true;
  @Input() setSidebarOpen: any;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router) { }

  menuItems = [
    { name: 'Dashboard', icon: faHome, link: '/admin/dashboard' },
    { name: 'User Management', icon: faUser, link: '/admin/user' },
    { name: 'New User Request', icon: faUser, link: '/user-request' },
    { name: 'User Data', icon: faUser, link: '/user-data' },
    { name: 'Brand Management', icon: faTags, link: '/brand' },
    { name: 'Category Management', icon: faList, link: '/category' },
    { name: 'Product Management', icon: faBox, link: '/product' },
    { name: 'Chinese Brand', icon: faBox, link: '/chinese-brand' },
    { name: 'Chinese Category', icon: faBox, link: '/chinese-category' },
    { name: 'Chinese Product', icon: faBox, link: '/chinese-product' },
    { name: 'Order History', icon: faHistory, link: '/order' },
    { name: 'Top Selling', icon: faSellcast, link: '/topselling' },
    { name: 'Create User', icon: faUser, link: '/create-user' },
    { name: 'Create Admin', icon: faUser, link: '/create-admin' },
    { name: 'Profile', icon: faUser, link: '/profile' },
  ];

  handleLogout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
    window.location.reload();
  }

  closeSidebar() {
    this.sidebarToggle.emit(false);
  }
}
