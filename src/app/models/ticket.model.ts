export interface Ticket {
  id?: number;
  titre?: string;
  description?: string;
  priorite?: string;
  statut?: string;
  dateCreation?: Date;
  dateModification?: Date;
  feedbackId?: number;
  analyseId?: number;
  sprintId?: number;
}

export interface TicketDTO {
  id?: number;
  titre?: string;
  description?: string;
  priorite?: string;
  statut?: string;
  dateCreation?: string;
  dateModification?: string;
  feedbackId?: number;
  analyseId?: number;
  sprintId?: number;
}
