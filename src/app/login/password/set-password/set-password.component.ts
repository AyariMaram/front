import { Component } from '@angular/core';
import { PasswordService } from '../../../services/password/password.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {
  email!: string;
  newPassword!: string;
  confirmPassword!: string;
  message!: string;
  

  

  constructor(private route: ActivatedRoute, private passwordService: PasswordService,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  setPassword(): void {
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      this.message = 'Please fill in all fields.';
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }
  
    this.message = 'Changing password...';
    this.passwordService.setPassword(this.email, this.newPassword, this.confirmPassword)
      .subscribe(
        () => {
          this.message = 'Password Changed!!';
          this.email = '';
          this.newPassword = '';
          this.confirmPassword = '';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        error => {
          if (error.status === 200) {
            this.message = 'Password Changed!!';
            this.email = '';
            this.newPassword = '';
            this.confirmPassword = '';
            setTimeout(() => {
              this.message = '';

              this.router.navigate(['/home']); 
            }, 2000);
          } else {
            this.message = 'Failed to change password. Please try again.';
          }
        }
      );
  }


  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  togglePasswordVisibility(field: string): void {
    if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }


  toggleEyeVisibility(field: string): void {
    if (field === 'newPassword') {
      this.showNewPassword = this.newPassword.length > 0;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = this.confirmPassword.length > 0;
    }
  }
}
  

