import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonnelserviceService } from '../../../personnel/personnelservice.service';
import { ActivatedRoute } from '@angular/router';
import { Personnel } from '../../../models/Personnel';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrl: './modifieruser.component.css'
})
export class ModifieruserComponent {
  id!: number;
  userForm!: FormGroup;
  chef: Personnel = new Personnel();
  submitted: boolean = false;
  selectedSexe!: string;


  constructor(
    private modifierchefService: PersonnelserviceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.initForm();
    this.loadChef();
    this.selectedSexe = this.chef.sexe;
 
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      nom: [this.chef.nom,  Validators.required],
      prenom: [this.chef.prenom, Validators.required ],
     statut: [this.chef.statut, Validators.required ],
     nbrEnfant: [this.chef.nbrEnfant,this.validateNombreEnfant],
      service: [this.chef.service, Validators.required ],
      tel: [this.chef.tel, [Validators.required, this.validatePhoneNumber]],
      sexe: [this.chef.sexe,Validators.required],
      email: [this.chef.email,[Validators.required, this.validateEmail] ],
      matricule: [this.chef.matricule, Validators.required ],
      role: [this.chef.role,  Validators.required],
      login: [this.chef.login, Validators.required],
      cin: [this.chef.cin, Validators.required]
    });
  }

  loadChef(): void {
    this.modifierchefService.getPersonnelById(this.id).subscribe(
      (data: Personnel) => {
        this.chef = data;
        console.log(this.chef)
        this.initForm();
      },
      error => {
        console.log(error);
      }
    );

  }

  ModifierUser(): void {
      this.submitted = true;
      this.userForm.markAllAsTouched();
      if (this.userForm.valid) {

      const updatedChef: Personnel = this.userForm.value;

      this.modifierchefService.modifierPersonnel(updatedChef, this.id).subscribe();
      window.location.reload();
    }
  }









  validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
    const phoneNumber = control.value;
    const isValidNumber = /^\+216\d{8}$/.test(phoneNumber);
    const containsLetter = /[a-zA-Z]/.test(phoneNumber);
  
    if (control.value && !isValidNumber) {
      return { 'invalidPhoneNumber': true };
    }
  
    if (containsLetter) {
      return { 'invalidPhoneNumber': true, 'containsLetter': true };
    }
  
    return null;
  }

  validateEmail(control: AbstractControl): { [key: string]: any }  | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }
  validateNombreEnfant(control: AbstractControl): { [key: string]: any }  | null {
    const nombreEnfant = control.value;
    if (nombreEnfant < 0) {
      return { 'invalidNumberOfChildren': true };
    }
    return null;
  }

}
