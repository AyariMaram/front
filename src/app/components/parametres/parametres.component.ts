import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.css'
})
export class ParametresComponent {

  constructor(private router: Router, ) { }

  redirectToAfficherChefs(): void {
    this.router.navigate(['/admin/afficherchefs']);
  }
  redirectToAfficherEmployes(): void {
    this.router.navigate(['/admin/afficheremployes']);
  }


  ngOnInit(): void {

  }

redirectToHome() {
  this.router.navigate(['/homee']);
}
}
