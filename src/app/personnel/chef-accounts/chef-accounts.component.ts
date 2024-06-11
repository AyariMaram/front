import { Component, OnInit } from '@angular/core';
import { PersonnelserviceService } from '../personnelservice.service';
import { Router } from '@angular/router';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-chef-accounts',
  templateUrl: './chef-accounts.component.html',
  styleUrl: './chef-accounts.component.css'
})
export class ChefAccountsComponent implements OnInit {
  constructor(private personnelserviceService: PersonnelserviceService, private router: Router) { }

  personnels: Personnel[] = [];

  ngOnInit(): void {
    this.getChefs();
  
  }
 

  getChefs(): void {
    this.personnelserviceService.getAllChefs().subscribe(data =>
       this.personnels = data);
  }
  modifierPersonnel(id:number) {
    this.router.navigate(['/modifier',id]);
  }

  supprimerPersonnel(id:number) {
    this.personnelserviceService.supprimerPersonnel(id).subscribe(data =>{
    
      this.getChefs();
    });
}
}
