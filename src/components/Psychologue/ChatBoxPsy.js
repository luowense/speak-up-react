import React, { useContext, useState } from 'react'
import { PsychologueContext } from '../../providers/PsychologueContext'
import ConversWindow from './ConversWindow';
import PostMessage from './PostMessage';

const ChatBoxPsy = () => {

    const [inChat, validInChat] = useState(false)
    const [outChat, validOutChat] = useState(false)
    const { openChannel, closeChat, closeTicket } = useContext(PsychologueContext)


    return (
        <>
            {!inChat ?
                <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100'>
                    <div className='w-50 z-depth-1 d-flex flex-column justify-content-around align-items-center' style={{ height: '150px', borderRadius: '8px', minWidth: '350px' }}>
                        <h2 style={{
                            textAlign: 'center',
                            color: 'black',
                            margin: '12px 0 0 0',
                        }}>
                            Ouvrir ce ticket?
                </h2>
                        <div>
                            <button className='secondary_button z-depth-1' onClick={() => closeChat()}>Annuler</button>
                            <button className='primary_button z-depth-1' onClick={() => { validInChat(true); openChannel() }}>Confirmer</button>
                        </div>
                    </div>
                </div>
                :
                <div className='d-flex flex-column justify-content-between align-items-center w-100 h-100 z-depth-2' style={{
                    borderRadius: '10px',
                    position: 'relative'
                }}>
                    <button className='danger_button z-depth-1' style={{ width: '200px', alignSelf: 'flex-start', marginBottom: '0' }} onClick={() => validOutChat(true)}>Terminer la discussion</button>
                    <div style={{ width: '100%' }}><hr /></div>
                    <ConversWindow />
                    <PostMessage />
                    {
                        outChat &&
                        // <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100'>
                        <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100'
                            style={{
                                position: 'absolute'
                            }}
                        >
                            <div className='z-depth-3 d-flex flex-column justify-content-around align-items-center' style={{ borderRadius: '8px', background: 'white' }}>
                                <h2 style={{
                                    textAlign: 'center',
                                    color: 'black',
                                    margin: '12px 0 0 0',
                                    padding: '24px'
                                }}>
                                    Terminer la discussion?
                                </h2>
                                <div className='d-flex flex-column'>
                                    <button className='primary_button z-depth-1' style={{ width: '300px' }} onClick={() => { closeChat() }}>Suspendre le ticket</button>
                                    <button className='danger_button z-depth-1' style={{ width: '300px' }} onClick={() => { closeTicket() ; validOutChat(false)}}>Demander la clôture du ticket</button>
                                    <button className='secondary_button z-depth-1' style={{ width: '300px' }} onClick={() => validOutChat(false)}>Annuler</button>
                                </div>
                            </div>
                        </div>

                    }
                </div>
            }
        </>
    )

}
export default ChatBoxPsy;
