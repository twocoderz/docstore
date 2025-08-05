// Cache pour éviter les appels API répétés
const fileCache = new Map();

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
 * Récupère les informations d'un fichier Google Drive via l'API
 * @param {string} fileId - ID du fichier Google Drive
 * @returns {Promise<Object>} - Informations du fichier
 */
export const getFileInfo = async (fileId) => {
  try {
    // Vérifier le cache d'abord
    if (fileCache.has(fileId)) {
      return fileCache.get(fileId);
    }

    // Construire l'URL de l'API
    const apiUrl = `${window.location.origin}/api/google-drive?url=https://drive.google.com/file/d/${fileId}/view`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    const fileInfo = data.fileInfo;

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