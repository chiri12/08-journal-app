
  
import { useState } from 'react';
///Custom hooks para manejar formularios

export const useForm = ( initialState = { } ) => {
   
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues( newFormState );
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

return [ values, handleInputChange , reset]; 

};