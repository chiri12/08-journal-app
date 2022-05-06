
import { collection, getDocs } from "firebase/firestore"

import { db } from "../firebase/firebase-config"



export const loadNotes = async (uid) => {

   //const notesSnap =  await collection(db,`${ uid }/journal/notes`);
   const  notesSnap=  getDocs(await collection(db,`${ uid }/journal/notes`));
    const notes= [];

    (await notesSnap).forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
        
    });
        
    return notes;

}
