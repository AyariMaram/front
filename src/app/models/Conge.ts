import { Personnel } from "./Personnel";

export enum TypeConge {
    ANNUEL ='ANNUEL',
    EXCEPTIONNEL= '  EXCEPTIONNEL',
    MATERNITE='MATERNITE',
    MALADIE='MALADIE'
  }
  
  export class Conge {
    id!: number;
    type!: TypeConge;
    date_demande!: Date;
    date_debut!: Date;
    date_fin!: Date;
    duree!: number;
    statut!: string;
    motif!: string;
    description! : string;
    file!: File;
    user!: Personnel; 
    chef!: number; 


 
  }