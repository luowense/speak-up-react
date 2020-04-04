import React, { Component } from 'react';
import SectionContainer from './sectionContainer';


class FormConversation extends Component {
  // constructor(props) {
  //   super(props)
  // }
  
  render() {
    return(
      <>
        <SectionContainer header='Suivi de la conversation'>
          <label 
            className='mb-0'
            htmlFor='form-conv_type'
          >
            Type de conversation
          </label>
          <select 
            className='browser-default custom-select custom-select-sm'
            id='form-conv_type' 
            >
            <option>Selectionnez une option</option>
            <option value='1'>Texte</option>
            <option value='2'>Vocal</option>
            <option value='3'>Vidéo</option>
          </select>
          <label 
            className='mt-2 mb-0'
            htmlFor='form-conv_num'
          >
            N° de suivi
          </label>
          <input // Récupérée sur serveur ou saisie ?
            className='form-control form-control-sm' 
            id='form-conv_num' 
            type='text' 
          />
          <label 
            className='mt-2 mb-0'
            htmlFor='form-conv_next'
          >
            Orientation proposée
          </label>
          <select 
            className='browser-default custom-select custom-select-sm'
            id='form-conv_next' 
            >
            <option>Selectionnez une option</option>
            <option value='1'>Même mode de communication</option>
            <option value='2'>RV physique</option>
            <option value='3'>Autre</option>
          </select>
        </SectionContainer>
      </>
    )
  }
}

export default FormConversation;
