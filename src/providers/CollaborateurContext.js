import React, { Component } from 'react';
import axios from 'axios';
export const CollaborateurContext = React.createContext();

class CollaborateurProvider extends Component {
    constructor(props) {
        super(props)
        this.channel = '';
        this.clientId = '';
        this.socket = this.props.socket;
        this.tickets_id = '';
        this.state = {
            user: 'anonyme',
            chatActiv: true,
            startCollab: this.startCollab,
            closeChat: this.closeChat,
            sendMessage: this.sendMessage,
            userId: this.props.userInfos.id,
            userToken: this.props.userInfos.token,
            discussion: []
        }
    }

    startCollab = (name) => {
        this.setState({ user: name, discussion: [] }, () => {
            axios.post(`${this.props.endpoint}/api/tickets/`, {
                id: this.state.userId,
                token: this.state.userToken,
                pseudo: this.state.user
            })
                .then(res => {
                    this.channel = res.data.channel
                    this.tickets_id = res.data.tickets_id
                })
                .then(() => {
                    this.socket.emit('waiting room', this.channel)
                    this.socket.on('waiting room', object => {
                        if (typeof (object) === 'object') {
                            this.setState({ discussion: [...this.state.discussion, object] })
                            if (this.state.chatActiv) document.getElementById("to_autoscroll").scrollBy(0, 10000)
                        }
                        else {
                            this.clientId = object
                        }
                    })
                })
                .then(() => {
                    this.socket.emit('message', { 
                        message: "Bonjour. Vous allez entrer en conversation avec un psychologue. Que peut-il faire pour vous ?", 
                        user: 'Plateforme Psychologique', 
                        channel: this.channel,
                        timestamp: Date.now(),
                        sender_id: 0,
                        tickets_id: 0
                    })
                })
        })
    }

    closeChat = () => {
        this.socket.emit('message', {
            message: 'Fermeture du ticket acceptée ',
            user: 'acceptCloture',
            channel: this.channel,
            timestamp: Date.now(),
            sender_id: 0,
            tickets_id: 0
        })
        this.setState({ chatActiv: false, discussion: [] })
        this.socket.emit('leave room', { channel: this.channel, clientId: this.clientId })
        //penser à vider le local storage
    }


    sendMessage = (message) => {
        if (message.length > 0) {
            this.socket.emit('message', {
                message: message,
                user: this.state.user,
                channel: this.channel,
                timestamp: Date.now(),
                sender_id: this.state.userId,
                tickets_id: this.tickets_id
            })
        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <CollaborateurContext.Provider value={this.state}>
                {this.props.children}
            </CollaborateurContext.Provider>
        )
    }
}

export default CollaborateurProvider;
