import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department..model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  // gender: string = "male";
  // isActive: boolean = true;
  // department: string = '3';

  @ViewChild('employeeForm')
  public createEmployeeForm: NgForm;

  previewPhoto: boolean = false;

  datePickerConfig: Partial<BsDatepickerConfig>;

  panelTitle: string;

  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: '',
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: 'select',
    isActive: null,
    photoPath: null,
  };

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        // showWeekNumber: true,
        // minDate: new Date(2018, 0, 1),
        // maxDate: new Date(2018, 12, 31),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.getEmployeeById(id);
    })
  }

  private getEmployeeById(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: '',
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.panelTitle = "Create Employee";
      this.createEmployeeForm.reset();
    }
    else {
      this.panelTitle = "Edit Employee";
      this._employeeService.getEmployeeById(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {

    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);

          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }

  saveEmployee_old(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save_old(newEmployee);
    // this._employeeService.save(this.employee);
    // this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

}
