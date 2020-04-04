import React, { useContext } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext'
import '../ConversWindow.css';
import Moment from 'react-moment'

const ConversWindow = () => {

    const { user, discussion, goToForm } = useContext(PsychologueContext)



    return (
        <div className="mt-2 h-100" id="to_autoscroll"
            style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                width: '98%'
            }}>
            {discussion.map((item, i) => {
                console.log(item.user)
                // setTimeout(() => {
                //     document.getElementById("to_autoscroll").scrollBy(0, 10000)
                // }, 250);
                if (item.user !== 'demandeCloture' && item.user !== 'acceptCloture') {
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
                else if (item.user === 'demandeCloture') {
                    return (<div className="w-100 p-5 d-flex flex-column m-2" key={i}
                        style={{ textAlign: 'center' }}
                    >
                        <div className="messageBlocC" style={{ color: '#849191' }}>
                            <p className="apiMessage">{item.message}</p>
                            <Moment format="DD/MM/YYYY - HH:mm" style={{ float: 'right', fontSize: '12px' }}>{item.timestamp}</Moment>
                        </div>
                    </div>)
                } else {
                    return (<div className="w-100 px-5 d-flex flex-column m-2" key={i}
                        style={{ textAlign: 'center' }}
                    >
                        <div className="messageBlocC" style={{ color: '#849191' }}>
                            <p className="apiMessage">{item.message}</p>
                            <div>
                                <button className='primary_button' style={{ width: '300px' }} onClick={() => goToForm()}>Accéder au formulaire</button>
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
