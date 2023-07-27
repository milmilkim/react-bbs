import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import { getDatabase } from 'firebase/database';

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
export default app;
export { auth, database};


