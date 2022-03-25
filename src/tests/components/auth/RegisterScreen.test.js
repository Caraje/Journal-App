import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';

import { types } from '../../../types/types';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';

const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )
const initState = {
    auth: {},
    ui: {
        loading: false, 
        msgError: null
    }
}
let store = mockStore( initState )
// store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store = { store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
)
describe('Pruebas en el componente RegisterScreen', () => {
    // beforeEach( () => {
	// 	store = mockStore( initState )
    //     jest.clearAllMocks()
    // })
    test('debe mostrar correctamente el componente', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('debe hjacer dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        })
    });

    test('debe mostrar la caja de alerta del error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false, 
                msgError: 'Email no es correcto'
            }
        }
        const store = mockStore( initState )
        const wrapper = mount(
            <Provider store = { store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        expect( wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect( wrapper.find('.auth__alert-error').text().trim()).toBe('Email no es correcto')
    });
});