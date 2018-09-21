import { CanDeactivate } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee.component";
import { Injectable } from "@angular/core";

@Injectable()
export class CretaEmployeeCanDeactiveGuardService implements CanDeactivate<CreateEmployeeComponent>
{
    canDeactivate(component: CreateEmployeeComponent): boolean
    {
        if(component.createEmployeeForm.dirty)
        {
            return confirm('Are you sure want to discard your changes?');
        }
        return true;
    }

}