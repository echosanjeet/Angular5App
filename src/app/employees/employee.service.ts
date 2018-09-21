import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class EmployeeService {
    private listEmployee: Employee[] =
        [
            {
                id: 1,
                name: 'Mark',
                gender: 'Male',
                contactPreference: 'Email',
                email: 'mark@domain.com',
                dateOfBirth: new Date('10/25/1988'),
                department: '3',
                isActive: true,
                photoPath: 'assets/images/mark.png'
            },
            {
                id: 2,
                name: 'Mary',
                gender: 'Female',
                contactPreference: 'Phone',
                phoneNumber: 2341236785,
                dateOfBirth: new Date('11/20/1979'),
                department: '2',
                isActive: true,
                photoPath: 'assets/images/mary.png'
            },
            {
                id: 3,
                name: 'John',
                gender: 'Male',
                contactPreference: 'Phone',
                phoneNumber: 1432456345,
                dateOfBirth: new Date('3/25/1976'),
                department: '3',
                isActive: false,
                photoPath: 'assets/images/john.png'
            }
        ];

    baseUrl = "http://localhost:3000/employees";

    constructor(private _httpClient: HttpClient) {

    }

    getEmployees(): Observable<Employee[]> {

        // return Observable.of(this.listEmployee).delay(2000);

        return this._httpClient.get<Employee[]>(this.baseUrl)
            //    .catch(this.handleError);
            .pipe(catchError(this.handleError));
    }

    handleError(errorResponse: HttpErrorResponse) {
        
        if (errorResponse.error instanceof ErrorEvent) {
            console.error("Client Side Error: ", errorResponse.error.message);
        } else {
            console.error("Server Side Error: ", errorResponse);
        }

        return new ErrorObservable('The service is unavailable now. Please try again after some time.');
    }

    getEmployeeById(id: number): Observable<Employee> {
        
        // return this.listEmployee.find(e => e.id === emplyeeId);

        return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`)
                               .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {

        return this._httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: Employee): Observable<void> {

        return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        
        return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
                               .pipe(catchError(this.handleError));
    }

    deleteEmployee_old(id: number) {
        const index = this.listEmployee.findIndex(e => e.id === id);
        if (index !== -1) {
            this.listEmployee.splice(index, 1);
        }
    }

    save_old(employee: Employee) {
        if (employee.id === null) {
            const maxid = this.listEmployee.reduce(function (e1, e2) {
                return (e1.id > e2.id) ? e1 : e2;
            }).id;
            employee.id = maxid + 1;
            this.listEmployee.push(employee);
        }
        else {
            const foundIndex = this.listEmployee.findIndex(e => e.id === employee.id);
            this.listEmployee[foundIndex] = employee;
        }
    }
} 