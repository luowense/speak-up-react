import React, { useContext } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext'
import FormPsy from '../../components/Psychologue/FormPsy';
import FormCollab from '../../components/Psychologue/FormCollab';
import FormConversation from '../../components/Psychologue/FormConversation';
import FormComment from '../../components/Psychologue/FormComment';
import { MDBCol } from 'mdbreact';


const FormEndCall = () => {

  const { sendForm } = useContext(PsychologueContext)

  return (
    <div className="d-md-flex h-100 w-100 p-3 rounded z-depth-1" >
      <div className='w-100 d-md-flex px-3' style={{ overflowY: "auto" }}>
        <MDBCol md='6' tag='section'>
          <FormPsy />
          <FormCollab />
          <FormConversation />
        </MDBCol>

        <MDBCol md='6' tag='section' className='d-flex flex-column'>
          <FormComment />
          <div className="text-right mt-auto">
            <button className='primary_button z-depth-1' onClick={() => sendForm()}>Envoyer</button>
          </div>
        </MDBCol>
      </div>
    </div>
  )
}

export default FormEndCall;
