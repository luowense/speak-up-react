import React, { useContext } from 'react';
import { CollaborateurContext } from '../../providers/CollaborateurContext'
import {
    MDBCol,
    MDBRow
} from 'mdbreact';
import ChatBoxCollab from '../../components/collaborateur/ChatBoxCollab';

const Collaborateur = () => {

    const { chatActiv } = useContext(CollaborateurContext)


    return (
        <div className='d-flex h-100 p-2' style={{
        }}>
            <MDBRow center className='w-100'>
                <MDBCol className='h-100' size='10'>
                    {chatActiv ?
                        <ChatBoxCollab />
                        :
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <p>Votre ticket a été clôturé. HPI vous remercie de votre visite.</p>
                        </div>
                    }
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default Collaborateur
