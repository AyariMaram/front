import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  navbarShrink() {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (navbarCollapsible && window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
    } else if (navbarCollapsible) {
      navbarCollapsible.classList.add('navbar-shrink');
    }
  }

}
