# Biblio EPL

Une application web pour explorer les ressources de l'École Polytechnique de Louvain.

## Configuration

### Variables d'environnement

Pour que l'API Google Drive fonctionne, vous devez configurer les variables d'environnement suivantes dans votre projet Vercel :

1. Allez dans votre dashboard Vercel.
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez les variables suivantes :

```
GOOGLE_PROJECT_ID=votre-project-id
GOOGLE_PRIVATE_KEY_ID=votre-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nvotre-clé-privée-ici\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=votre-service-account@votre-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=votre-client-id
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/votre-service-account%40votre-project.iam.gserviceaccount.com
```

### Configuration Google Service Account

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google Drive
4. Créez un compte de service :
   - Allez dans "IAM & Admin" > "Service Accounts"
   - Cliquez sur "Create Service Account"
   - Donnez un nom à votre compte de service
   - Cliquez sur "Create and Continue"
   - Pour les rôles, sélectionnez "Editor" (ou un rôle plus restrictif selon vos besoins)
   - Cliquez sur "Done"
5. Créez une clé pour le compte de service :
   - Cliquez sur votre compte de service
   - Allez dans l'onglet "Keys"
   - Cliquez sur "Add Key" > "Create new key"
   - Sélectionnez "JSON"
   - Téléchargez le fichier JSON
6. Utilisez les informations du fichier JSON pour configurer vos variables d'environnement.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```
