import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonnelserviceService } from '../personnelservice.service';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-personnel-details',
  templateUrl: './personnel-details.component.html',
  styleUrl: './personnel-details.component.css'
})
export class PersonnelDetailsComponent {
  id!: number
   personnel = new Personnel;
  constructor(private route: ActivatedRoute, private personnelserviceService: PersonnelserviceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.personnel= new Personnel();
    this.personnelserviceService.getPersonnelById(this.id).subscribe( data => {
      this.personnel = data;
    });
  }
}
