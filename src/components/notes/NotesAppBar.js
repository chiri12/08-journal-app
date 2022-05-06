import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  startSaveNote, startUploading } from '../../actions/notes'


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


  return (
    <div className='notes__appbar'>
        <span>18 de abril 2022 </span>

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
