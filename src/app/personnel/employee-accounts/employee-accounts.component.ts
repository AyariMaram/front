import { Component } from '@angular/core';
import { PersonnelserviceService } from '../personnelservice.service';
import { Router } from '@angular/router';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-employee-accounts',
  templateUrl: './employee-accounts.component.html',
  styleUrl: './employee-accounts.component.css'
})
export class EmployeeAccountsComponent {
  personnels: Personnel[] = [];

  constructor(private personnelserviceService: PersonnelserviceService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees()  : void {
    this.personnelserviceService.getAllEmployees().subscribe(data => {
      this.personnels = data;
    });
}
  
  modifierPersonnel(id:number) {
    this.router.navigate(['/modifier',id]);
  }

  supprimerPersonnel(id:number) {
    this.personnelserviceService.supprimerPersonnel(id).subscribe(data =>{
    
      this.getEmployees();
    });
}
}
