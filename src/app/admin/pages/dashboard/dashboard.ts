import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Sidebar } from "../../component/sidebar/sidebar";
import { Heading } from "../../component/heading/heading";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Sidebar, Heading],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isDesktop = window.innerWidth >= 900;
  sidebarOpen = this.isDesktop;


  alerts = [
    { text: 'Prince Sharma placed an order on 25 May 2025.', remark: 'Only black colour required' },
    { text: 'Placed an order on 20 May 2025.' },
    { text: 'Admin placed an order on 18 May 2025.', remark: 'Checking scheme discount.' },
  ];

  // barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  //   datasets: [
  //     { data: [0, 0, 0, 0, 17710, 0, 0, 0, 0, 0, 0, 0], label: 'Sales', backgroundColor: '#2563eb' }
  //   ]
  // };

  // barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: true,
  //   scales: {
  //     y: { beginAtZero: true, ticks: { callback: (v) => '₹' + v } }
  //   },
  //   plugins: { legend: { display: false } }
  // };

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
