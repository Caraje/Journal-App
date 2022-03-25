import { types } from '../../types/types'
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui'


describe( 'pruebas en ui-actions', () => {
	test( 'Todas las acciones deben de funcionar', () => {
        
		const action = setError( 'Help' )
		expect( action ).toEqual( {
			type: types.uiSetError,
			payload: 'Help'
		} )

		const removeErrorAction = removeError()
		expect( removeErrorAction ).toEqual( {
			type: types.uiRemoveError
		} )

		const startLoadingAction = startLoading()
		expect( startLoadingAction ).toEqual( {
			type: types.uiStartLoading
		} )

		const finsihLoadingAction = finishLoading()
		expect( finsihLoadingAction ).toEqual( {
			type: types.uiFinsihLoading
		} )
	} )
} )