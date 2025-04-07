import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SprintService } from '../../services/sprint.service';
import { SprintDTO } from '../../models/sprint.model';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  sprints: SprintDTO[] = [];
  displayedColumns: string[] = ['id', 'nom', 'description', 'dateDebut', 'dateFin', 'statut', 'actions'];

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    this.loadSprints();
  }

  loadSprints(): void {
    this.sprintService.getAllSprints().subscribe({
      next: (data) => {
        this.sprints = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sprints', error);
      }
    });
  }

  deleteSprint(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sprint ?')) {
      this.sprintService.deleteSprint(id).subscribe({
        next: () => {
          this.loadSprints();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du sprint', error);
        }
      });
    }
  }
}
