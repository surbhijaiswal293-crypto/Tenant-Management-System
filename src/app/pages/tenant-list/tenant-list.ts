import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../services/tenant';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Navbar],
  templateUrl: './tenant-list.html',
  styleUrls: ['./tenant-list.css'],
})
export class TenantList implements OnInit {
  tenants: any[] = [];
  searchText: string = '';
  page = 0;
  size = 10;
  sortBy = 'tenantName';
  direction = 'asc';
  currentPage = 0;
  totalPages = 0;
  status = '';
  totalElements = 0;

  constructor(
    private tenantService: TenantService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('Tenant List Loaded');

    this.getTenants();
  }

  getTenants() {
    this.tenantService
      .getTenants(this.page, this.size, this.sortBy, this.direction, this.searchText, this.status)
      .subscribe((response) => {
        console.log(response);

        this.tenants = [...response.data.content];
        this.currentPage = response.data.number;
        this.totalPages = response.data.totalPages;
        this.totalElements = response.data.totalElements;
        this.cdr.detectChanges();
        console.log('HTML Count:', this.tenants.length);
      });
  }

  filterByStatus() {
    this.page = 0;
    this.getTenants();
  }
  searchTenant() {
    this.page = 0;

    this.getTenants();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.page++;
      this.getTenants();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page--;
      this.getTenants();
    }
  }

  sort(column: string) {
    if (this.sortBy === column) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.direction = 'asc';
    }

    this.getTenants();
  }

  deleteTenant(id: number) {
    if (confirm('Are you sure you want to delete this tenant?')) {
      this.tenantService.deleteTenant(id).subscribe({
        next: () => {
          alert('Tenant Deleted Successfully');
          this.getTenants();
        },
      });
    }
  }
}
