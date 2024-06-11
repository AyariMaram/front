import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

  constructor(private router: Router) { }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = true;
    }

  closeModal() :void {
    this.showModal = false;

  }

  openLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  }

