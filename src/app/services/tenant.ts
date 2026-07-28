import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private apiUrl = 'http://localhost:8080/tenants';

  constructor(private http: HttpClient) {}

  getTenants(
    page: number,
    size: number,
    sortBy: string,
    direction: string,
    keyword?: string,
    status?: string,
  ): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        page,
        size,
        sortBy,
        direction,
        ...(keyword ? { keyword } : {}),
        ...(status ? { status } : {}),
      },
    });
  }

  addTenant(tenant: any): Observable<any> {
    return this.http.post(this.apiUrl, tenant);
  }

  deleteTenant(id: number) {
    return this.http.delete(`http://localhost:8080/tenants/${id}`);
  }

  getTenantById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/tenants/${id}`);
  }

  updateTenant(id: number, tenant: any) {
    return this.http.put(`http://localhost:8080/tenants/${id}`, tenant);
  }

  getDashboardData() {
  return this.http.get<any>(`${this.apiUrl}/dashboard`);
}
}
