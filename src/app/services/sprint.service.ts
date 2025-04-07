import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Sprint, SprintDTO } from '../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private endpoint = 'sprints';

  constructor(private apiService: ApiService) { }

  getAllSprints(): Observable<SprintDTO[]> {
    return this.apiService.get<SprintDTO[]>(this.endpoint);
  }

  getSprintById(id: number): Observable<SprintDTO> {
    return this.apiService.getById<SprintDTO>(this.endpoint, id);
  }

  getSprintsActifs(date?: Date): Observable<SprintDTO[]> {
    let url = `${this.endpoint}/actifs`;
    if (date) {
      url += `?date=${date.toISOString()}`;
    }
    return this.apiService.get<SprintDTO[]>(url);
  }

  createSprint(sprint: Sprint): Observable<SprintDTO> {
    return this.apiService.post<SprintDTO>(this.endpoint, sprint);
  }

  updateSprint(id: number, sprint: Sprint): Observable<SprintDTO> {
    return this.apiService.put<SprintDTO>(this.endpoint, id, sprint);
  }

  demarrerSprint(id: number, dateDebut?: Date): Observable<SprintDTO> {
    let url = `${this.endpoint}/${id}/demarrer`;
    if (dateDebut) {
      url += `?dateDebut=${dateDebut.toISOString()}`;
    }
    return this.apiService.put<SprintDTO>(url, id, {}); // <-- Correction
  }

  terminerSprint(id: number, dateFin?: Date): Observable<SprintDTO> {
    let url = `${this.endpoint}/${id}/terminer`;
    if (dateFin) {
      url += `?dateFin=${dateFin.toISOString()}`;
    }
    return this.apiService.put<SprintDTO>(url, id, {}); // <-- Correction
  }

  deleteSprint(id: number): Observable<void> {
    const url = `${this.endpoint}/${id}`;
    return this.apiService.delete<void>(url, id); // <-- Correction
  }
}