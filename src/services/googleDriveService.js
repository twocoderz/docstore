import { google } from 'googleapis';
import serviceAccountKey from '../utils/serviceAccountKey.json';

// Configuration de l'authentification
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// Cache pour éviter les appels API répétés
const fileCache = new Map();

/**
 * Récupère les informations d'un fichier Google Drive
 * @param {string} fileId - ID du fichier Google Drive
 * @returns {Promise<Object>} - Informations du fichier
 */
export const getFileInfo = async (fileId) => {
  try {
    // Vérifier le cache d'abord
    if (fileCache.has(fileId)) {
      return fileCache.get(fileId);
    }

    const response = await drive.files.get({
      fileId: fileId,
      fields: 'id,name,mimeType,size,modifiedTime'
    });

    const fileInfo = {
      id: response.data.id,
      name: response.data.name,
      mimeType: response.data.mimeType,
      size: response.data.size,
      modifiedTime: response.data.modifiedTime
    };

    // Mettre en cache pour 1 heure
    fileCache.set(fileId, fileInfo);
    setTimeout(() => fileCache.delete(fileId), 60 * 60 * 1000);

    return fileInfo;
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier Google Drive:', error);
    return {
      id: fileId,
      name: `Document_${fileId.substring(0, 8)}`,
      mimeType: 'application/pdf',
      size: null,
      modifiedTime: null
    };
  }
};

/**
 * Extrait l'ID du fichier depuis un lien Google Drive
 * @param {string} driveUrl - Lien Google Drive
 * @returns {string|null} - ID du fichier ou null
 */
export const extractFileId = (driveUrl) => {
  try {
    const url = new URL(driveUrl);
    const pathParts = url.pathname.split('/');
    const dIndex = pathParts.indexOf('d');
    
    if (dIndex !== -1 && dIndex + 1 < pathParts.length) {
      return pathParts[dIndex + 1];
    }
    
    return null;
  } catch {
    return null;
  }
};

/**
 * Récupère le nom réel d'un fichier Google Drive
 * @param {string} driveUrl - Lien Google Drive
 * @returns {Promise<string>} - Nom du fichier
 */
export const getRealFileName = async (driveUrl) => {
  const fileId = extractFileId(driveUrl);
  
  if (!fileId) {
    return 'Document Google Drive';
  }

  try {
    const fileInfo = await getFileInfo(fileId);
    return fileInfo.name;
  } catch (error) {
    return `Document_${fileId.substring(0, 8)}`;
  }
}; 