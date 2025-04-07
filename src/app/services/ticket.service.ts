import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Ticket, TicketDTO } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private endpoint = 'tickets';

  constructor(private apiService: ApiService) { }

  /**
   * Récupère tous les tickets
   * @returns Observable avec la liste des tickets
   */
  getAllTickets(): Observable<TicketDTO[]> {
    return this.apiService.get<TicketDTO[]>(this.endpoint);
  }

  /**
   * Récupère un ticket par son ID
   * @param id l'identifiant du ticket
   * @returns Observable avec le ticket
   */
  getTicketById(id: number): Observable<TicketDTO> {
    return this.apiService.getById<TicketDTO>(this.endpoint, id);
  }

  /**
   * Récupère les tickets associés à un feedback
   * @param feedbackId l'identifiant du feedback
   * @returns Observable avec la liste des tickets
   */
  getTicketsByFeedbackId(feedbackId: number): Observable<TicketDTO[]> {
    return this.apiService.get<TicketDTO[]>(`feedbacks/${feedbackId}/tickets`);
  }

  /**
   * Récupère les tickets associés à une analyse IA
   * @param analyseId l'identifiant de l'analyse IA
   * @returns Observable avec la liste des tickets
   */
  getTicketsByAnalyseId(analyseId: number): Observable<TicketDTO[]> {
    return this.apiService.get<TicketDTO[]>(`analyses/${analyseId}/tickets`);
  }

  /**
   * Récupère les tickets d'un sprint
   * @param sprintId l'identifiant du sprint
   * @returns Observable avec la liste des tickets
   */
  getTicketsBySprintId(sprintId: number): Observable<TicketDTO[]> {
    return this.apiService.get<TicketDTO[]>(`sprints/${sprintId}/tickets`);
  }

  /**
   * Crée un nouveau ticket
   * @param ticket les données du ticket à créer
   * @returns Observable avec le ticket créé
   */
  createTicket(ticket: Ticket): Observable<TicketDTO> {
    return this.apiService.post<TicketDTO>(this.endpoint, ticket);
  }

  /**
   * Met à jour un ticket existant
   * @param id l'identifiant du ticket
   * @param ticket les nouvelles données du ticket
   * @returns Observable avec le ticket mis à jour
   */
  updateTicket(id: number, ticket: Ticket): Observable<TicketDTO> {
    return this.apiService.put<TicketDTO>(this.endpoint, id, ticket);
  }

  /**
   * Change le statut d'un ticket
   * @param id l'identifiant du ticket
   * @param statut le nouveau statut
   * @returns Observable avec le ticket mis à jour
   */
  updateTicketStatus(id: number, statut: string): Observable<TicketDTO> {
    return this.apiService.put<TicketDTO>(
      `${this.endpoint}/${id}/statut`, 
      id,  // <-- Remplacez "null" par "id" (doit être un nombre)
      { statut }  // Données à envoyer
    );
  }

  /**
   * Supprime un ticket
   * @param id l'identifiant du ticket à supprimer
   * @returns Observable avec la réponse de suppression
   */
  deleteTicket(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}
