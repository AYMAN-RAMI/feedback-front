import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AnalyseIaService } from '../../services/analyse-ia.service';
import { AnalyseIADTO } from '../../models/analyse-ia.model';

@Component({
  selector: 'app-analyse-ia-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './analyse-ia-list.component.html',
  styleUrls: ['./analyse-ia-list.component.scss']
})
export class AnalyseIaListComponent implements OnInit {
  analyses: AnalyseIADTO[] = [];
  displayedColumns: string[] = ['id', 'feedbackId', 'sentiment', 'score', 'resume', 'dateAnalyse', 'actions'];

  constructor(private analyseIaService: AnalyseIaService) { }

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses(): void {
    this.analyseIaService.getAllAnalyses().subscribe({
      next: (data) => {
        this.analyses = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des analyses IA', error);
      }
    });
  }

  deleteAnalyse(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette analyse IA ?')) {
      this.analyseIaService.deleteAnalyse(id).subscribe({
        next: () => {
          this.loadAnalyses();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'analyse IA', error);
        }
      });
    }
  }
}
