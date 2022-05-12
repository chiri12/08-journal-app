
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"

import { db } from "../firebase/firebase-config"



export const loadNotes = async (uid) => {


  const p = query(collection(db,`${ uid }/journal/notes`),orderBy('date','desc'),limit(25));//este me lo ordena
  const v= await getDocs(p);

    const notes= [];

    (await v).forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
        
    });
        
    return notes;

}
