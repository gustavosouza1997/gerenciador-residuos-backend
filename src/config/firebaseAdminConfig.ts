import admin from 'firebase-admin';

// Carregar as credenciais da conta de serviço (arquivo JSON baixado do Firebase Console)
const serviceAccount = require("../../gerenciadorderesiduos-firebase-adminsdk-d1iah-65372103e4");

// Inicializar o Firebase Admin com as credenciais
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;