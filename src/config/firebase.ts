import * as admin from 'firebase-admin';

const serviceAccount = require('path/to/serviceAccountKey.json'); // Update the path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com' // Update with your project ID
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };