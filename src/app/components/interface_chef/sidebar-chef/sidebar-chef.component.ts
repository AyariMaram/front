import { AfterViewInit, Component } from '@angular/core';
import { Personnel } from '../../../models/Personnel';
import { LogoutService } from '../../../services/logout/logout.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/profile/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-chef',
  templateUrl: './sidebar-chef.component.html',
  styleUrl: './sidebar-chef.component.css'
})
export class SidebarChefComponent implements  AfterViewInit{


  personnel: Personnel = new Personnel();
  userId: number | undefined;
  userProfile: any = null;

  
  constructor(private logoutService: LogoutService, private router: Router, private httpClient: HttpClient, private profileService:UserService) { }
 

  //js

  ngAfterViewInit(): void {
    this.initSidebar();
  }
  private initSidebar(): void {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (allSideMenu && menuBar && sidebar && content) {
      allSideMenu.forEach(item => {
        item.addEventListener('click', function(event) {
          event.preventDefault();
          allSideMenu.forEach(i => {
            i.parentElement?.classList.remove('active');
          });
          item.parentElement?.classList.add('active');
        });
      });

      menuBar.addEventListener('click', function() {
        sidebar.classList.toggle('hide');
        if (sidebar.classList.contains('hide')) {
          content.style.width = 'calc(100% - 60px)';
          content.style.left = '60px';
        } else {
          content.style.width = 'calc(100% - 280px)';
          content.style.left = '280px';
        }
      });

      window.addEventListener('resize', function() {
        if (sidebar && content) {
          sidebar.classList.add('hide');
          content.style.width = 'calc(100% - 60px)';
          content.style.left = '60px';
        }
      });
    }
  }
    
 

  redirectToGererUsers() {
    this.router.navigate(['/admin/gererusers']);
  }

  redirectToArchive() {
    this.router.navigate(['/archive']);
  }

  redirectToAjouerConges() {
    this.router.navigate(['conge/demandeconge']);
  }

  redirectToMesConges() {
    this.router.navigate(['mesconges']);
  }

  redirectToCalendrier() {
    this.router.navigate(['calendrier']);
  }

  redirectToDemandes() {
    this.router.navigate(['conge/afficherconges']);
  }

  redirectToNotifications() {
    this.router.navigate(['notifications']);
  }

  redirectTodashbboard() {
    this.router.navigate(['/homee']);
  }


  redirectToAbsences() {
    this.router.navigate(['/absences']);
  }
  ngOnInit(): void {




     // Écoute des événements de navigation du routeur
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Recharge la page lorsque la navigation est terminée
        window.location.reload();
      }
    });

    
    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.userId = this.userProfile.id;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  private url = "http://localhost:8080/logout";

  userLogout(personnel: Personnel): Observable<Personnel> {
    return this.httpClient.post<Personnel>(this.url, personnel);
  }

  onLogout() {!
    this.userLogout(this.personnel).subscribe(
      () => {
        localStorage.removeItem('token');
        console.log('Logged out successfully!');
        this.router.navigate(['home']);
      },
      error => {
        console.error('Logout failed:', error);
      }
    );

    }

   
  showSecondaryElements: boolean = false;

  toggleSecondaryElements() {
    this.showSecondaryElements = !this.showSecondaryElements; // Toggle the boolean value
  }
 
}

