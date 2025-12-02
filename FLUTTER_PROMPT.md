# DocStore - Application Mobile Flutter

## 📱 Vision du Projet

Créer une application mobile Flutter qui est une adaptation complète de l'application web "DocStore" - une bibliothèque numérique pour explorer les ressources académiques de l'École Polytechnique de Louvain (EPL).

L'application doit permettre aux utilisateurs de :
- Consulter les écoles et leurs filières
- Explorer les cours par parcours, filière et semestre
- Accéder aux ressources (cours, exercices, TD, TP)
- Consulter les concours d'entrée
- Utiliser une barre de recherche pour filtrer les ressources

## 🎨 Palette de Couleurs

Conserver l'identité visuelle de l'application web :

| Élément | Couleur Principale | Couleur Secondaire |
|---------|-------------------|-------------------|
| **Écoles** | Bleu (#3b82f6) | Indigo (#4f46e5) |
| **Concours** | Orange (#f97316) | Jaune (#eab308) |
| **Fond** | Gris très clair (#f8fafc) | Slate (#f1f5f9) |
| **Texte primaire** | Gris foncé (#1f2937) | Gris (#374151) |
| **Accents** | Vert (#22c55e) pour succès | Rouge (#ef4444) pour erreurs |

**Gradients utilisés :**
- Écoles: `linear-gradient(135deg, #3b82f6, #4f46e5)`
- Concours: `linear-gradient(135deg, #f97316, #eab308)`
- Fond général: `linear-gradient(to br, #f8fafc, #f1f5f9)`

## 📊 Architecture de Données

### Structure Backend (Appwrite)
- **Écoles** : nom, description, lieu
- **Filières** : nom, parcours associé
- **Parcours** : nom, description
- **Années** : année académique
- **Semestres** : Harmattan, Mousson (semesters)
- **Cours/UE (Unités d'Enseignement)** : titre, description
- **Ressources** : type (Cours, Exercices, TD, TP, Communiqué), fichier PDF
- **Concours** : nom, description, année, école associée, communiqué PDF

### Modèles de Données Flutter
```dart
class Ecole {
  final String id;
  final String nom;
  final String description;
  final String lieu;
}

class Filiere {
  final String id;
  final String nom;
  final String parcoursId;
}

class Parcours {
  final String id;
  final String nom;
}

class Cours {
  final String id;
  final String titre;
  final String description;
  final String semesteId;
  final List<Ressource> ressources;
}

class Ressource {
  final String id;
  final String type; // "Cours", "Exercices", "TD", "TP", "Communiqué"
  final String url;
  final String nomFichier;
}

class Concours {
  final String id;
  final String nom;
  final String description;
  final int annee;
  final String idEcole;
  final String? communiquePdf;
}
```

## 🏗️ Structure de l'Application

### Dossiers principaux
```
lib/
├── main.dart
├── config/
│   ├── theme/
│   │   ├── app_colors.dart
│   │   ├── app_text_styles.dart
│   │   └── app_theme.dart
│   ├── constants/
│   │   └── app_constants.dart
│   └── routes/
│       └── app_routes.dart
├── data/
│   ├── models/
│   │   ├── ecole.dart
│   │   ├── filiere.dart
│   │   ├── cours.dart
│   │   ├── ressource.dart
│   │   ├── concours.dart
│   │   └── parcours.dart
│   ├── repositories/
│   │   ├── ecole_repository.dart
│   │   ├── filiere_repository.dart
│   │   ├── cours_repository.dart
│   │   ├── concours_repository.dart
│   │   └── base_repository.dart
│   └── services/
│       ├── appwrite_service.dart
│       ├── download_service.dart
│       └── storage_service.dart
├── presentation/
│   ├── bloc/
│   │   ├── ecole/
│   │   ├── filiere/
│   │   ├── cours/
│   │   ├── concours/
│   │   └── search/
│   ├── pages/
│   │   ├── home/
│   │   ├── ecoles_list/
│   │   ├── filiere_detail/
│   │   ├── cours_detail/
│   │   ├── concours_list/
│   │   ├── concours_detail/
│   │   └── search/
│   └── widgets/
│       ├── common/
│       ├── cards/
│       ├── filters/
│       └── navigation/
└── utils/
    ├── logger.dart
    ├── validators.dart
    └── extensions.dart
```

## 📄 Pages Principales

### 1. **HomePage (Navigation)**
- **Description** : Accueil avec navigation par onglets
- **Onglets** :
  - Écoles (Tab 1)
  - Concours (Tab 2)
  - Recherche (Tab 3)
- **Design** : Bottom navigation bar avec icônes (librairie, trophée, loupe)
- **Couleurs** : Bleu pour écoles, Orange pour concours
- **Animations** : Transitions fluides entre onglets

### 2. **EcolesListPage**
- **Description** : Liste des écoles disponibles
- **Features** :
  - Grille ou liste des écoles (adaptive)
  - Chaque école affiche : nom, description courte, lieu
  - Chevron pour accéder aux détails
  - Icon école en haut à gauche
- **Design** : 
  - Cards avec gradient bleu en haut
  - Border radius de 16px
  - Ombre au survol
  - Texte tronqué sur 3 lignes
- **Chargement** : Spinner personnalisé avec animation
- **Erreur** : Message d'erreur stylisé avec alerte rouge

### 3. **FiliereDetailPage**
- **Description** : Détail d'une filière
- **Structure** :
  - Header avec nom de la filière
  - Parcours associé
  - Liste des années
  - Pour chaque année : toggle semesters (Harmattan, Mousson)
  - Liste des cours par semestre (collapsible)
- **Actions** :
  - Tap sur un cours → détail
  - Long press pour télécharger les ressources
- **Navigation** : Bouton retour (BackButton)

### 4. **CoursDetailPage**
- **Description** : Détail d'un cours/UE
- **Affiche** :
  - Titre du cours
  - Description
  - Type d'UE (optionnel)
  - Liste des ressources (Cours, Exercices, TD, TP)
  - Chaque ressource : type d'icône, nom, bouton télécharger
- **Design** :
  - Cards colorées par type de ressource
  - Bouton télécharger avec icône PDF
  - Gestion du téléchargement avec progressbar
- **Actions** :
  - Télécharger les ressources
  - Voir le PDF (in-app viewer ou délégué au navigateur)

### 5. **ConcoursListPage**
- **Description** : Liste des concours
- **Features** :
  - Grille des concours (responsive)
  - Chaque concours : nom, description courte, année, école
  - Indicateur "Communiqué disponible" (icône PDF)
- **Filtres** (en haut) :
  - Filter par année (dropdown)
  - Filter par école (dropdown)
  - Bouton reset
- **Design** :
  - Cards avec gradient orange/jaune
  - Même structure que EcolesListPage
- **Chargement/Erreur** : Même UX que EcolesListPage

### 6. **ConcoursDetailPage**
- **Description** : Détail d'un concours
- **Affiche** :
  - Titre du concours
  - Description complète
  - Année
  - École
  - Communiqué (si disponible) avec bouton télécharger
  - Date si disponible
- **Actions** :
  - Télécharger le communiqué
  - Partager le concours (share intent)
  - Retour à la liste

### 7. **SearchPage**
- **Description** : Recherche multisource
- **Features** :
  - SearchBar avec icône de loupe
  - Historique de recherches (jusqu'à 10)
  - Résultats groupés par catégorie :
    - Écoles
    - Filières
    - Cours
    - Concours
  - Chaque résultat cliquable mène au détail
- **Optimisations** :
  - Debounce de 500ms
  - Minimum 2 caractères pour chercher
  - Case-insensitive

## 🎯 Composants Réutilisables

### Cards
- **EcoleCard** : Affiche une école (gradient bleu)
- **FiliereCard** : Affiche une filière (simple, compacte)
- **CoursCard** : Affiche un cours (pour listes)
- **ConcoursCard** : Affiche un concours (gradient orange)
- **RessourceCard** : Affiche une ressource (icône type + nom + action)

### Filtres
- **YearFilterButton** : Dropdown pour années
- **EcoleFilterButton** : Dropdown pour écoles
- **SearchBar** : Barre de recherche custom

### Widgets
- **BackButton** : Bouton retour stylisé
- **LoadingSpinner** : Loader personnalisé avec animation
- **ErrorWidget** : Affichage d'erreur cohérent
- **EmptyStateWidget** : Affichage "aucun résultat"
- **AppNavBar** : Bottom navigation

## 🔧 Intégrations Techniques

### Services Requis
1. **Appwrite** :
   - Intégration client Flutter
   - Requêtes CRUD pour tous les modèles
   - Gestion des erreurs
   - Authentification optionnelle (si nécessaire)

2. **Téléchargement de fichiers** :
   - Package `dio` pour les téléchargements
   - Stockage dans `getApplicationDocumentsDirectory()`
   - Gestion des permissions (Android: REQUEST_WRITE_EXTERNAL_STORAGE)
   - Affichage de la progressbar pendant le téléchargement

3. **Visualisation PDF** :
   - Package `pdf_viewer_plugin` ou `syncfusion_flutter_pdfviewer`
   - Ouvrir les PDFs téléchargés en interne
   - Option ouvrir via navigateur externe

4. **Cache** :
   - Mettre en cache les listes (Écoles, Concours)
   - Invalidation du cache avec timeout de 24h
   - Cache des PDFs téléchargés

### Packages Flutter Recommandés
```yaml
dependencies:
  flutter:
    sdk: flutter
  # Architecture & State Management
  flutter_bloc: ^9.0.0
  equatable: ^2.0.5
  # Networking
  appwrite: ^11.0.0
  dio: ^5.3.1
  # PDF & Fichiers
  syncfusion_flutter_pdfviewer: ^22.2.0
  path_provider: ^2.1.1
  permission_handler: ^11.4.0
  # UI
  flutter_spinkit: ^5.2.0
  intl: ^0.18.1
  # Utilities
  connectivity_plus: ^5.0.0
  logger: ^2.0.1
```

## ✨ Features Optionnelles (Nice to Have)

1. **Offline Mode** : Synchroniser les données quand en ligne
2. **Favoris** : Marquer écoles/cours/concours comme favoris
3. **Notifications** : Notifier des nouveaux concours
4. **Thème Sombre** : Mode dark (adapter les gradients)
5. **Partage** : Partager des ressources via messaging/email
6. **Historique** : Garder l'historique des consultations
7. **Statistiques** : Nombre de ressources par école/filière

## 📐 Design Guidelines

### Espacements
- Padding global pages: 16px
- Gap entre cards: 12-16px
- Padding cards: 16px
- Border radius : 16px (standard), 12px (petits éléments), 20px (large headers)

### Typographie
- **Headline 1** : 28sp, bold (titres pages)
- **Headline 2** : 24sp, bold (sous-titres)
- **Body Large** : 16sp, regular (texte principal)
- **Body Medium** : 14sp, regular (descriptions)
- **Label Small** : 12sp, medium (tags, labels)

### Animations
- Durée standard : 300ms
- Courbe d'animation : `Curves.easeInOutCubic`
- Transition pages : `PageTransition` fluide
- Chevrons/icônes : Animation au tap (scale 0.95)

### Responsive
- **Mobile** : < 600dp (affichage simple)
- **Tablet** : >= 600dp (layouts multi-colonnes)
- Grille : 1 colonne mobile, 2 colonnes tablet, 3 colonnes desktop (si applicable)

## 🚀 Points d'Attention

1. **Performance** :
   - Pagination pour les longues listes
   - Lazy loading des images/ressources
   - Avoid rebuilds inutiles avec BLoC

2. **Sécurité** :
   - Stocker les tokens Appwrite de manière sécurisée
   - Valider les URLs avant téléchargement

3. **UX** :
   - Toujours un feedback utilisateur (loading, toast, erreurs)
   - Debounce les recherches
   - Confirmation avant action destructive

4. **Accessibilité** :
   - SemanticLabels sur tous les boutons
   - Contraste texte-fond ≥ 4.5:1
   - Support des GestureDetector pour lecteurs d'écran

## 📊 Maquette Figma

Votre maquette Figma doit guider les layouts spécifiques.
Assurez-vous que :
- Les couleurs correspondent à la palette ci-dessus
- Les espacements sont respectés
- Les états (hover, active, disabled) sont clairs
- Les transisions/animations sont documentées

## ✅ Checklist de Déploiement

- [ ] Tests unitaires pour les repositories
- [ ] Tests d'intégration pour les BLoCs
- [ ] Tests UI pour les pages principales
- [ ] Build APK/AAB pour Android
- [ ] Build IPA pour iOS
- [ ] Configuration Firebase Analytics (optionnel)
- [ ] Documentation API Appwrite mise à jour
- [ ] Guide d'installation pour développeurs
