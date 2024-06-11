import { Component, ElementRef, ViewChild } from '@angular/core';
import { Conge } from '../../models/Conge';
import { PersonnelserviceService } from '../../personnel/personnelservice.service';
import { Router } from '@angular/router';
import { ImageService } from '../../services/ImageService/image.service';
import { CongeService } from '../../services/conge/conge.service';
import { UserService } from '../../services/profile/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {
  conges: Conge[] = [];
  userProfile: any;
  userId: number | undefined;
  service!:string;

  constructor(
    private congeService:CongeService,
    private router: Router,
    private imageService:ImageService,
    private profile:UserService
     ) {}


     
  ngOnInit(): void {


    this.profile.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.userId = this.userProfile.id;
        this.service=this.userProfile.service;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
    console.log()
    this.afficherArchive();



  }

  private afficherArchive() {
    this.congeService.getArchive()
      .subscribe(conges => {

        this.conges = conges.filter(conge =>  conge.user.service === this.service);

console.log(this.conges)

      });
      
  }



  refuserConge(id: number): void {
    this.congeService.refuserConge(id).subscribe(
      () => {
        alert('Congé refusé avec succès');
      },
      (error) => {
        console.error('Erreur lors du refus du congé :', error);
      }
    );
    window.location.reload();

  }


  confirmerConge(id: number): void {
    this.congeService.confirmerConge(id).subscribe(
      () => {
        alert('Congé confirmé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la confirmation du congé :', error);
      }
    );
    window.location.reload();

  }

getStatusStyle(statut: string): any {
  switch (statut) {
    case 'Confirmé':
      return { 'background-color': '#90EE90', color: 'white', 'border-radius': '10px' };
    case 'Refusé':
      return { 'background-color': '#DC143C', color: 'white', 'border-radius': '  10px' };
    case 'En_Attente':
      return { 'background-color': '#FFCE26', color: 'white', 'border-radius': '10px' };
    default:
      return {};
  }
}

redirectToHome() {
  this.router.navigate(['/homee']);
}
showCalendar: boolean = false;
toggleCalendar(): void {
  this.showCalendar = !this.showCalendar;
}
closeCalendar(): void {
  this.showCalendar = false;
}
//getimage
imageSrc: string | ArrayBuffer | null = null;
afficherImage(conge: any, fileName: string): void {
  this.imageService.getImage(conge, fileName)
    .subscribe((response: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        if (fileName.toLowerCase().endsWith('.pdf')) {
          const fileURL = URL.createObjectURL(response);
          window.open(fileURL, '_blank');
        } else {
          this.imageSrc = reader.result;
        }
      };
    }, error => {
      console.error('Erreur lors du chargement du fichier:', error);
      this.imageSrc = null;
    });
}

getCongeId(conge: any): number {
  return conge.id;
}
getCongefile(conge: any): string {
  return conge.file;
}
closeImage(): void {
  this.imageSrc = null;
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



searchconges(query: string) {
  if (query.trim() !== '' ) {
    this.profile.searchConges(query)
      .subscribe(
        (data) => {
          if (data) {
            this.conges = data.filter(conge => conge.user.service === this.service && conge.statut !== 'En_Attente');

           

          } else {
            this.conges = [];
          }
        },
        (error) => {
          this.conges = [];
          console.error('Une erreur s\'est produite lors de la recherche : ', error);
        }
      );
  } else {
    this.conges = [];
  }
}






}
