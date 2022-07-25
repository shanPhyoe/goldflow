import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBj3wowghd7-Eyw1zhTGBtLIeeZMde4PBE',
    authDomain: 'goldflow-43782.firebaseapp.com',
    projectId: 'goldflow-43782',
    storageBucket: 'goldflow-43782.appspot.com',
    messagingSenderId: '801351775510',
    appId: '1:801351775510:web:089aa9a1fc3b399d72cc37',
};

const firebase = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();

export const googleSigninPopup = async () => {
    try {
        const { user } = await signInWithPopup(auth, provider);

        return user;
    } catch (err) {
        if (err.message === 'Firebase: Error (auth/popup-closed-by-user).')
            return null;

        return err.message;
    }
};

export default firebase;
