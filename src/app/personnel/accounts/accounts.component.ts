import { Component, OnInit } from '@angular/core';

import { PersonnelserviceService } from '../personnelservice.service';
import { Router } from '@angular/router';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {

           
  personnels: Personnel[] = [];
constructor(private personnelserviceService: PersonnelserviceService,private router:Router  ){}

  ngOnInit(): void {
    this.getPersonnels();
  }
   private getPersonnels(){
    this.personnelserviceService.getPersonnellist().subscribe(data =>{
      this.personnels= data;
   });

  }
  modifierPersonnel(id:number) {
    this.router.navigate(['/modifier',id]);
  }

  supprimerPersonnel(id:number) {
    this.personnelserviceService.supprimerPersonnel(id).subscribe(data =>{
    
      this.getPersonnels();
   });
}
}
