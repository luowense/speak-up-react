import React, { Component } from 'react';
import axios from 'axios';
export const PsychologueContext = React.createContext();

class PsychologueProvider extends Component {
    constructor(props) {
        super(props)
        this.channel = '';
        this.clientId = '';
        this.token = localStorage.getItem("token") || null;
        this.socket = this.props.socket;
        this.state = {
            endpoint: this.props.endpoint,
            user: localStorage.getItem("username") || 'anonyme',
            userId: localStorage.getItem('userId') || null,
            status: 'psy_online',
            isLogged: false,
            discussion: [],
            tickets: [],
            psychologues: [],
            menuActiv: 'profil',
            chatActiv: false,
            formActiv: false,
            ticketActiv: -1,
            changeMenu: this.changeMenu,
            putStatus: this.putStatus,
            getTicket: this.getTicket,
            getPsy: this.getPsy,
            openChat: this.openChat,
            openChannel: this.openChannel,
            closeChat: this.closeChat,
            closeTicket: this.closeTicket,
            goToForm: this.goToForm,
            sendForm: this.sendForm,
            sendMessage: this.sendMessage,
            setToken: this.setToken,
            ticketId: '',
        }
    }

    setToken = (data) => {
        this.setState({ user: data.username, userId: data.id })
        this.token = data.token
        //Mise à jour du status du psychologue à la connexion (psy_online)
        this.putStatus('psy_online')

    }

    putStatus = (status) => {
        //Mise à jour du status du psy
        this.setState({ status: status })
        axios.put(`${this.props.endpoint}/api/users/auth/admin/${this.state.userId}`, { role: status }, { headers: { "Authorization": `Bearer ${this.token}` } })
            .then(res => {
                // console.log(res)
            })
    }

    changeMenu = (page) => {
        this.setState({ menuActiv: page })
    }

    openChat = (channel, ticketId) => {
        this.collectMessages(channel)
        this.setState({ 
            chatActiv: true, 
            ticketActiv: ticketId, 
            ticketId: ticketId, 
        })
        this.channel = channel
    }

    openChannel = () => {
        this.socket.emit('waiting room', this.channel)
        this.putStatus('psy_busy')
        axios.put(`${this.props.endpoint}/api/tickets/state/${this.state.ticketActiv}`, { state: 'pending', psy_id: this.state.userId }, { headers: { "Authorization": `Bearer ${this.token}` } })
            .then(res => {
                // console.log(res)
            })
    }

    collectMessages = (channel) => {
        axios.get(`${this.props.endpoint}/api/messages?chid=${channel}`)
            .then(res => {
                this.setState({ discussion: [...res.data] });
            })
    }

    closeChat = () => {
        this.setState({ chatActiv: false, ticketActiv: -1, discussion: [] })
        this.socket.emit('leave room', { channel: this.channel, clientId: this.clientId })
        this.putStatus('psy_online')
    }

    closeTicket = () => {
        this.socket.emit('message', {
            message: 'Demande de fermeture du ticket envoyée',
            user: 'demandeCloture',
            channel: this.channel,
            timestamp: Date.now(),
            sender_id: 0,
            tickets_id: 0
        })
    }

    goToForm = () => {
        this.setState({ chatActiv: !this.state.chatActiv, formActiv: !this.state.formActiv })
    }

    sendForm = () => {
        this.setState({ formActiv: false, ticketActiv: -1, discussion: [] })
        this.socket.emit('leave room', { channel: this.channel, clientId: this.clientId })
        this.putStatus('psy_online')
        axios.put(`${this.props.endpoint}/api/tickets/state/${this.state.ticketActiv}`, { state: 'closed', psy_id: this.state.userId }, { headers: { "Authorization": `Bearer ${this.token}` } })
            .then(res => {
                // console.log(res)
            })
    }

    getTicket = () => {
        axios.get(`${this.props.endpoint}/api/tickets/all`, { headers: { "Authorization": `Bearer ${this.token}` } })
            .then(res => {
                const tickets = res.data;
                this.setState({ tickets });
            })
    }

    getPsy = () => {
        axios.get(`${this.props.endpoint}/api/users/psy/all`, { headers: { "Authorization": `Bearer ${this.token}` } })
            .then(res => {
                const psychologues = res.data;
                this.setState({ psychologues });
            })
    }

    sendMessage = (message) => {

        if (message.length > 0) {
            this.socket.emit('message', {
                message: message,
                user: this.state.user,
                channel: this.channel,
                timestamp: Date.now(),
                sender_id: this.state.userId,
                tickets_id: this.state.ticketId,
                role: 'psy_on'
            })
        }
    }

    componentDidMount = () => {
        this.socket.on('waiting room', object => {
            if (typeof (object) === 'object') {
                this.setState({ discussion: [...this.state.discussion, object] })
                if (this.state.chatActiv) document.getElementById("to_autoscroll").scrollBy(0, 10000)
            }
            else {
                this.clientId = object
            }
        })

        this.socket.on('psychologues', object => {
            if (this.token !== null)
            this.getPsy()
        })

        this.socket.on('tickets', object => {
            if (this.token !== null)
            this.getTicket()
        })
    }

    render() {
        return (
            <PsychologueContext.Provider value={this.state}>
                {this.props.children}
            </PsychologueContext.Provider>
        )
    }
}

export default PsychologueProvider;
