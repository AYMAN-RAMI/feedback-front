import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AnalyseIA, AnalyseIADTO } from '../models/analyse-ia.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyseIaService {
  private endpoint = 'analyses';

  constructor(private apiService: ApiService) { }

  /**
   * Récupère toutes les analyses IA
   * @returns Observable avec la liste des analyses IA
   */
  getAllAnalyses(): Observable<AnalyseIADTO[]> {
    return this.apiService.get<AnalyseIADTO[]>(this.endpoint);
  }

  /**
   * Récupère une analyse IA par son ID
   * @param id l'identifiant de l'analyse IA
   * @returns Observable avec l'analyse IA
   */
  getAnalyseById(id: number): Observable<AnalyseIADTO> {
    return this.apiService.getById<AnalyseIADTO>(this.endpoint, id);
  }

  /**
   * Récupère l'analyse IA d'un feedback
   * @param feedbackId l'identifiant du feedback
   * @returns Observable avec l'analyse IA du feedback
   */
  getAnalyseByFeedbackId(feedbackId: number): Observable<AnalyseIADTO> {
    return this.apiService.get<AnalyseIADTO>(`feedbacks/${feedbackId}/analyse`);
  }

  /**
   * Crée une nouvelle analyse IA
   * @param analyse les données de l'analyse IA à créer
   * @returns Observable avec l'analyse IA créée
   */
  createAnalyse(analyse: AnalyseIA): Observable<AnalyseIADTO> {
    return this.apiService.post<AnalyseIADTO>(this.endpoint, analyse);
  }

  /**
   * Génère une analyse IA pour un feedback
   * @param feedbackId l'identifiant du feedback
   * @returns Observable avec l'analyse IA générée
   */
  generateAnalyseForFeedback(feedbackId: number): Observable<AnalyseIADTO> {
    return this.apiService.post<AnalyseIADTO>(`feedbacks/${feedbackId}/analyse`, {});
  }

  /**
   * Met à jour une analyse IA existante
   * @param id l'identifiant de l'analyse IA
   * @param analyse les nouvelles données de l'analyse IA
   * @returns Observable avec l'analyse IA mise à jour
   */
  updateAnalyse(id: number, analyse: AnalyseIA): Observable<AnalyseIADTO> {
    return this.apiService.put<AnalyseIADTO>(this.endpoint, id, analyse);
  }

  /**
   * Supprime une analyse IA
   * @param id l'identifiant de l'analyse IA à supprimer
   * @returns Observable avec la réponse de suppression
   */
  deleteAnalyse(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}
