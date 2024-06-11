import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserService } from '../../../../services/profile/user.service';
import { PersonnelserviceService } from '../../../../personnel/personnelservice.service';
import { Subscription } from 'rxjs';
import { Personnel } from '../../../../models/Personnel';

@Component({
  selector: 'app-afficheremployes',
  templateUrl: './afficheremployes.component.html',
  styleUrl: './afficheremployes.component.css'
})
export class AfficheremployesComponent {
  employes: Personnel[] = [];
  employe: Personnel = new Personnel;
  private subscription!: Subscription;
  unreadNotificationCount: number = 0;

  constructor(
    private afficherusersService: PersonnelserviceService,
    private supprimerchefService: PersonnelserviceService,
    private router:Router,    private notificationService:NotificationService, private profile :UserService


  ) {


  }


  ngOnInit(): void {
    this.affichertousemployes();
  }

  private affichertousemployes() {
    this.afficherusersService.getAllEmployees()
      .subscribe((employes: Personnel[]) => {
        this.employes = employes;
      });
  }
  supprimerEmploye(id: number): void {
    this.supprimerchefService.supprimerPersonnel(id).subscribe();
    window.location.reload();

  }
  afficherEmploye(id: number): void{
    this.router.navigate(['admin/afficheruser',id]);
    }
  showModal: boolean = false;
  role: string = '';

  openModal(role: string) {
    this.role = role;
    this.showModal = true;
    console.log(this.showModal)

  }

  closeModal(): void {
    this.showModal = false;
  console.log(this.showModal)
  }
  redirectToHome() {
    this.router.navigate(['/home']);
  }



  employeIdToDelete: number | null = null;

  supprimerEmployeConfirmation(): void {
    if (this.employeIdToDelete) {
      this.supprimerEmploye(this.employeIdToDelete);
      this.employeIdToDelete = null;
    }
  }


  afficherConfirmationSuppression(employeId: number): void {
    this.employeIdToDelete = employeId;
  }
  annulerSuppression(): void {
    this.employeIdToDelete = null;
  }
//recherche
showSearchBox: boolean = false;
searchQuery: string = '';

toggleSearchBox(): void {
  this.showSearchBox = !this.showSearchBox;
}

@ViewChild('searchInput') searchInput!: ElementRef;


openSearchBox(): void {
  this.showSearchBox = true;
  setTimeout(() => {
    this.searchInput.nativeElement.focus();
  }, 0);
}



searchUsers(query: string) {
  if (query.trim() !== '') {
    this.profile.searchUsers(query)
      .subscribe(
        (data: Personnel[]) => {
          this.employes =  data.filter(employes=> employes.role !== 'CHEF' && employes.role !== 'ADMIN');
        },
        (error: any) => {
          this.employes = [];

          console.error('Une erreur s\'est produite lors de la recherche : ', error);
        }
      );
  } else {
    this.employes = [];
  }
}
}
