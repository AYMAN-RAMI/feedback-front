import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  roleDescription: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer le nom et le rôle de l'utilisateur depuis le localStorage
    this.userName = localStorage.getItem('user_name') || '';
    this.userRole = localStorage.getItem('user_role') || '';
    
    // Définir la description du rôle en fonction du rôle de l'utilisateur
    switch(this.userRole) {
      case 'ADMIN':
        this.roleDescription = 'admin';
        break;
      case 'CLIENT':
        this.roleDescription = 'client';
        break;
      case 'DEV':
        this.roleDescription = 'développeur';
        break;
      case 'PO':
        this.roleDescription = 'product owner';
        break;
      case 'SCRUM':
        this.roleDescription = 'scrum master';
        break;
      default:
        this.roleDescription = 'utilisateur';
    }
  }
}
