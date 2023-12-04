import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { firebaseConfig as env } from './env'

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId
}

// Initialize Firebase and its services
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

// event logger
const logger = (
  eventName: string,
  eventParams?: {
    [key: string]: any
  }
) => {
  logEvent(analytics, eventName, eventParams)
}

export { app, analytics, firestore, storage, auth, logger }
