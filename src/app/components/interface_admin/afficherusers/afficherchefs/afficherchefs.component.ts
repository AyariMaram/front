import { Component, ElementRef, ViewChild } from '@angular/core';
import { PersonnelserviceService } from '../../../../personnel/personnelservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserService } from '../../../../services/profile/user.service';
import { FormControl } from '@angular/forms';
import { Personnel } from '../../../../models/Personnel';

@Component({
  selector: 'app-afficherchefs',
  templateUrl: './afficherchefs.component.html',
  styleUrl: './afficherchefs.component.css'
})
export class AfficherchefsComponent {
  chefs: Personnel[] = [];
  chef: Personnel = new Personnel;
  unreadNotificationCount: number = 0;

  constructor(
    private afficherusersService: PersonnelserviceService,
    private supprimerchefService: PersonnelserviceService,
    private router:Router,
    private notificationService:NotificationService,
    private http: HttpClient, private profile :UserService

  ) {


  }


  
  searchQuerySubscription: Subscription | undefined;

  ngOnInit(): void {
    this.affichertouschefs();
    //serach
    this.searchQuerySubscription = this.searchQueryControl.valueChanges
    .pipe(
      debounceTime(300), // Attendre 300ms après la dernière saisie
      distinctUntilChanged() // Ne déclenche que si la valeur a changé
    )
    .subscribe(() => {
      this.searchUsers(this.searchQueryControl.value); // Passer la valeur de l'input de recherche
    });

  }




  ngOnDestroy(): void {
    // Nettoyer l'abonnement pour éviter les fuites de mémoire
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }




   private affichertouschefs() {
    this.afficherusersService.getAllChefs()
      .subscribe(chefs => {this.chefs = chefs});
  }

   supprimerChef(id: number): void {
    this.supprimerchefService.supprimerPersonnel(id)
      .subscribe();
      window.location.reload();

  }


  afficherChef(id: number): void{
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


chefIdToDelete: number | null = null;

supprimerChefConfirmation(): void {
  if (this.chefIdToDelete) {
    this.supprimerChef(this.chefIdToDelete);
    this.chefIdToDelete = null;

  }
}


afficherConfirmationSuppression(chefId: number): void {
  this.chefIdToDelete = chefId;
}
annulerSuppression(): void {
  this.chefIdToDelete = null;
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






  personnelList: Personnel[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  searchQueryControl: FormControl = new FormControl('');


  
searchUsers(query: string) {
  if (query.trim() !== '') {
    this.profile.searchUsers(query)
      .subscribe(
        (data) => {
          this.chefs =  data.filter(chefs=> chefs.role !== 'EMPLOYEE'&&chefs.role !== 'ADMIN');

        },
        (error) => {
          this.chefs = [];

          console.error('Une erreur s\'est produite lors de la recherche : ', error);
        }
      );
  } else {
    this.chefs = [];
  }
  }



 //recherche

}


