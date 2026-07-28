import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TenantService } from '../../services/tenant';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  dashboardData: any = {};

  constructor(
    private tenantService: TenantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.tenantService.getDashboardData().subscribe({
      next: (response) => {
        this.dashboardData = response.data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
      }
    });
  }
}