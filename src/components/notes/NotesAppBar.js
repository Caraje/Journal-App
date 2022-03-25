import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'
import moment from 'moment'


export const NotesAppBar = () => {
	const dispatch = useDispatch()
	const {notes:{ active }} = useSelector( state => state )
	const noteDate = moment( active.date )

	const handleSave = () => {
		dispatch( startSaveNote( active ) )
	}

	const handlepictureClick = () => {

		document.querySelector( '#fileSelector' ).click()

	}

	const handleFileChange = ( e ) => {
		const file = e.target.files[0]

		if ( file ) {
			dispatch( startUploading( file ) )
		}
		// console.log(file)
	}


	return (
		<div className='notes__appbar'>
			<span>{noteDate.format( 'D MMMM YYYY ' )} </span>
			<input
				id='fileSelector'
				type='file'
				name='file'
				style= {{ display: 'none'}}
				onChange={ handleFileChange }
			/>
			<div>
				<button 
					className='btn'
					onClick={ handlepictureClick}
				>
                Picture
				</button>
				<button
					className='btn'
					onClick={ handleSave }
				>
                Save
				</button>
			</div>
		</div>
	)
}
