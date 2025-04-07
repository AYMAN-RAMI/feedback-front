import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Feedback, FeedbackDTO } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private endpoint = 'feedbacks';

  constructor(private apiService: ApiService) { }

  /**
   * Récupère tous les feedbacks
   * @returns Observable avec la liste des feedbacks
   */
  getAllFeedbacks(): Observable<FeedbackDTO[]> {
    return this.apiService.get<FeedbackDTO[]>(this.endpoint);
  }

  /**
   * Récupère un feedback par son ID
   * @param id l'identifiant du feedback
   * @returns Observable avec le feedback
   */
  getFeedbackById(id: number): Observable<FeedbackDTO> {
    return this.apiService.getById<FeedbackDTO>(this.endpoint, id);
  }

  /**
   * Récupère les feedbacks d'un client
   * @param clientId l'identifiant du client
   * @returns Observable avec la liste des feedbacks du client
   */
  getFeedbacksByClientId(clientId: number): Observable<FeedbackDTO[]> {
    return this.apiService.get<FeedbackDTO[]>(`clients/${clientId}/feedbacks`);
  }

  /**
   * Crée un nouveau feedback
   * @param feedback les données du feedback à créer
   * @returns Observable avec le feedback créé
   */
  createFeedback(feedback: Feedback): Observable<FeedbackDTO> {
    return this.apiService.post<FeedbackDTO>(this.endpoint, feedback);
  }

  /**
   * Crée un nouveau feedback pour un client spécifique
   * @param clientId l'identifiant du client
   * @param feedback les données du feedback à créer
   * @returns Observable avec le feedback créé
   */
  createFeedbackForClient(clientId: number, feedback: Feedback): Observable<FeedbackDTO> {
    return this.apiService.post<FeedbackDTO>(`clients/${clientId}/feedbacks`, feedback);
  }

  /**
   * Met à jour un feedback existant
   * @param id l'identifiant du feedback
   * @param feedback les nouvelles données du feedback
   * @returns Observable avec le feedback mis à jour
   */
  updateFeedback(id: number, feedback: Feedback): Observable<FeedbackDTO> {
    return this.apiService.put<FeedbackDTO>(this.endpoint, id, feedback);
  }

  /**
   * Supprime un feedback
   * @param id l'identifiant du feedback à supprimer
   * @returns Observable avec la réponse de suppression
   */
  deleteFeedback(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}
