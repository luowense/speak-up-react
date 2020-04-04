import React, { Component } from 'react';
import SectionContainer from './sectionContainer';


class FormCollab extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      anonymous: null,
      radio_gender: null
    })
  }

  render() {
    const form_collab_anonymous = {
      position: 'absolute',
      right: '0em',
      marginTop: '-2.6em',
    };
    const isAnonymous = this.state.anonymous === true 
      ? 'form-control form-control-sm red lighten-3' 
      : 'form-control form-control-sm';

  return(
    <>
      <SectionContainer header='A propos de l&#39;appelant' >

        {/* Anonyme : récupéré de la BDD ? */}
        <div 
          className="custom-control custom-checkbox custom-control-inline mb-0 p-0" 
          style={form_collab_anonymous}
        >
          <input 
            // gap 
            className="custom-control-input" 
            id="form-collab_anonymous" 
            type="checkbox" 
            onChange={() => this.setState({anonymous: !this.state.anonymous})}
          />
          <label className="custom-control-label" htmlFor="form-collab_anonymous">Anonyme</label>
        </div>  
  
        <div className='form-row pl-4 pl-md-0 text-md-center'>
          <div className='form-col col-md-4'>
            <input 
              // gap
              checked={this.state.radio_gender === "m" ? true : false}
              className="custom-control-input" 
              id="form-collab_m" 
              type="radio" 
              onChange={() => this.setState({radio_gender: "m"})}
            />
            <label className="custom-control-label" htmlFor="form-collab_m">Homme</label>
          </div>
          <div className='form-col col-md-4'>
            <input 
              // gap 
              checked={this.state.radio_gender === "f" ? true : false}
              className="custom-control-input" 
              id="form-collab_f" 
              type="radio" 
              onChange={()=>this.setState({radio_gender: "f"})}
            />
            <label className="custom-control-label" htmlFor="form-collab_f">Femme</label>
          </div>
          <div className='form-col col-md-4'>
            <input 
              // gap 
              checked={this.state.radio_gender === "np" ? true : false}
              className="custom-control-input" 
              id="form-collab_np" 
              type="radio" 
              onChange={()=>this.setState({radio_gender: "np"})}
            />
            <label className="custom-control-label" htmlFor="form-collab_np">Non précisé</label>
          </div>
        </div>     
        <div className='form-row mt-2'>
          <div className='form-col col-md'>
            <label 
              className='mb-0'
              htmlFor='form-collab_lastname'
            >
              Nom
            </label>
            <input 
              className={isAnonymous}
              id='form-collab_lastname' 
              type='text' 
            />
          </div>
          <div className='form-col col-md'>
            <label 
              className='mb-0'
              htmlFor='form-collab_firstname'
            >
              Prénom
            </label>
            <input 
              className={isAnonymous}
              id='form-collab_firstname' 
              type='text' 
            />
          </div>
        </div>
        <div className='form-row mt-2'>
          <div className='form-col col-md'>
            <label 
              className='mb-0'
              htmlFor='form-collab_age'
            >
              Age
            </label>
            <input 
              className={isAnonymous}
              id='form-collab_age' 
              type='number' 
            />
          </div>
          <div className='form-col col-md'>
            <label 
              className='mb-0'
              htmlFor='form-collab_anc'
            >
              Ancienneté
            </label>
            <input 
              className={isAnonymous}
              id='form-collab_anc'
              type='text' 
            />
          </div>
        </div>
      </SectionContainer>
    
    </>
  )}
}

export default FormCollab;
