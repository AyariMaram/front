import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/profile/user.service';
import { PersonnelserviceService } from '../../personnel/personnelservice.service';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm !: FormGroup;
  userProfile: any ;
  userId: number | undefined;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private profileService: UserService, private router: Router,
    private modifieruser:PersonnelserviceService
  ) { }

  ngOnInit(): void {
    
    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.userId = this.userProfile.id;
console.log(this.userProfile)
console.log(this.userId)
        if (this.userProfile) {
          this.initForm();
        } else {
          console.error('User profile data is not available.');
        }
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
    console.log()
  }


  initForm(): void {
    this.userForm = this.formBuilder.group({
      nom: [this.userProfile.nom, Validators.required],
      prenom: [this.userProfile.prenom, Validators.required],
      statut: [this.userProfile.statut, Validators.required],
      nbrEnfant: [this.userProfile.nbrEnfant , [this.validateNombreEnfant]],
      tel: [this.userProfile.tel, [ Validators.required,this.validatePhoneNumber]],
      email: [this.userProfile.email, [Validators.required,this.validateEmail]],
      matricule: [this.userProfile.matricule, Validators.required],
      service: [this.userProfile.service , Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {

    this.ModifierProfil();
    }
  }

  redirectToHome() {
    this.router.navigate(['/homee']);
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
  user = new Personnel() ;
  ModifierProfil() {
    this.submitted = true;
    this.userForm.markAllAsTouched();
    if (this.userForm.valid && this.userId && this.userProfile ) {
      const modifiedData = this.userForm.value;

      Object.assign(this.userProfile, modifiedData);


      this.modifieruser.modifierPersonnel(this.userProfile, this.userId).subscribe();
      window.location.reload();

    }
}

}