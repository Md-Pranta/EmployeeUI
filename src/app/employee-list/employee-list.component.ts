import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  dataSource: Employee[] = [];

  displayedColumns: string[] = [
    'employeeId',
    'employeeName',
    'employeeContactNumber',
    'employeeAddress',
    'employeeDepartment',
    'employeeGender',
    'employeeSkills',
    'update',
    'delete',
  ];
  constructor(
    private employeeServise: EmployeeService,
    private router: Router
  ) {
    this.getEmployeeList();
  }

  ngOnInit(): void {}

  updateEmployee(employeeId: number): void {
    this.router.navigate(['employee', { employeeId: employeeId }]);
  }

  deleteEmployee(id: number): void {
    console.log(id);
    this.employeeServise.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployeeList();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  getEmployeeList(): void {
    this.employeeServise.getEmployee().subscribe({
      next: (res: Employee[]) => {
        console.log(res);
        this.dataSource = res;
      },
      error: (er: HttpErrorResponse) => {
        console.log(er);
      },
    });
  }
}
