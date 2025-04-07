import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Utilisateur, UtilisateurDTO } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private endpoint = 'utilisateurs';

  constructor(private apiService: ApiService) { }

  /**
   * Récupère tous les utilisateurs
   * @returns Observable avec la liste des utilisateurs
   */
  getAllUtilisateurs(): Observable<UtilisateurDTO[]> {
    return this.apiService.get<UtilisateurDTO[]>(this.endpoint);
  }

  /**
   * Récupère un utilisateur par son ID
   * @param id l'identifiant de l'utilisateur
   * @returns Observable avec l'utilisateur
   */
  getUtilisateurById(id: number): Observable<UtilisateurDTO> {
    return this.apiService.getById<UtilisateurDTO>(this.endpoint, id);
  }

  /**
   * Crée un nouvel utilisateur
   * @param utilisateur les données de l'utilisateur à créer
   * @returns Observable avec l'utilisateur créé
   */
  // Dans utilisateur.service.ts
createUtilisateur(utilisateur: Utilisateur): Observable<UtilisateurDTO> {
  console.log('Création d\'un utilisateur:', utilisateur); // Ajoutez ce log pour déboguer
  return this.apiService.post<UtilisateurDTO>(this.endpoint, utilisateur);
}


  /**
   * Met à jour un utilisateur existant
   * @param id l'identifiant de l'utilisateur
   * @param utilisateur les nouvelles données de l'utilisateur
   * @returns Observable avec l'utilisateur mis à jour
   */
  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<UtilisateurDTO> {
    return this.apiService.put<UtilisateurDTO>(this.endpoint, id, utilisateur);
  }

  /**
   * Supprime un utilisateur
   * @param id l'identifiant de l'utilisateur à supprimer
   * @returns Observable avec la réponse de suppression
   */
  deleteUtilisateur(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}
