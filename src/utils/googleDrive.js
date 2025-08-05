// Utilitaires pour Google Drive

/**
 * Convertit un lien Google Drive en lien de téléchargement
 * @param {string} driveUrl - Lien Google Drive original
 * @returns {string} - Lien de téléchargement
 */
export const getGoogleDriveDownloadUrl = (driveUrl) => {
  // Extraire l'ID du fichier Google Drive
  const fileId = driveUrl.match(/[-\w]{25,}/);
  if (!fileId) return driveUrl;
  
  // Retourner le lien de téléchargement direct
  return `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
};

/**
 * Convertit un lien Google Drive en lien de prévisualisation
 * @param {string} driveUrl - Lien Google Drive original
 * @returns {string} - Lien de prévisualisation
 */
export const getGoogleDrivePreviewUrl = (driveUrl) => {
  // Extraire l'ID du fichier Google Drive
  const fileId = driveUrl.match(/[-\w]{25,}/);
  if (!fileId) return driveUrl;
  
  // Retourner le lien de prévisualisation
  return `https://drive.google.com/file/d/${fileId[0]}/preview`;
};

/**
 * Détecte si un lien est un lien Google Drive
 * @param {string} url - URL à vérifier
 * @returns {boolean} - True si c'est un lien Google Drive
 */
export const isGoogleDriveUrl = (url) => {
  return url && (url.includes('drive.google.com') || url.includes('docs.google.com'));
};

/**
 * Extrait le nom du fichier depuis un lien Google Drive
 * @param {string} driveUrl - Lien Google Drive
 * @returns {string} - Nom du fichier
 */
export const getGoogleDriveFileName = (driveUrl) => {
  try {
    const url = new URL(driveUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return fileName || 'Document Google Drive';
  } catch {
    return 'Document Google Drive';
  }
}; 