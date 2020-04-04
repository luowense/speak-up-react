import React, { useContext, useState } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext';
import { GlobalContext } from '../../providers/GlobalContext';
import axios from 'axios';
import { MDBCol, MDBIcon } from 'mdbreact';
import { useHistory } from 'react-router-dom';

const AccueilPsy = () => {

    const { setToken } = useContext(PsychologueContext);
    const { endpoint } = useContext(GlobalContext);
    const [data, updateData] = useState({ email: '', password: '' });
    const [error, setError] = useState([false, ''])
    let history = useHistory();

    const updateField = (event) => {
        updateData(Object.assign(data, { [event.target.name]: event.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${endpoint}/api/users/auth/admin`, { data })
            .then(res => {
                if (res.status === 200) {
                    setToken(res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('username', res.data.username)
                    localStorage.setItem('userId', res.data.id)
                }
            })
            .then(() => {
                history.replace('/psy')
            })
            .catch(err => {
                setError([true, err.response.data.message])
            })
    }

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
                    <p className='h5 text-center mb-4 white-text'>Sign in</p>
                    <label htmlFor='email' className='white-text'>
                        Your email
                  </label>
                    <input style={{borderRadius: '20px'}} type='email' id='email' name='email' className='form-control' onChange={updateField} />
                    <br />
                    <label htmlFor='password' className='white-text'>
                        Your password
                  </label>
                    <input style={{borderRadius: '20px'}} type='password' id='password' name='password' className='form-control' onChange={updateField} />
                    <div className='text-center mt-4'>
                        <button className='secondary_button' style={{ width: '200px' }} type='submit' onClick={handleSubmit} >
                            Login
                        </button>
                    </div>
                </form>
            </MDBCol>

            <div className='z-depth-1'
                style={{
                    display: error[0] ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#f8e5e8'
                }}>
                <p className='m-0' style={{color:'#b00020', padding: '0 24px 0 24px' }}>
                    <MDBIcon icon="exclamation-triangle" size="1x" className="#b00020-text mr-3" />
                    {error[1]}
                </p>
            </div>
        </div>
    )

}

export default AccueilPsy;
