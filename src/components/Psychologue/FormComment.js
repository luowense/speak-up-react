import React, { Component } from 'react';
import SectionContainer from './sectionContainer';

class FormComment extends Component {
  render() {
    return (
      <>
        <SectionContainer header='Commentaires'>
        <label 
            className='mb-0'
            htmlFor='form-comment_origin'
          >
            Origine de la demande
          </label>
          <select 
            className='browser-default custom-select custom-select-sm'
            id='form-comment_origin' 
            >
            <option>Selectionnez une option</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <div className='form-group'>
            <label 
              className='mt-3 mb-0'
              htmlFor='form-comment_customer'
            >
              Commentaire pour le client
            </label>
            <textarea
              className='form-control green lighten-4 mb-0'
              id='form-comment_customer'
              rows='5'
            />
          </div>
          <div className='form-group'>
            <label 
              className='mb-0'
              htmlFor='form-comment_private'
            >
              Commentaire confidentiel
            </label>
            <textarea
              className='form-control red lighten-4'
              id='form-comment_private'
              rows='5'
            />
          </div>
        </SectionContainer>
      </>
    )
  }
}
export default FormComment;
