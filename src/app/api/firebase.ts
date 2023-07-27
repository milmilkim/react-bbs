import config from '../../../firebase.config';
import * as admin from 'firebase-admin';
import serviceAccount from '../../../service_account.json';
import { ServiceAccount } from 'firebase-admin';

const firebaseConfig = {
  databaseURL: config.databaseUrl,
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
};



const app = admin.initializeApp(firebaseConfig, 'firebaseAdmin');
const auth = admin.auth(app);

export { auth };
