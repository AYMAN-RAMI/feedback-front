import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { UtilisateurDTO } from '../../models/utilisateur.model';

@Component({
  selector: 'app-utilisateur-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './utilisateur-detail.component.html',
  styleUrls: ['./utilisateur-detail.component.scss']
})
export class UtilisateurDetailComponent implements OnInit {
  utilisateur: UtilisateurDTO | null = null;
  utilisateurId: number = 0;

  constructor(
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.utilisateurId = +id;
      this.loadUtilisateur();
    }
  }

  loadUtilisateur(): void {
    this.utilisateurService.getUtilisateurById(this.utilisateurId).subscribe({
      next: (data) => {
        this.utilisateur = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur', error);
      }
    });
  }

  deleteUtilisateur(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(this.utilisateurId).subscribe({
        next: () => {
          this.router.navigate(['/utilisateurs']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      });
    }
  }
}
