import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from '../../services/scroll/scroll.service';
import { Router } from '@angular/router';

declare var navbarShrink: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {



  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }












  constructor(private router: Router,private scrollService: ScrollService) { }

  home() {
    this.router.navigate(['/home']); // Naviguer vers la page d'accueil
  }
  home2() {
    this.router.navigate(['/home']).then(() => {
      // Une fois la navigation vers la page d'accueil terminée,
      // effectuez le défilement vers la section spécifique (ID "about")
      this.scrollTo('about');
    });
  }
  home3() {
    this.router.navigate(['/home']).then(() => {
      // Une fois la navigation vers la page d'accueil terminée,
      // effectuez le défilement vers la section spécifique (ID "about")
      this.scrollTo('contact');
    });// Naviguer vers la page d'accueil
  }
  ngOnInit(): void {
    }
  currentSection: string = 'about'; // Section par défaut

  navigateTo(section: string) {
    this.currentSection = section;
  }
  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollService.navbarShrink();
  }


}
