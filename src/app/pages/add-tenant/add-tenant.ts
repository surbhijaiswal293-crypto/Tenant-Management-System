import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TenantService } from '../../services/tenant';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Navbar
  ],
  templateUrl: './add-tenant.html',
  styleUrl: './add-tenant.css'
})
export class AddTenant implements OnInit {

  tenant = {
    tenantName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    flatNumber: '',
    joiningDate: '',
    maritalStatus: '',
    rentAmount: '',
    address: '',
    status: ''
  };

  id!: number;
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.isEditMode = true;
      this.getTenantById();
    }
  }

  saveTenant(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    const request = this.isEditMode
      ? this.tenantService.updateTenant(this.id, this.tenant)
      : this.tenantService.addTenant(this.tenant);

    request.subscribe({
      next: () => {
        this.isSubmitting = false;

        alert(
          this.isEditMode
            ? 'Tenant Updated Successfully'
            : 'Tenant Added Successfully'
        );

        this.router.navigate(['/tenants']);
      },
      error: (error) => {
        this.isSubmitting = false;

        this.errorMessage =
          error?.error?.message ||
          'Something went wrong. Please try again.';

        console.error(error);
      }
    });
  }

  getTenantById(): void {
    this.tenantService.getTenantById(this.id).subscribe({
      next: (response) => {
        this.tenant = response.data;
      },
      error: (error) => {
        this.errorMessage = 'Unable to load tenant details.';
        console.error(error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/tenants']);
  }
}