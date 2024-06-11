import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '../../services/password/password.service';
import { ChangePasswordRequest } from '../../models/changePasswordRequest';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit  {

  changePasswordRequest: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  };

  constructor(private passwordService: PasswordService, private router: Router) {}

  onSubmit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.passwordService.changePassword(this.changePasswordRequest, token).subscribe(() => {
        console.log('Password changed successfully');
        this.router.navigate(['/auth/profile']);
      }, (error) => {
      });
    } else {
      console.error('No token found in localStorage');
    }
  }

  ngOnInit(): void {
  }
}
