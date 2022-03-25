import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
	const {notes: {active:note }} = useSelector( state => state )
	const [ formValues, handleInputChange, reset ] = useForm( note )
	const { body, title, id } = formValues

	const activeId = useRef( note.id )
	const dispatch = useDispatch()

	useEffect( () => {
		if( note.id !== activeId.current ) {
			reset( note )
			activeId.current = note.id
		}
	}, [ note, reset ] )

	useEffect( () => {
		dispatch( activeNote( formValues.id, {...formValues } ) )
	}, [ formValues, dispatch ] )
    
	const handleDelete = () => {

		dispatch( startDeleting( id ) )
	}

	return (
		<div className='notes__main-content'>
			<NotesAppBar />
			<div className='notes__content'>

				<input
					type='text'
					placeholder='Some Awesome title'
					className='notes__tite-input'
					name='title'
					autoComplete='off'
					value={ title}
					onChange={handleInputChange}
				/>

				<textarea
					placeholder='What hapened Today'
					className='note__textarea'
					name='body'
					autoComplete='off'
					value={ body}
					onChange={handleInputChange}
				>   

				</textarea>

				{
					( note.url ) &&
                            ( 
                            	<div className='note__image mt-5'>
                            		<img
                            			src={`${ note.url }`}
                            			alt='imagen'
                            		/>

                            	</div>
                            )
				}
                

			</div>

			<button
				className='btn btn-danger'
				onClick={ handleDelete }
			>
                Delete
			</button>
		</div>
	)
}
