import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { login } from '../actions/auth';
import {  startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { app } from '../firebase/firebase-config';
//import { loadNotes } from '../helpers/loadNotes';
import { AuthRouter } from './AuthRouter';

//import { PrivateRoute } from './PrivateRoute';
//import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

const dispatch = useDispatch();

const [ checking, setChecking ] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    onAuthStateChanged( getAuth(app), async (user) => {
      
      if( user?.uid ){          //si existe el usuario por uid        
        dispatch( login(user.uid,user.displayName));
        setIsLoggedIn(true);
       
       //const notas = await loadNotes(user.uid);
       //
       dispatch( startLoadingNotes( user.uid ) );

      }
      else{
        setIsLoggedIn(false);
      }
    
      setChecking(false);

    });

  }, [dispatch, setChecking, setIsLoggedIn])


  if (checking) {
    return(
      <h1>Espere.....</h1>
    )
  }
  

  return (
      <Router>
        <div>
           <Routes>
           {
             !isLoggedIn &&
                < Route  path="*" element={<AuthRouter />} 
                  />            
           }

           {
             isLoggedIn &&
             <Route  path="/" element ={<JournalScreen />}
             
             /> 

           }     
            
          </Routes>
          
         
         
        </div>
    </Router>
  )
}
