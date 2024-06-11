import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../../services/password/password.service';
import { UserService } from '../../services/profile/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-changermdp',
  templateUrl: './changermdp.component.html',
  styleUrl: './changermdp.component.css'
})
export class ChangermdpComponent {
 password!: string; 
   
    newPassword!: string;
    confirmPassword!: string;
    message!: string;
    email!: string;
    oldPassword!: string;
    correctOldPassword: boolean = true;
    userProfile: any ;
 
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private route: ActivatedRoute, private passwordService: PasswordService, private router: Router, private userService: UserService) {
        this.route.queryParams.subscribe(params => {
            this.password = params['password'];

        });
    }

   



  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.email = this.userProfile.email;
        console.log(this.email)
        if (this.userProfile) {
        } else {
          console.error('User profile data is not available.');
        }
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );

    this.userService.getUserPassword().subscribe(
      (password: string) => {
        console.log('user password:', password);
        this.password = password;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  /*onChangePassword() {
    // Reset error and success messages
    this.errorMessage = '';
    this.successMessage = '';
  
    // Check if any field is empty
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
  
    // Check if old password is correct
    if (this.oldPassword !== this.password) {
      this.errorMessage = 'Old password is incorrect.';
      return;
    }
  
    // Check if new password and confirm password match
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      return;
    }
  
    // If all checks pass, change the password
    this.passwordService.changPassword(this.email, this.oldPassword, this.newPassword, this.confirmPassword)
      .subscribe(response => {
        console.log(response);
        this.successMessage = 'Password changed successfully.';
      }, error => {
        console.error(error);
        this.errorMessage = 'An error occurred while changing password.';
      });
  }*/

  redirectToHome() {
    this.router.navigate(['/homee']);
  }
  


  oldPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  // visibility
  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'oldPassword':
        this.oldPasswordVisible = !this.oldPasswordVisible;
        break;
      case 'newPassword':
        this.newPasswordVisible = !this.newPasswordVisible;
        break;
      case 'confirmPassword':
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
        break;
      default:
        break;
    }
  }

  
  onChangePassword() {
    
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }
  
  
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = "Les nouveaux mots de passe ne correspondent pas.";
      return;
    }
  
    if(this.password !== this.oldPassword)
    {
      this.successMessage = "mot de passe changer avec succes";
    }
    this.passwordService.changPassword(this.email, this.oldPassword, this.newPassword, this.confirmPassword)
      .subscribe(response => {
  
        console.log(response);
        
        this.successMessage = 'Le mot de passe a été changé avec succès.';
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.errorMessage = '';
        this.redirectToHome();
      }, error => {
        console.error(error);
        if (error.status === 401) {
          this.errorMessage = "erreur.";
        } 
      });
    }
  

}