import React, { useContext } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext'
import { MDBIcon } from 'mdbreact';

const ProfilMenu = () => {

    const { user, putStatus, status } = useContext(PsychologueContext)


    return (
        <div className='h-100 w-100 z-depth-2 d-flex flex-column p-0' style={{
            backgroundColor: 'white',
            padding: '10px'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: 'black',
                marginTop: '10px',
            }}>
                Profil
                <hr />
            </h2>
            <div className='d-flex flex-column justify-content-start align-items-center mx-2 mb-2'
                style={{
                    height: 'auto'
                }}>
                <MDBIcon icon="user-circle" size="5x" className="" />
                <h3 className='m-3'>{user}</h3>
                <div className='d-flex w-75 mt-3 flex-column align-items-center justify-content-around'>
                    <button
                        className='status_button m-2 z-depth-1 d-flex align-items-center justify-content-start'
                        style={{ border: status==='psy_online' ? '2px #36cf3e solid' : 'none' }}
                        onClick={()=>{putStatus('psy_online')}}>
                        <div
                            className='voyant mx-2'
                            style={{ backgroundColor: status === 'psy_online' ? '#36cf3e' : '#2b8c01' }} />
                        <p
                            className='m-0'
                            style={{ textAlign: 'center', width: '70%', color: status === 'psy_online' ? '#36cf3e' : '#2b8c01' }}>Disponible</p>
                    </button>
                    <button
                        className='status_button m-2 z-depth-1 d-flex align-items-center justify-content-start'
                        style={{ border: status==='psy_busy' ? '2px orange solid' : 'none' }}
                        onClick={()=>{putStatus('psy_busy')}}>
                        <div
                            className='voyant mx-2'
                            style={{ backgroundColor: status === 'psy_busy' ? 'orange' : '#ad8500' }} />
                        <p
                            className='m-0'
                            style={{ textAlign: 'center', width: '60%', color: status === 'psy_busy' ? 'orange' : '#ad8500' }}>Occupé</p>
                    </button>
                    <button
                        className='status_button m-2 z-depth-1 d-flex align-items-center justify-content-start'
                        style={{ border: status==='psy_offline' ? '2px red solid' : 'none' }}
                        onClick={()=>{putStatus('psy_offline')}}>
                        <div
                            className='voyant mx-2'
                            style={{ backgroundColor: status === 'psy_offline' ? 'red' : '#9e0000' }} />
                        <p
                            className='m-0'
                            style={{ textAlign: 'center', width: '60%', color: status === 'psy_offline' ? 'red' : '#9e0000' }}>Absent</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilMenu