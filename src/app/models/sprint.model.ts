export interface Sprint {
  id?: number;
  nom?: string;
  description?: string;
  dateDebut?: Date;
  dateFin?: Date;
  statut?: string;
  ticketIds?: number[];
}

export interface SprintDTO {
  id?: number;
  nom?: string;
  description?: string;
  dateDebut?: string;
  dateFin?: string;
  statut?: string;
  ticketIds?: number[];
}
