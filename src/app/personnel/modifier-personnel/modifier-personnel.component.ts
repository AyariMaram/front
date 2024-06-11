import { Component, OnInit } from '@angular/core';
import { PersonnelserviceService } from '../personnelservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-modifier-personnel',
  templateUrl: './modifier-personnel.component.html',
  styleUrl: './modifier-personnel.component.css'
})
export class ModifierPersonnelComponent implements OnInit{
cancel() {
  this.router.navigate(['/personnels']);
}
  
  id!: number;
  personnel  = new Personnel();

constructor(private personnelserviceService: PersonnelserviceService,private route:ActivatedRoute,private router: Router){

}
ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  this.personnelserviceService.getPersonnelById(this.id).subscribe((data) => {
    this.personnel = data; 
  });
}


onSubmit(){
    this.personnelserviceService.ajouterPersonnel(this.personnel).subscribe();
      this.router.navigate(['/personnels']);
  
    }
  
}
