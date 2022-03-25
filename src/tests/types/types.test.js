import { types } from "../../types/types";


describe('Pruebas en types.js', () => {

    test('debe tener estos types', () => {
        
        const typesRequired = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
            
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start loading',
            uiFinsihLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set Active note',
            notesLoad: '[Notes] Load note',
            notesUpdated: '[Notes] Updated note saved ',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[notes] Delete note',
            notesLogoutCleaning: '[notes] Logout Cleaning'
        }

        expect( types ).toEqual( typesRequired )
    });
});