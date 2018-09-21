import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
    selector: 'app-display-employee',
    templateUrl: './display-employee.component.html',
    styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

    @Input() employee: Employee;
    @Input() searchTerm: string;

    // @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
    private selectedEmployeeId: number;

    @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

    confirmDelete = false;

    constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

    viewEmployee() {
        this._router.navigate(['/employees', this.employee.id], {
            queryParams: { 'searchTerm': this.searchTerm }
        });
    }

    editEmployee() {
        this._router.navigate(['/edit', this.employee.id], {
        }); 
    }

    deleteEmployee() {
        this._employeeService.deleteEmployee(this.employee.id).subscribe(
            () => console.log(`Employee with Id = ${this.employee.id} deleted`),
            (err) => console.log(err)
        );
        this.notifyDelete.emit(this.employee.id);
    }

    ngOnInit() {
        this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
    }

    handleClick() {
        // this.notify.emit(this.employee.name);
        this.notify.emit(this.employee);
    }

    // @Input()
    // get employee(): Employee
    // {
    //   return this._employee;
    // }
    // set employee(val: Employee)
    // {
    //   console.log('Previous : ' + (this._employee ? this._employee.name : 'Null'));
    //   this._employee = val;
    //   console.log('Current : ' + val.name);
    // }

    // ngOnChanges(changes: SimpleChanges)
    // {
    //   // console.log(changes);

    //   const previousEmployee = <Employee>changes.employee.previousValue;
    //   const currentEmployee = <Employee>changes.employee.currentValue;

    //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'Null'));
    //   console.log('Current : ' + currentEmployee.name);
    // }

}
