import app from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBjbZT98smrWQU8Q2eL903frNs3pfwjbUo',
  authDomain: 'my-games-452c1.firebaseapp.com',
  databaseURL: 'https://my-games-452c1.firebaseio.com',
  projectId: 'my-games-452c1',
  storageBucket: 'my-games-452c1.appspot.com',
  messagingSenderId: '457932337069',
  appId: '1:457932337069:web:183e2e2de339066dce7b24',
  measurementId: 'G-8XYX6ZSTBV'
}

app.initializeApp(firebaseConfig)
const db = app.firestore()
// const auth = app.auth();
// export { db, auth };
// firebase.analytics(); // ?
export { db }
