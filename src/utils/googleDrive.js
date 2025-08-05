import { getRealFileName, extractFileId } from '../services/googleDriveService';

// Utilitaires pour Google Drive

/**
 * Convertit un lien Google Drive en lien de téléchargement
 * @param {string} driveUrl - Lien Google Drive original
 * @returns {string} - Lien de téléchargement
 */
export const getGoogleDriveDownloadUrl = (driveUrl) => {
  const fileId = extractFileId(driveUrl);
  if (!fileId) return driveUrl;
  
  // Retourner le lien de téléchargement direct
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

/**
 * Convertit un lien Google Drive en lien de prévisualisation
 * @param {string} driveUrl - Lien Google Drive original
 * @returns {string} - Lien de prévisualisation
 */
export const getGoogleDrivePreviewUrl = (driveUrl) => {
  const fileId = extractFileId(driveUrl);
  if (!fileId) return driveUrl;
  
  // Retourner le lien de prévisualisation
  return `https://drive.google.com/file/d/${fileId}/preview`;
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
 * Récupère le nom du fichier depuis un lien Google Drive (avec API)
 * @param {string} driveUrl - Lien Google Drive
 * @returns {Promise<string>} - Nom du fichier
 */
export const getGoogleDriveFileName = async (driveUrl) => {
  try {
    return await getRealFileName(driveUrl);
  } catch (error) {
    console.error('Erreur lors de la récupération du nom de fichier:', error);
    const fileId = extractFileId(driveUrl);
    return fileId ? `Document_${fileId.substring(0, 8)}` : 'Document Google Drive';
  }
}; 