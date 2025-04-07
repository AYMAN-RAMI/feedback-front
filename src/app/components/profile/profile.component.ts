import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Récupérer l'email de l'utilisateur connecté depuis le localStorage ou autre source
    const userRole = this.authService.getUserRole();
    
    // Récupérer tous les utilisateurs et trouver celui qui correspond à l'utilisateur connecté
    this.http.get<any[]>(`${this.apiUrl}/utilisateurs`).subscribe({
      next: (users) => {
        // Trouver l'utilisateur qui a le rôle correspondant à celui stocké
        // Cette approche est simplifiée, dans un cas réel on utiliserait un ID ou un token
        const currentUser = users.find(user => user.role === userRole);
        if (currentUser) {
          this.userInfo = currentUser;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  logout(): void {
    // Appeler la méthode de déconnexion du service d'authentification
    this.authService.logout();
    
    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
