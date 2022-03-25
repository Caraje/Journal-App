import { mount } from 'enzyme';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
            id: 'ABC',
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
}
let store = mockStore( initState )
store.dispatch = jest.fn()


const wrapper = mount(
    <Provider store = { store }>
        <NoteScreen />
    </Provider>
) 

describe('Pruebas en NotesScreen', () => {
    
    test('debe mostrar correctamente el componente', () => {
        expect( wrapper ).toMatchSnapshot()
    });

    test('debe disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title', 
                value: 'Hola de nuevo'
            }
        })

        expect( activeNote ).toHaveBeenLastCalledWith(
            'ABC',
            {
                body: 'Mundo',
                title: 'Hola de nuevo',
                id: 'ABC',
                date: 0
            }
        )
    });
});