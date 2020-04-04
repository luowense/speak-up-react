import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { CollaborateurContext } from '../../providers/CollaborateurContext'
import { MDBCol } from 'mdbreact'

const Accueil = () => {

    const { startCollab } = useContext(CollaborateurContext)
    const [name, changeName] = useState('anonyme')

    return (
        <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
            <h2 style={{
                marginBottom: '64px',
                fontWeight: 'bold',
                fontSize: '64px'
            }}>
                Bienvenue sur SpeakUp
            </h2>
            <MDBCol md='6' className='d-flex align-items-center'>
                <form className='w-100 px-5 py-3 z-depth-4' style={{
                    backgroundColor: '#034ACF',
                    borderRadius: '20px'
                }}>
                    <p className='h5 text-center mb-4 white-text'>Entrez un pseudo ou lancez la conversation en anonyme</p>
                    <label htmlFor='defaultFormLoginEmailEx' className='white-text'>
                        Votre pseudo
                  </label>
                    <input
                        style={{ borderRadius: '20px' }}
                        type='text'
                        id='user'
                        name='user'
                        onChange={e => changeName(e.target.value)}
                        placeholder={name}
                        className='form-control' />
                    <div className='text-center mt-4'>
                        <Link to={'/collab'}><button
                            className='secondary_button'
                            style={{ width: '200px' }}
                            type='submit'
                            onClick={() => { startCollab(name) }}>
                            Lancer la conversation
                    </button></Link>
                    </div>
                </form>
            </MDBCol>
        </div>
    )
}

export default Accueil;
