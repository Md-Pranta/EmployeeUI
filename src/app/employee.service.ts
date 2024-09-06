import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  api = 'http://localhost:8080';

  //for post
  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.api}/employee/add`, employee);
  }

  //for
  public getEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.api}/employee/all`);
  }
  public deleteEmployee(id: number) {
    return this.httpClient.delete(`${this.api}/employee/delete/${id}`);
  }
  public getsEmployee(employeeId: number) {
    return this.httpClient.get<Employee>(
      `${this.api}/employee/all/${employeeId}`
    );
  }

  public updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(`${this.api}/update`, employee);
  }
}
