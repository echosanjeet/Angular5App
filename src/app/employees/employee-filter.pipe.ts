import { PipeTransform, Pipe } from "@angular/core";
import { Employee } from "../models/employee.model";

@Pipe({
    name: 'employeeFilter',
    pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[], serachTerm: string): Employee[] {
        if (!employees || !serachTerm)
            return employees;

        return employees.filter(e => e.name.toLowerCase().indexOf(serachTerm.toLowerCase()) !== -1)
    }
}