import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../models/utilisateur.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authEndpoint = 'api/auth'; // Modifié pour inclure 'api/' avant 'auth'

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  /**
   * Authentifie un utilisateur avec son email et mot de passe
   * @param email l'email de l'utilisateur
   * @param password le mot de passe de l'utilisateur
   * @returns Observable avec les informations d'authentification (token, rôle)
   */
  login(email: string, password: string): Observable<any> {
    console.log('Tentative de connexion avec:', email);
    console.log('URL de l\'API:', `${this.apiUrl}/${this.authEndpoint}/login`);
    
    // Créer un objet avec les identifiants
    const credentials = { email, password };
    
    // Envoyer une requête POST à l'API d'authentification
    return this.http.post<any>(`${this.apiUrl}/${this.authEndpoint}/login`, credentials).pipe(
      map(response => {
        console.log('Réponse de l\'API:', response);
        
        if (response && response.token && response.role) {
          // Autoriser tous les rôles à se connecter
          return {
            token: response.token,
            role: response.role,
            nom: response.nom || ''
          };
        } else {
          throw new Error('Réponse invalide du serveur');
        }
      }),
      catchError(error => {
        console.error('Erreur d\'authentification:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Vérifie si l'utilisateur est actuellement authentifié
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  /**
   * Vérifie si l'utilisateur a le rôle ADMIN
   * @returns true si l'utilisateur a le rôle ADMIN, false sinon
   */
  isAdmin(): boolean {
    const role = localStorage.getItem('user_role');
    return role === 'ADMIN';
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role le rôle à vérifier
   * @returns true si l'utilisateur a le rôle spécifié, false sinon
   */
  hasRole(role: string): boolean {
    const userRole = localStorage.getItem('user_role');
    return userRole === role;
  }

  /**
   * Récupère le rôle de l'utilisateur actuel
   * @returns le rôle de l'utilisateur ou null s'il n'est pas authentifié
   */
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  /**
   * Récupère le nom de l'utilisateur actuel
   * @returns le nom de l'utilisateur ou null s'il n'est pas authentifié
   */
  getUserName(): string | null {
    return localStorage.getItem('user_name');
  }

  /**
   * Déconnecte l'utilisateur en supprimant le token et les informations de session
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  }
}
