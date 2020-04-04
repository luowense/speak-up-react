import React, { useContext, useState, useEffect } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext'
import Moment from 'react-moment'

const TicketMenu = () => {

    const { openChat, ticketActiv, tickets, userId, status } = useContext(PsychologueContext)

    const [ticketFilter, selectTicketFilter] = useState('open')

    const displayTicketStyle = (ticketId, ticketActiv) => {
        if (ticketActiv === ticketId) {
            return 'ticketActiv'
        } else if ((ticketActiv !== -1) && (ticketId !== ticketActiv)) {
            return 'ticketInactiv'
        } else {
            return 'ticket'
        }
    }

    const countOldTickets = (i) => {
        return tickets
            .filter(item => item.collab_id === i)
            .filter(item => item.state === 'closed')
            .length
    }

    useEffect(()=>{
        status==='psy_busy' && selectTicketFilter('pending')
    },[status])


    return (
        <div className='h-100 z-depth-2 d-flex flex-column p-0' style={{
            backgroundColor: 'white',
            padding: '10px',
            margin: '0'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: 'black',
                marginTop: '10px',
            }}>
                Tickets
                {/* <hr /> */}
            </h2>
            <div>
                <button className='onglet'
                    onClick={() => selectTicketFilter('open')}
                    style={{
                        color: ticketFilter === 'open' ? 'black' : '#cfcfcf',
                        borderBottom: ticketFilter === 'open' ? 'none' : '1px #e3e3e3 solid',
                        borderRight: ticketFilter === 'open' ? 'none' : '1px #e3e3e3 solid',
                        borderRadius: ticketFilter === 'open' ? '0 12px 0 0' : '0 12px 12px 0',
                        boxShadow: ticketFilter === 'open' ? 'none' : 'inset -5px -12px 31px -32px rgba(0,0,0,0.30)'
                    }}
                >En attente de psychologue</button>
                <button className='onglet'
                    onClick={() => selectTicketFilter('pending')}
                    style={{
                        color: ticketFilter === 'pending' ? 'black' : '#cfcfcf',
                        borderBottom: ticketFilter === 'pending' ? 'none' : '1px #e3e3e3 solid',
                        borderLeft: ticketFilter === 'pending' ? 'none' : '1px #e3e3e3 solid',
                        borderRadius: ticketFilter === 'pending' ? '12px 0 0 0' : '12px 0 0 12px',
                        boxShadow: ticketFilter === 'pending' ? 'none' : 'inset 5px -12px 31px -32px rgba(0,0,0,0.30)'
                    }}
                >Discussions en cours</button>
            </div>
            <div className='d-flex flex-column justify-content-start align-items-center m-2'
                style={{
                    height: '100%',
                    overflowY: 'auto'

                }}>
                <hr />
                {
                    tickets
                        .filter((ticket) => {
                            if (ticketFilter === 'open') {
                                return ticket.state === 'open'
                            }
                            else if (ticketFilter === 'pending') {
                                return ticket.state === 'pending' && ticket.psy_id === parseInt(userId)
                            } else {
                                return null
                            }
                        }
                        )
                        .map((ticket, i) => {
                            return (
                                <div
                                    className={displayTicketStyle(ticket.id, ticketActiv)}
                                    onClick={(displayTicketStyle(ticket.id, ticketActiv) === 'ticket') ? () => openChat(ticket.channel, ticket.id) : null}
                                    key={'ticket' + i}
                                >
                                    <p style={{
                                        fontWeight: 'bold'
                                    }}
                                    >
                                        {ticket.pseudo}
                                    </p>
                                    <p style={{
                                        fontStyle: 'italic',
                                        color: ((ticketActiv !== -1) && (i !== ticketActiv)) ? 'lightgrey' : 'grey'
                                    }}
                                    >
                                        Connexion le <Moment format="DD/MM/YYYY">{ticket.updated_on}</Moment> à <Moment format="HH:mm">{ticket.updated_on}</Moment>
                                    </p>
                                    <div><hr /></div>
                                    <p style={{
                                        fontSize: '12px'
                                    }}
                                    >
                                        Historique:
                                         </p>
                                    <p style={{
                                        fontStyle: 'italic',
                                        color: ((ticketActiv !== -1) && (i !== ticketActiv)) ? 'lightgrey' : 'grey'
                                    }}
                                    >
                                        {countOldTickets(ticket.collab_id)} ticket(s) clôturé(s)
                                        </p>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default TicketMenu
