import React, { useContext, useEffect } from 'react';
import { PsychologueContext } from '../../providers/PsychologueContext'
import ChatBoxPsy from '../../components/Psychologue/ChatBoxPsy';
import TicketMenu from '../../components/Psychologue/TicketMenu';
import MenuPsy from '../../components/Psychologue/MenuPsy';
import FormEndCall from './FormEndCall';
import PsychoMenu from '../../components/Psychologue/PsychoMenu';
import ProfilMenu from '../../components/Psychologue/ProfilMenu';

const Psychologue = () => {

    const { chatActiv, formActiv, getTicket, getPsy, menuActiv } = useContext(PsychologueContext)

    useEffect(() => {
        getTicket()
        getPsy()

    }, [getTicket, getPsy])

    return (
        <div className='d-flex h-100 w-100 justify-content-center' style={{}}>
            <div className='m-0 p-0 h-100' style={{ width: '90px' }}>
                <MenuPsy />
            </div>
            <div className='m-0 p-0 h-100' style={{ width: '430px'}}>
                {menuActiv === 'profil' && <ProfilMenu />}
                {menuActiv === 'psychologues' && <PsychoMenu />}
                {menuActiv === 'tickets' && <TicketMenu />}
            </div>
            <div className='h-100 p-3 psyWindow'>
                {chatActiv && <ChatBoxPsy />}
                {formActiv && <FormEndCall />}
            </div>
        </div>
    )
}

export default Psychologue
