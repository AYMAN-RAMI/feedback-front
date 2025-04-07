import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Route de login (accessible sans authentification)
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  
  // Route par défaut - redirige vers la page de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Route d'accueil - protégée par AuthGuard
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
  
  // Route de profil - protégée par AuthGuard
  { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard] },
  
  // Routes pour les utilisateurs - protégées par AuthGuard
  { path: 'utilisateurs', loadComponent: () => import('./components/utilisateur-list/utilisateur-list.component').then(m => m.UtilisateurListComponent), canActivate: [AuthGuard] },
  { path: 'utilisateurs/new', loadComponent: () => import('./components/utilisateur-form/utilisateur-form.component').then(m => m.UtilisateurFormComponent), canActivate: [AuthGuard] },
  { path: 'utilisateurs/:id', loadComponent: () => import('./components/utilisateur-detail/utilisateur-detail.component').then(m => m.UtilisateurDetailComponent), canActivate: [AuthGuard] },
  { path: 'utilisateurs/:id/edit', loadComponent: () => import('./components/utilisateur-form/utilisateur-form.component').then(m => m.UtilisateurFormComponent), canActivate: [AuthGuard] },
  
  // Autres routes existantes - protégées par AuthGuard
  { path: 'feedbacks', loadComponent: () => import('./components/feedback-list/feedback-list.component').then(m => m.FeedbackListComponent), canActivate: [AuthGuard] },
  { path: 'analyses', loadComponent: () => import('./components/analyse-ia-list/analyse-ia-list.component').then(m => m.AnalyseIaListComponent), canActivate: [AuthGuard] },
  { path: 'tickets', loadComponent: () => import('./components/ticket-list/ticket-list.component').then(m => m.TicketListComponent), canActivate: [AuthGuard] },
  { path: 'backlogs', loadComponent: () => import('./components/backlog-list/backlog-list.component').then(m => m.BacklogListComponent), canActivate: [AuthGuard] },
  { path: 'sprints', loadComponent: () => import('./components/sprint-list/sprint-list.component').then(m => m.SprintListComponent), canActivate: [AuthGuard] },
  
  // Route pour les pages non trouvées - redirige vers login
  { path: '**', redirectTo: '/login' }
];
