import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasswordService } from '../../../services/password/password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email!: string;
  message!: string;

  constructor(private forgotPasswordService: PasswordService) { }

  forgotPassword(): void {
    this.message = 'Sending email...';
    this.forgotPasswordService.forgotPassword(this.email)
      .subscribe(
        () => {
          this.message = 'Mail sent, please check your email';
          this.email = ''; 
          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        error => {
       
          if (error.status === 200) {
            this.message = 'Mail sent, please check your email';
            this.email = '';
            setTimeout(() => {
              this.message = '';
            }, 3000);
          } else {
            this.message = 'Failed to send email. Please try again.';
          }
        }
      );
  }
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
