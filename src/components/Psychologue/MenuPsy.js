import React, { useContext } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext';
import hpiLogo from '../../assets/hpiLogo.png';
import { MDBIcon } from 'mdbreact';

const MenuPsy = () => {

    const { changeMenu, status } = useContext(PsychologueContext)

    return (
        <div
            className='h-100 w-100 d-flex flex-column align-items-center '
            style={{
                backgroundColor: '#236fff'
            }}>
            <img src={hpiLogo} alt='logo_hpi' style={{ width: '50%', margin: '8px' }} />
            <div className='mt-5'>
                <button className='menu_button mt-5 mb-1' onClick={() => changeMenu('profil')}>
                    <MDBIcon icon="user-alt" size="2x" className="" />
                </button>
                <p style={{ textAlign: 'center', color: 'white', fontSize: '12px' }}>Profil</p>
                <button className='menu_button mt-5 mb-1' onClick={() => changeMenu('psychologues')}>
                    <MDBIcon icon="users" size="2x" className="" />
                </button>
                <p style={{ textAlign: 'center', color: 'white', fontSize: '12px' }}>Psychologues</p>
                <button className='menu_button mt-5 mb-1' onClick={() => changeMenu('tickets')}>
                    <MDBIcon icon="comment-alt" size="2x" className="mt-1" />
                </button>
                <p style={{ textAlign: 'center', color: 'white', fontSize: '12px' }}>Tickets</p>
            </div>
            <div className='mt-auto mb-3 w-100'>
                <hr />
                {status === 'psy_online' &&
                    <div style={{
                        margin: 'auto',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#36cf3e'
                    }} />
                }
                {status === 'psy_busy' &&
                    <div style={{
                        margin: 'auto',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'orange'
                    }} />
                }
                {status === 'psy_offline' &&
                    <div style={{
                        margin: 'auto',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'red'
                    }} />
                }
            </div>

        </div>
    )
}

export default MenuPsy