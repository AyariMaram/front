import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonnelserviceService } from '../../../personnel/personnelservice.service';
import { Router } from '@angular/router';
import { Personnel } from '../../../models/Personnel';

@Component({
  selector: 'app-ajouteruser',
  templateUrl: './ajouteruser.component.html',
  styleUrl: './ajouteruser.component.css'
})
export class AjouteruserComponent {
  @Input() role: string = '';
  @Input() showModal: boolean = false;
   submitted: boolean = false;
  
  
  
   userForm!: FormGroup;
   user: Personnel = new Personnel();
  
   constructor(
     private formBuilder: FormBuilder,
     private serviceuser: PersonnelserviceService,
     private router: Router
   ) {}
  openModal(role: string) {
    this.role = role;
    this.showModal = true;
    console.log(this.showModal)
  
  }
  
   ngOnInit(): void {
     this.createForm();
     
   }
  
  
   /*
   closeModal() {
    this.showModal = false;
    console.log(this.showModal)
  
   }
  */
   setRole(role: string): void {
     this.userForm.get('role')!.setValue(role);
   }
  
   createForm(): void {
     this.userForm = this.formBuilder.group({
       nom: ['', Validators.required],
       prenom: ['', Validators.required],
       statut: ['', Validators.required],
       nbrEnfant: [''],
       service: ['', Validators.required],
       cin: ['', [Validators.required, this.cinLengthValidator]]   ,
           tel: ['', [Validators.required/*, this.validatePhoneNumber*/]],
       sexe: ['', Validators.required],
       email: ['', [Validators.required, this.validateEmail]],
       role: [this.role],
       login: [''],
       password: [''],
       solde:['']
     });
     //si dtatut celebataire l nbr_enf non obligatoire
     const statutControl = this.userForm.get('statut');
   if (statutControl) {
     statutControl.valueChanges.subscribe(value => {
       const nbr_enfantControl = this.userForm.get('nbrEnfant');
       if (nbr_enfantControl) {
         if (value === 'marie') {
           nbr_enfantControl.setValidators([Validators.required, this.validateNombreEnfant]);
         } else {
           nbr_enfantControl.clearValidators();
         }
         nbr_enfantControl.updateValueAndValidity();
       }
     });
   }
   }
  
    formatPhoneNumber(event: any) {
    const phoneNumber = event.target.value.trim();
    if (phoneNumber.length === 8) {
      event.target.value = '+216' + phoneNumber;
    }
  }

  cinLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const cin = control.value;
    if (cin && cin.length !== 8) {
      return { 'cinLength': true }; 
    }
    return null; 
  }
   validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
     const phoneNumber = control.value;
     const isValidNumber = /^\d{8}$/.test(phoneNumber);
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
   redirectToHome() {
    this.router.navigate(['/home']);
  }
  
   ajouterUser(): void {
     this.submitted = true;
     this.userForm.markAllAsTouched();
     if (this.userForm.valid) {
       this.user = this.userForm.value;
       this.serviceuser.ajouterPersonnel(this.user).subscribe();
       window.location.reload();
  
     }
   }
}
