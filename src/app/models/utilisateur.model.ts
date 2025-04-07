export interface Utilisateur {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  motDePasse?: string;
  role?: string;
  dateCreation?: Date;
  dateModification?: Date;
}

export interface UtilisateurDTO {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  role?: string;
  dateCreation?: string;
  dateModification?: string;
}
