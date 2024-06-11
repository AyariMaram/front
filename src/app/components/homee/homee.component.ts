import { Component } from '@angular/core';

@Component({
  selector: 'app-homee',
  templateUrl: './homee.component.html',
  styleUrl: './homee.component.css'
})
export class HomeeComponent {
  showModal: boolean = false;
  role: string = '';

  openModal(role: string) {
    this.role = role;
    this.showModal = true;
  }
}
