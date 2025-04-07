import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BacklogService } from '../../services/backlog.service';
import { BacklogDTO } from '../../models/backlog.model';

@Component({
  selector: 'app-backlog-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss']
})
export class BacklogListComponent implements OnInit {
  backlogs: BacklogDTO[] = [];
  displayedColumns: string[] = ['id', 'statut', 'ticketsCount', 'actions'];

  constructor(private backlogService: BacklogService) { }

  ngOnInit(): void {
    this.loadBacklogs();
  }

  loadBacklogs(): void {
    this.backlogService.getAllBacklogs().subscribe({
      next: (data) => {
        this.backlogs = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des backlogs', error);
      }
    });
  }

  deleteBacklog(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce backlog ?')) {
      this.backlogService.deleteBacklog(id).subscribe({
        next: () => {
          this.loadBacklogs();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du backlog', error);
        }
      });
    }
  }
}
