import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';


export const NotesAppBar = () => {

   const dispacth = useDispatch();
   const { active } = useSelector( state => state.notes );

   const handleSave= () => {
     dispacth( startSaveNote( active ) );
  }

  const handlePictureClick = () => {
      document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
      //console.log(e.target.files[0]);
     const file = e.target.files[0];
      if( file ) {
          dispacth( startUploading( file ) );
     }
  }
  
    const { date } = active;  //para sacar cuando fue creada la nota
    const notedate = moment(date);
  

  

  return (
    <div className='notes__appbar'>
        <span> { notedate.format('MMMM Do YYYY') } </span>
            

        <input 
            id='fileSelector'
            type={'file'}
            name='file'
            style={{ display: 'none'}}
            onChange={ handleFileChange }
        
        />

        <div>
            <button 
                className='btn'
                onClick={ handlePictureClick }
            >
                Picture    
            </button>
            <button 
                className='btn'
                onClick={ handleSave }

            >
                Save    
            </button>
        </div>        
    </div>
  )
}
