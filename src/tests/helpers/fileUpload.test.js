import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary'


cloudinary.config({ 
    cloud_name: 'dz05ccmql', 
    api_key: '874151438335991', 
    api_secret: 'yWk4ohbIPBZr5DDRqmy2SBuH4hA',
    secure: true
  });


describe('Pruebas en fileUpload.js', () => {
    test('debe cargar un archivo y retornar el URL', async() => {
        
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/2560px-Pac-Man_Cutscene.svg.png')
        const blob = await resp.blob()

        const file = new File([blob], 'foto.png')
        const url = await fileUpload( file )

        expect( typeof url ).toBe('string')

        const segments = url.split('/')
        const imageId = segments[ segments.length - 1].replace('.png', '')

        cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });


    test('debe retornar un error', async() => {
        

        const file = new File([], 'foto.png')
        const url = await fileUpload( file )

        expect( url ).toBe(null)
    });
});