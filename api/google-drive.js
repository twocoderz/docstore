import { google } from 'googleapis';

// Configuration de l'authentification
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
  },
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
const getFileInfo = async (fileId) => {
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
const extractFileId = (driveUrl) => {
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

export default async function handler(req, res) {
  // Activer CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const fileId = extractFileId(url);
    
    if (!fileId) {
      return res.status(400).json({ 
        error: 'Invalid Google Drive URL',
        name: 'Document Google Drive'
      });
    }

    const fileInfo = await getFileInfo(fileId);
    
    res.status(200).json({
      success: true,
      fileInfo
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
} 