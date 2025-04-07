# Documentation - Implémentation de la page de login avec vérification du rôle ADMIN

## Introduction

Cette documentation détaille l'implémentation d'une page de login dans l'application Angular "Feedback Analysis". La fonctionnalité permet uniquement aux utilisateurs ayant le rôle "ADMIN" de se connecter à l'application.

## Fonctionnalités implémentées

1. **Page de login** - Une interface utilisateur complète pour la saisie des identifiants
2. **Service d'authentification** - Gestion de la connexion et vérification des rôles
3. **Garde de route** - Protection des pages contre les accès non autorisés
4. **Intégration au flux de navigation** - Redirection automatique vers la page de login

## Structure des fichiers créés

```
src/app/
├── components/
│   └── login/
│       ├── login.component.html    # Interface utilisateur du formulaire de login
│       ├── login.component.scss    # Styles CSS pour la page de login
│       └── login.component.ts      # Logique du composant de login
├── services/
│   └── auth.service.ts             # Service d'authentification
├── guards/
│   └── auth.guard.ts               # Garde de route pour protéger les pages
└── app.routes.ts                   # Routes mises à jour avec protection
```

## Détails techniques

### 1. Composant de login

Le composant de login (`login.component.ts`) gère :
- La validation du formulaire (email et mot de passe requis)
- L'appel au service d'authentification
- La vérification du rôle ADMIN
- L'affichage des messages d'erreur appropriés

### 2. Service d'authentification

Le service d'authentification (`auth.service.ts`) fournit :
- Une méthode `login()` pour authentifier l'utilisateur
- Une méthode `isAdmin()` pour vérifier si l'utilisateur a le rôle ADMIN
- Des méthodes utilitaires pour gérer l'état d'authentification

### 3. Garde de route

Le garde de route (`auth.guard.ts`) :
- Vérifie si l'utilisateur est authentifié
- Vérifie si l'utilisateur a le rôle ADMIN
- Redirige vers la page de login si nécessaire

### 4. Configuration des routes

Les routes de l'application ont été mises à jour pour :
- Ajouter la route `/login` accessible sans authentification
- Protéger toutes les autres routes avec le garde d'authentification
- Rediriger vers la page de login en cas d'accès non autorisé

## Flux d'authentification

1. L'utilisateur accède à l'application
2. S'il n'est pas authentifié, il est redirigé vers la page de login
3. L'utilisateur saisit son email et son mot de passe
4. Le service d'authentification vérifie les identifiants auprès du backend
5. Si l'authentification réussit, le service vérifie le rôle de l'utilisateur
6. Si l'utilisateur a le rôle ADMIN, il est redirigé vers la page d'accueil
7. Sinon, un message d'erreur "Accès refusé" s'affiche

## Configuration requise côté backend

Pour que cette fonctionnalité fonctionne correctement, le backend doit :

1. Fournir un endpoint d'authentification à l'URL : `http://localhost:8088/api/auth/login`
2. Accepter une requête POST avec un corps JSON contenant `email` et `password`
3. Retourner une réponse JSON avec :
   ```json
   {
     "token": "jwt_token_here",
     "role": "ADMIN"  // ou autre rôle selon l'utilisateur
   }
   ```

## Tests et validation

Pour tester cette fonctionnalité :

1. Assurez-vous que le backend est configuré correctement
2. Lancez l'application Angular avec `ng serve`
3. Accédez à n'importe quelle URL de l'application
4. Vous serez automatiquement redirigé vers la page de login
5. Testez avec différents utilisateurs :
   - Un utilisateur avec le rôle ADMIN devrait pouvoir se connecter
   - Un utilisateur avec un autre rôle devrait voir un message d'accès refusé

## Conclusion

Cette implémentation assure que seuls les utilisateurs avec le rôle ADMIN peuvent accéder à l'application, conformément aux exigences spécifiées. Le système est extensible et peut être facilement modifié pour prendre en charge d'autres rôles ou des permissions plus granulaires si nécessaire à l'avenir.
