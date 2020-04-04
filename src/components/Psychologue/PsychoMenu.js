import React, { useContext } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext'

const PsychoMenu = () => {

    const { psychologues, user } = useContext(PsychologueContext)

    return (
        <div className='h-100 z-depth-2 d-flex flex-column p-0' style={{
            backgroundColor: 'white',
            padding: '10px'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: 'black',
                marginTop: '10px',
            }}>
                Psychologues
                <hr />
            </h2>
            <div className='d-flex flex-column justify-content-start align-items-start mx-2 mb-2'
                style={{
                    height: 'auto',
                    overflowY: 'auto'
                }}>
                <p style={{ fontWeight: 'bold', fontStyle: 'italic', margin: '0 0 0 8px' }}>Psychologues en ligne</p>
                <hr style={{ width: '90%', margin: '8px' }} />
                {
                    psychologues
                        .filter(item => item.role === 'psy_online' && (item.firstname + ' ' + item.lastname) !== user)
                        .map((item, i) => {
                            return (
                                <div key={'psy_online' + i} className='d-flex align-items-center ml-3 mb-2'>
                                    <div className='voyant' style={{ backgroundColor: '#36cf3e' }} /><p style={{ margin: '0 0 0 8px' }}>{item.firstname} {item.lastname}</p>
                                </div>
                            )
                        })
                }
                <hr />
                <p style={{ fontWeight: 'bold', fontStyle: 'italic', margin: '0 0 0 8px' }}>Psychologues occupés</p>
                <hr style={{ width: '90%', margin: '8px' }} />
                {
                    psychologues
                        .filter(item => item.role === 'psy_busy' && (item.firstname + ' ' + item.lastname) !== user)
                        .map((item, i) => {
                            return (
                                <div key={'psy_online' + i} className='d-flex align-items-center ml-3 mb-2'>
                                    <div className='voyant' style={{ backgroundColor: 'orange' }} /><p style={{ margin: '0 0 0 8px' }}>{item.firstname} {item.lastname}</p>
                                </div>
                            )
                        })
                }
                <hr />
                <p style={{ fontWeight: 'bold', fontStyle: 'italic', margin: '0 0 0 8px' }}>Psychologues hors-ligne</p>
                <hr style={{ width: '90%', margin: '8px' }} />
                {
                    psychologues
                        .filter(item => item.role === 'psy_offline' && (item.firstname + ' ' + item.lastname) !== user)
                        .map((item, i) => {
                            return (
                                <div key={'psy_online' + i} className='d-flex align-items-center ml-3 mb-2'>
                                    <div className='voyant' style={{ backgroundColor: 'red' }} /><p style={{ margin: '0 0 0 8px' }}>{item.firstname} {item.lastname}</p>
                                </div>
                            )
                        })
                }

            </div>
        </div>
    )
}

export default PsychoMenu