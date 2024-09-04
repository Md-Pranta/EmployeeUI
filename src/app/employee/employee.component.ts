import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee = {
    employeeId: 0,
    employeeName: '',
    employeeContactNumber: '',
    employeeAddress: '',
    employeeGender: '',
    employeeDepartment: '',
    employeeSkills: '',
  };
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  checkGender(gender: string) {
    return (
      this.employee.employeeGender != null &&
      this.employee.employeeGender == gender
    );
  }

  checkSkills(skill: string) {
    return (
      this.employee.employeeSkills != null &&
      this.employee.employeeSkills.includes(skill)
    );
  }

  saveEmployee(employeeForm: NgForm): void {
    this.employeeService.saveEmployee(this.employee).subscribe({
      next: (res: Employee) => {
        console.log(res);
        employeeForm.reset();
        this.employee.employeeGender = '';
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  setGender(gender: string): void {
    this.employee.employeeGender = gender;
  }

  skills: string[] = [];

  onSkillsChanges(event: any): void {
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach((item, ind) => {
        if (item == event.source.value) this.skills.splice(ind, 1);
      });
    }
    this.employee.employeeSkills = this.skills.toString();
  }
}
