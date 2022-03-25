import { mount } from 'enzyme';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';


import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))
jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))


const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )
const initState = {
    auth: {
        uid: '1',
        name: 'Carlos'
    },
    ui: {
        loading: false, 
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
}
let store = mockStore( initState )
store.dispatch = jest.fn()


const wrapper = mount(
    <Provider store = { store }>
        <Sidebar />
    </Provider>
) 
describe('pruebas en Sidebar', () => {
    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot()
    });

    test('debe llamar al logout', () => {
        wrapper.find('button').prop('onClick')()
        expect( startLogout ).toHaveBeenCalled()
    });


    test('debe llamar a startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')()
        expect( startNewNote ).toHaveBeenCalled()
    });
});