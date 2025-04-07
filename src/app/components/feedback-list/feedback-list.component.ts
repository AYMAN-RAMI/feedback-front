import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackDTO } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: FeedbackDTO[] = [];
  displayedColumns: string[] = ['id', 'contenu', 'clientNom', 'statut', 'score', 'dateCreation', 'actions'];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des feedbacks', error);
      }
    });
  }

  deleteFeedback(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          this.loadFeedbacks();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du feedback', error);
        }
      });
    }
  }
}
