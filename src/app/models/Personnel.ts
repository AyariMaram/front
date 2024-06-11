
export enum ROLe {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CHEF = 'CHEF'
}

export class Personnel {
    id!: number;
  nom!: string;
  prenom!: string;
  cin!: string;
  service!: string;
  role!: ROLe;
  sexe!: string;
  tel!: string;
  email!: string;
  nbrEnfant!: number;
  login!: string;
  statut!:string;
  password!: string;
  matricule!: string;
  presence!:string
}
