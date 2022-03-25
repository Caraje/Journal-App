import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";



describe('Pruebas en authReducer.js', () => {
    
    test('debe realizar el login', () => {
        const initState = {}
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Carlos'
            }
        }
        const state = authReducer( initState, action)
        expect( state ).toEqual({
            uid: 'abc',
            name: 'Carlos'
        })
    });


    test('Debe realizar el Logout', () => {
        const initState = {
            uid: '123-4567-890', 
            name: 'Carlos'}
        const action = {
            type: types.logout,

        }
        const state = authReducer( initState, action)
        expect( state ).toEqual({})
    });

    test('no debe hacer cambios en el state', () => {
        const initState = {
            uid: '123-4567-890', 
            name: 'Carlos'}
        const action = {
            type: types.noExists,

        }
        const state = authReducer( initState, action)
        expect( state ).toEqual(initState)
    });
});