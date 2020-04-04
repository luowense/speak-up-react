import React, { Component } from 'react';
import SectionContainer from './sectionContainer';


class FormPsy extends Component {
  // constructor(props) {
  //   super(props)
  // }
  
  render() {
    return(
      <>
        <SectionContainer header='A propos de la conversation' >
          <label 
            className='mb-0'
            htmlFor='form-psy_conv'
          >
            Psychologue
          </label>
          <input 
            className='form-control form-control-sm' 
            id='form-psy_conv' 
            type='text' 
            value="Nom, Prénom" // Récupéré avec login/mdp
            disabled
          />
          <label 
            className="mt-2 mb-0"
            htmlFor='form-psy_date'
          >
            Date de la conversation
          </label>
          <input // Récupérée sur serveur ou saisie ?
            className='form-control form-control-sm' 
            id='form-psy_date' 
            type='date' 
          />
          <div className='form-row mt-2'>
            <div className='form-col col-md'>
              <label 
                className='mb-0'
                htmlFor='form-psy_time'
              >
                Heure
              </label>
              <input 
                className='form-control form-control-sm' 
                id='form-psy_time' 
                type='time' 
              />
            </div>
            <div className='form-col col-md'>
              <label 
                className='mb-0'
                htmlFor='form-psy_length'
              >
                Durée
              </label>
              <input 
                className='form-control form-control-sm' 
                id='form-psy_length' 
                type='time' 
              />
            </div>
          </div>
        </SectionContainer>
      </>
    )
  }
}

export default FormPsy;
