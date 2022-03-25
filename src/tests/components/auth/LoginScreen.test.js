import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLogionEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLogionEmailPassword: jest.fn()
}))



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
store.dispatch = jest.fn()

const wrapper = mount( 
    <Provider store = { store }>
        <MemoryRouter>
            <LoginScreen/> 
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en el componente LoginScreen', () => {
    
    beforeEach( () => {
		store = mockStore( initState )
        jest.clearAllMocks()
    })
    
    test('debe mostrar correctamente el componente', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('debe llamar la accion startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')()
        expect( startGoogleLogin ).toHaveBeenCalled()
    });

    test('debe disparar la accion startLogionEmailPassword', () => {
        const email= ''
        const password= ''

        wrapper.find('form').prop( 'onSubmit' )({
            preventDefault(){}
        }
        )

        expect( startLogionEmailPassword ).toHaveBeenCalledWith( email, password )

        
    });
});