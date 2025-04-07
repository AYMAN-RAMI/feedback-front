import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Méthode générique pour les requêtes GET
   * @param endpoint le point de terminaison de l'API
   * @returns Observable avec la réponse
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  /**
   * Méthode générique pour récupérer une ressource par son ID
   * @param endpoint le point de terminaison de l'API
   * @param id l'identifiant de la ressource
   * @returns Observable avec la réponse
   */
  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  /**
   * Méthode générique pour les requêtes POST
   * @param endpoint le point de terminaison de l'API
   * @param data les données à envoyer
   * @returns Observable avec la réponse
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Méthode générique pour les requêtes PUT
   * @param endpoint le point de terminaison de l'API
   * @param id l'identifiant de la ressource
   * @param data les données à envoyer
   * @returns Observable avec la réponse
   */
  put<T>(endpoint: string, id: number, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data);
  }

  /**
   * Méthode générique pour les requêtes DELETE
   * @param endpoint le point de terminaison de l'API
   * @param id l'identifiant de la ressource
   * @returns Observable avec la réponse
   */
  delete<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }
}
