import React, { useContext } from 'react';
import { CollaborateurContext } from '../../providers/CollaborateurContext'
import '../ConversWindow.css';
import Moment from 'react-moment'

const ConversWindow = () => {

    const { user, discussion, closeChat } = useContext(CollaborateurContext)

    return (
        <div className="mt-2 h-100" id="to_autoscroll"
            style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                width: '98%'
            }}>
            {discussion.map((item, i) => {
                if (item.user !== 'demandeCloture' && item.user!== 'Plateforme Psychologique') {
                    return (<div className="w-75 d-flex flex-column m-2" key={i}
                        style={{ float: user === item.user ? "right" : "left" }}
                    >
                        <p className="apiUsername"
                            style={{ alignSelf: user === item.user ? "flex-end" : "flex-start" }}
                        >{item.user}</p>
                        <div className={user === item.user ? "messageBlocA" : "messageBlocB"}>
                            <p className="apiMessage">{item.message}</p>
                            <Moment format="DD/MM/YYYY - HH:mm" style={{ float: 'right', fontSize: '12px' }}>{item.timestamp}</Moment>
                        </div>
                    </div>)
                }
                else if (item.user === 'Plateforme Psychologique') {
                    return (<div className="w-100 p-5 d-flex flex-column m-2" key={i}
                        style={{ textAlign: 'center' }}
                    >
                        <div className="messageBlocC" style={{ color: '#849191' }}>
                            <p className="apiMessage mt-2">{item.message}</p>
                            <Moment format="DD/MM/YYYY - HH:mm" style={{ float: 'right', fontSize: '12px' }}>{item.timestamp}</Moment>
                        </div>
                    </div>)
                }
                else {
                    return (<div className="w-100 p-5 d-flex flex-column m-2" key={i}
                        style={{ textAlign: 'center' }}
                    >
                        <div className="messageBlocC" style={{ color: '#849191' }}>
                            <p className="apiMessage mt-2">Votre psychologue vous invite à clôturer le ticket pour mettre fin à la conversation</p>
                            <div>
                                <button className='primary_button' style={{ width: '300px' }} onClick={() => closeChat()}>Clôturer le ticket</button>
                            </div>
                            <Moment format="DD/MM/YYYY - HH:mm" style={{ float: 'right', fontSize: '12px' }}>{item.timestamp}</Moment>
                        </div>
                    </div>)
                }
            })}
        </div>
    )
}

export default ConversWindow;
