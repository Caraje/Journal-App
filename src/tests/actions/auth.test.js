import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { login, logout, startLogionEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";


const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )
const initState = {}
let store = mockStore( initState )

describe('pruebas en las acciones de Auth', () => {
    beforeEach( () => {
		store = mockStore( initState )
    })
    
    test('login y logout debe de cerar la accion respectiva', () => {

        const uid=  '123-4567-890'
        const displayName = 'Carlos'
        const loginAction = login( uid, displayName )
        expect( loginAction ).toEqual(    {
            type: types.login,
            payload: { uid, displayName }
        })

        const logoutAction = logout()
        expect( logoutAction ).toEqual({ type: types.logout })
    });

    test('debe realizar el startLogout', async() => {
        await store.dispatch( startLogout() )
        const actions = store.getActions()
        // console.log(actions)

        expect( actions[0] ).toEqual({
            type: types.logout
        })
        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        })

    });

    test('debe iniciar el startLogionEmailPassword', async() => {
        await store.dispatch( startLogionEmailPassword('test@testing.com', '123456') )
        const actions  = store.getActions()
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'UeB8uywTVdhcF6IYu3aO4Czml7k2', 
                displayName: null
            }
        })
    });
});