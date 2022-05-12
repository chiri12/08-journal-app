
import { types } from "../../types/types";

describe('Primera prueba en los types', () => { 

    const objetoTes = {

        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddnew: '[Notes] New note',
        notesActive: '[Notes] Set active note ',
        notesLoad: '[Notes] Load note',
        notesUpdate: '[Notes] Updated note',
        notesFileUrl: '[Notes] Update image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout cleaning',
    };

    test('Debe ser igual el objeto types', () => { 

        expect(types).toEqual(objetoTes);
        
     })
 })