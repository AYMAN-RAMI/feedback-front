import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Backlog, BacklogDTO } from '../models/backlog.model';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private endpoint = 'backlogs';

  constructor(private apiService: ApiService) { }

  /**
   * Récupère tous les backlogs
   * @returns Observable avec la liste des backlogs
   */
  getAllBacklogs(): Observable<BacklogDTO[]> {
    return this.apiService.get<BacklogDTO[]>(this.endpoint);
  }

  /**
   * Récupère un backlog par son ID
   * @param id l'identifiant du backlog
   * @returns Observable avec le backlog
   */
  getBacklogById(id: number): Observable<BacklogDTO> {
    return this.apiService.getById<BacklogDTO>(this.endpoint, id);
  }

  /**
   * Crée un nouveau backlog
   * @param backlog les données du backlog à créer
   * @returns Observable avec le backlog créé
   */
  createBacklog(backlog: Backlog): Observable<BacklogDTO> {
    return this.apiService.post<BacklogDTO>(this.endpoint, backlog);
  }

  /**
   * Met à jour un backlog existant
   * @param id l'identifiant du backlog
   * @param backlog les nouvelles données du backlog
   * @returns Observable avec le backlog mis à jour
   */
  updateBacklog(id: number, backlog: Backlog): Observable<BacklogDTO> {
    return this.apiService.put<BacklogDTO>(this.endpoint, id, backlog);
  }

  /**
   * Ajoute un ticket au backlog
   * @param id l'identifiant du backlog
   * @param ticketId l'identifiant du ticket à ajouter
   * @returns Observable avec le backlog mis à jour
   */
  addTicketToBacklog(id: number, ticketId: number): Observable<BacklogDTO> {
    return this.apiService.post<BacklogDTO>(`${this.endpoint}/${id}/tickets/${ticketId}`, null);
  }

  /**
   * Retire un ticket du backlog
   * @param id l'identifiant du backlog
   * @param ticketId l'identifiant du ticket à retirer
   * @returns Observable avec le backlog mis à jour
   */
  removeTicketFromBacklog(id: number, ticketId: number): Observable<BacklogDTO> {
    return this.apiService.delete<BacklogDTO>(`${this.endpoint}`, id);  // <-- Ajoutez l'ID;
  }

  /**
   * Supprime un backlog
   * @param id l'identifiant du backlog à supprimer
   * @returns Observable avec la réponse de suppression
   */
  deleteBacklog(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}
