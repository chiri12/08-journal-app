//import { collection, doc, setDoc } from "firebase/firestore";

import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db} from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

//react-journal

export const startNewNote = () => {
    return async ( dispacth, getState ) => {

        const { uid } = getState().auth; 

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()

        } 
           
       // await setDoc(doc(db,`${uid}/journal/notes`,`${notas()}` ),newNote);

       await setDoc(doc( collection(db,`${ uid }/journal/notes`)),newNote);//adiciona una nueva nota

        const  docu =  getDocs(await collection(db,`${ uid }/journal/notes`));   //me da las nota       

       // dispacth( activeNote(`${notas()}`,newNote ) ); //mi variante para el id , ya resolvi mejor

       dispacth( activeNote( docu.id ,newNote ) ); 

              
    }
}

/*export const notas = () =>{ // variante mia para poder darel un id a la nota, ya resolvi el problema

    return new Date().getTime();

}*/

export const  activeNote = ( id , note ) => ({
     type: types.notesActive,
     payload: {
         id,
         ...note
     }
});

export const startLoadingNotes = (uid) => {
    return async ( dispacth ) => {
        
        const notes = await loadNotes( uid );
        dispacth( setNotes( notes ) );
    }
}


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes

})

export const startSaveNote = ( note ) => {
    return async ( dispacth, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
            
        }

        const noteToFirestore = { ...note};
        delete noteToFirestore.id;

        //await doc(db,`${uid}/journal/notes/${note.id}`,noteToFirestore ); //actualiza la nota
        const refDoc= doc(db,`${uid}/journal/notes/${note.id}`);
        updateDoc(refDoc,noteToFirestore);

        dispacth( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved',note.title,'success');
    }
}


export const refreshNote = (id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        note: {
            id,
            ...note 
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title:'Uploading.....',
            text:'Please wait.....',
            allowOutsideClick: false,                      

        });

       const fileUrl = await fileUpload( file );
       activeNote.url =fileUrl;

       dispatch( startSaveNote( activeNote ) );
       
      Swal.close();     
        
    }
}   

//borar del firebase
export const startDeleting = (id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        const {current} = id; //tuve que desestructurar el id porque salia como objeto
              
       const refDoc =  doc(db,`${uid}/journal/notes/${current}`);
      // deleteDoc(doc(db,`${uid}/journal/notes/${id}`))   //asi no lo hace porque el id sale como objeto
              
        deleteDoc(refDoc);//elimina del firestore

         dispatch( deleteNote(current) );//al hacer el dispacth lo borra del navegador 
         
    
    }
}
//borrar del navegador, ir al reducer e implementarlo
export const deleteNote = (id) => ({
    
    type: types.notesDelete,
    payload: id
})

 

