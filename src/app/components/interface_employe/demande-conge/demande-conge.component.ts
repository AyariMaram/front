import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Conge } from '../../../models/Conge';
import { CongeService } from '../../../services/conge/conge.service';
import { UserService } from '../../../services/profile/user.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrl: './demande-conge.component.css'
})
export class DemandeCongeComponent implements OnInit{
  showFiledError: boolean = false;

  message: string = '';
  sexe!: string ;
  statut!: string ;
  startDate!: string;
  duration!: number;
solde!:number;
  Iswomanmarried!: boolean ;


  conge: Conge = new Conge();
  selectedFile!:File ;

FormCongee!:FormGroup;
  showMaterniteField!: boolean;
CongeType: any;
constructor(private fb: FormBuilder, private congeService: CongeService, private profileService: UserService, private router:Router) { }

ngOnInit(): void {
  forkJoin([
    this.profileService.getUserSolde(),
    this.profileService.getUserSex(),
    this.profileService.getUserCivilStatus()
  ]).subscribe(
    ([solde, sexe, statut]: [string, string, string]) => {
      this.solde = parseInt(solde, 10);
      this.sexe = sexe;
      this.statut=statut;

    //  console.log('user solde:', this.solde);

    },
    (error: any) => {
      console.error('Error fetching user data:', error);
    }
  );




this.FormCongee=this.fb.group({
  type:[""],
  date_debut:[""],
  date_fin:[""],
  statut:[""],
  duree:[""],
  motif: [''],
  description: [""]
})

}


isWomanAndMarried(sexe: string, statut: string): boolean {
  return sexe === 'femme' && statut === 'mariee';
}


ajouterConge(): void {
  if (this.FormCongee.invalid) {
    this.showFiledError = true;
    return;
  }

  if (!this.selectedFile) {
    this.showFiledError = true;
    return;
  }

 this.showFiledError = false;

  this.congeService.getCurrentUserId().subscribe(
    (userId: number) => {
      const congee = this.FormCongee.value;
      congee.statut = 'En_Attente';
      // calculer date fin
      const startDate = new Date(congee.date_debut);
      const duration = congee.duree;
      const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);

      congee.date_fin = endDate.toISOString();
      congee.user = userId;

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('conge', JSON.stringify(congee));

      this.congeService.ajouterConge(formData).subscribe(
        (data) => {
          if (data) {
            this.message = 'Congé ajouté avec succès';
            setTimeout(() => {
              this.FormCongee.reset();
              this.message = '';
            }, 2000);
          }
        },
        (error) => {
          if (error.status === 400) {
            this.message = 'Deux personnes de votre service ont déjà pris un congé pendant cette période.';
          } else {
            this.message = 'Erreur lors de l\'ajout du congé';
          }
        }
      );
    },
  );
}




motifOptions = [
  { value: "Naissance d'un enfant", label: "Naissance d'un enfant" },
  { value: "Décès conjoint, enfant, ascendant, frère, soeur", label: "Décès conjoint, enfant, ascendant, frère, soeur" },
  { value: "Décès petit fils, petit fille, tante ou d'un oncle", label: "Décès petit fils, petit fille, tante ou d'un oncle" },
  { value: "Décès d'un cousin ", label: "Décès d'un cousin " },
  { value: "Mariage", label: "Mariage" },
  { value: "Circoncision", label: "Circoncision" },
  { value: "Changement de domicile légale", label: "Changement de domicile légale" },
  { value: "Pèlerinage", label: "Pèlerinage" },
  { value: "Autorisation syndicale", label: "Autorisation syndicale" },
  { value: "Autre", label: "Autre" }
];
showOther = false;

onChange(event: any) {
  this.selectedFile = event.target.files[0];
}


toggleTextarea(selectedValue: string): void {

  const motifControl = this.FormCongee.get('motif');


  if (motifControl !== null && motifControl?.value === 'Autre') {

    motifControl.enable();
  } else if (motifControl !== null) {
    motifControl.disable();
  }
}
redirectToHome() {
  this.router.navigate(['/homee']);
}

  }

