import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss']
})
export class UtilisateurFormComponent implements OnInit {
  utilisateurForm: FormGroup;
  isEditMode = false;
  utilisateurId: number | null = null;
  
  roles: string[] = ['ADMIN', 'CLIENT', 'DEV'   ,'PO','SCRUM'];

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.utilisateurId = +id;
      this.loadUtilisateur(this.utilisateurId);
    }
  }

  loadUtilisateur(id: number): void {
    this.utilisateurService.getUtilisateurById(id).subscribe({
      next: (utilisateur) => {
        // Supprimez le champ motDePasse pour l'édition
        this.utilisateurForm.patchValue({
          nom: utilisateur.nom,
          prenom: utilisateur.prenom,
          email: utilisateur.email,
          role: utilisateur.role
        });
        
        // Rendre le champ motDePasse optionnel en mode édition
        const motDePasseControl = this.utilisateurForm.get('motDePasse');
        if (motDePasseControl) {
          motDePasseControl.clearValidators();
          motDePasseControl.updateValueAndValidity();
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur', error);
      }
    });
  }

  
  onSubmit(): void {
    console.log('Formulaire soumis');
    console.log('Formulaire valide:', this.utilisateurForm.valid);
    console.log('Valeurs du formulaire:', this.utilisateurForm.value);
    
    if (this.utilisateurForm.invalid) {
      console.log('Formulaire invalide, erreurs:', this.utilisateurForm.errors);
      return;
    }
  
    const utilisateur: Utilisateur = this.utilisateurForm.value;
    console.log('Utilisateur à créer:', utilisateur);
    
    if (this.isEditMode && this.utilisateurId) {
      // Code pour la mise à jour...
    } else {
      this.utilisateurService.createUtilisateur(utilisateur).subscribe({
        next: (response) => {
          console.log('Utilisateur créé avec succès:', response);
          this.router.navigate(['/utilisateurs']);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
        }
      });
    }
  }
  
}
