export interface Feedback {
  id?: number;
  contenu?: string;
  dateCreation?: Date;
  clientId?: number;
  clientNom?: string;
  clientEmail?: string;
  statut?: string;
  score?: number;
  dateModification?: Date;
}

export interface FeedbackDTO {
  id?: number;
  contenu?: string;
  dateCreation?: string;
  clientId?: number;
  clientNom?: string;
  clientEmail?: string;
  statut?: string;
  score?: number;
  dateModification?: string;
}
