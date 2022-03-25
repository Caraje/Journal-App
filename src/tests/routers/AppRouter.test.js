import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { Approuter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/firebase-config'
import Swal from 'sweetalert2'


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))
jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}))



const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )
const initState = {
    auth: {},
    ui: {
        loading: false, 
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
}
let store = mockStore( initState )
store.dispatch = jest.fn()



describe('pruebas en AppRouters.js', () => {
    let user
    test('debe llamar al login si estoy autenticado', async() => {
        await act( async()=> {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456')
            user = userCred.user
            
            const wrapper = mount( 
                <Provider store = { store }>
                    <MemoryRouter>
                        <Approuter /> 
                    </MemoryRouter>
                </Provider>
            )
        })

        expect( login ).toHaveBeenCalledWith("UeB8uywTVdhcF6IYu3aO4Czml7k2", null)
    });
});