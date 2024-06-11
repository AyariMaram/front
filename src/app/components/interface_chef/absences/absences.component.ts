import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Personnel } from '../../../models/Personnel';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserService } from '../../../services/profile/user.service';
import { PersonnelserviceService } from '../../../personnel/personnelservice.service';
import { CongeService } from '../../../services/conge/conge.service';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {
  employes: Personnel[] = [];
  employe: Personnel = new Personnel();
  unreadNotificationCount: number = 0;
  userProfile: any;
  userId: number | undefined;
  service!: string;
  loading: boolean = true;  // Ajouter un indicateur de chargement

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private afficherusersService: PersonnelserviceService,
    private router: Router,
    private notificationService: NotificationService,
    private profile: UserService,
    private congeService: CongeService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.profile.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.userId = this.userProfile.id;
        this.service = this.userProfile.service;
        console.log(this.service);
        this.afficherTousEmployes();  // Appeler afficherTousEmployes après avoir défini this.service
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        this.loading = false;  // Arrêter l'indicateur de chargement en cas d'erreur
      }
    );
  }

  private afficherTousEmployes(): void {
    this.afficherusersService.getAllEmployees().subscribe(
      (employes) => {
        this.employes = employes.filter(employe => employe.service === this.service);
        console.log(this.employes);
        this.loading = false;  // Arrêter l'indicateur de chargement après le chargement des données
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.loading = false;  // Arrêter l'indicateur de chargement en cas d'erreur
      }
    );
  }

  afficherEmploye(id: number): void {
    this.router.navigate(['admin/afficheruser', id]);
  }

  showModal: boolean = false;
  role: string = '';

  openModal(role: string) {
    this.role = role;
    this.showModal = true;
    console.log(this.showModal);
  }

  closeModal(): void {
    this.showModal = false;
    console.log(this.showModal);
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  employeIdToDelete: number | null = null;

  afficherConfirmationSuppression(employeId: number): void {
    this.employeIdToDelete = employeId;
  }

  annulerSuppression(): void {
    this.employeIdToDelete = null;
  }

  // recherche
  showSearchBox: boolean = false;
  searchQuery: string = '';

  toggleSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
  }

  openSearchBox(): void {
    this.showSearchBox = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  searchUsers(query: string): void {
    if (query.trim() !== '') {
      this.profile.searchUsers(query).subscribe(
        (data) => {
          if (data.length > 0) {
            this.employes = data.filter(employe => employe.service === this.service && employe.role === 'EMPLOYEE');
          } else {
            this.employes = [];
          }
        },
        (error) => {
          this.employes = [];
          console.error('Une erreur s\'est produite lors de la recherche :', error);
        }
      );
    } else {
      this.afficherTousEmployes();  // Réafficher tous les employés si la recherche est vide
    }
  }

  ajouterAbs(id: number): void {
    this.congeService.ajouterAbs(id).subscribe(
      () => {
        this.afficherTousEmployes();  // Recharger les employés après l'ajout de l'absence
      },
      (error) => {
        console.error('Erreur d\'ajouter Absence:', error);
      }
    );
  }
}
