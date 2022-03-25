import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const { REACT_APP_APIKEY, REACT_APP_AUTHDOMAIN, REACT_APP_DATABASEURL, REACT_APP_PROJECTID, REACT_APP_STORAGEBUCKET, 
	REACT_APP_MESSAGINGSENDERID, REACT_APP_APPID} = process.env

const firebaseConfig = {
	apiKey: REACT_APP_APIKEY,
	authDomain: REACT_APP_AUTHDOMAIN,
	databaseURL: REACT_APP_DATABASEURL,
	projectId: REACT_APP_PROJECTID,
	storageBucket: REACT_APP_STORAGEBUCKET,
	messagingSenderId: REACT_APP_MESSAGINGSENDERID,
	appId: REACT_APP_APPID,
}

firebase.initializeApp( firebaseConfig )

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export {
	db,
	googleAuthProvider,
	firebase
}