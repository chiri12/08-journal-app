import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import {  app, googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';



export const startLoginEmailPassword = ( email,password) => {

   return (dispatch) => {
       dispatch(startLoading());
       signInWithEmailAndPassword(getAuth(app),email,password)
          .then(( {user }) => {
              dispatch(finishLoading());
              dispatch(login(user.uid, user.displayName))
          })
          .catch( e => {
            //console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message,'error');
        })
       
    }
    
}

export const startRegisterWhithEmailPasswordName = (email,password,name) => {
    return (dispatch) => {
      createUserWithEmailAndPassword(getAuth(app), email,password)
        .then( async({ user }) => {
            
          await updateProfile(user,{displayName: name});
           
           dispatch(
                login(user.uid, user.displayName)
            )
        })
        .catch( e => {
            console.log(e);
            Swal.fire('Error', e.message,'error');
        })
    }

}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        signInWithPopup(getAuth(app),googleAuthProvider)
          .then(({ user }) => {
              dispatch(
                  login(user.uid, user.displayName)
              )
          });
        
    }
}

export const login =(uid, displayName ) => ({

        type: types.login,
        payload: {
            uid,
            displayName
        }    
});

export const startLogout = () => {
    return async ( dispatch ) => {
      await  signOut( getAuth(app));

       dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})