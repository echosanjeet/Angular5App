import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];

  filteredEmployees: Employee[];

  employeeToDisplay: Employee;
  dataFromChild: Employee;

  error: string;

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployee(value);
  }

  private arrayIndex = 1;

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {

    // this.employees = this._route.snapshot.data['employeeList'];
    const resolvedEmployeeList: ResolvedEmployeeList = this._route.snapshot.data['employeeList'];

    if (resolvedEmployeeList.error == null) {
      this.employees = resolvedEmployeeList.employeeList;
    } else {
      this.error = resolvedEmployeeList.error;
    }

    // this.employeeToDisplay = this.employees[0];

    if (this._route.snapshot.queryParamMap.has('searchTerm'))
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    else
      this.filteredEmployees = this.employees;
  }

  filterEmployee(serachString: string) {
    return this.employees.filter(e => e.name.toLowerCase().indexOf(this._searchTerm.toLowerCase()) !== -1);
  }
  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployee(this.searchTerm);
  }

  // onClick(employeeId: number) {
  //   this._router.navigate(['/employees', employeeId], {
  //     queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
  //   });
  // }

  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }

  ngOnInit() {
    // this._employeeService.getEmployees().subscribe((empList) => {
    //   this.employees = empList;

    //   this.employeeToDisplay = this.employees[0];

    //   if (this._route.snapshot.queryParamMap.has('searchTerm'))
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   else
    //     this.filteredEmployees = this.employees;
    // });
  }

  nextEmployee(): void {
    if (this.arrayIndex <= 2) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    }
    else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }

  onDeleteNotification(id: number) {
    const index = this.filteredEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.filteredEmployees.splice(index, 1);
    }
  }
}
