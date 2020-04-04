import React, { useContext, useState } from 'react'
import { CollaborateurContext } from '../../providers/CollaborateurContext'

const PostMessage = () => {

    const { sendMessage } = useContext(CollaborateurContext)
    const [msg, changeMsg] = useState('')



    return (
        <div className='w-100 px-4 pb-2 mt-3' style={{
            height: '25%',
        }}>
                <form className='w-100 h-100 d-flex flex-column justify-content-around align-items-end' autoComplete='off'> 
                    <input
                        className='rounded-lg w-100'
                        style={{
                            border: '1px rgb(146, 146, 146) solid',
                            fontFamily: `'Roboto', sans-serif`,
                            padding: '12px',
                            height: '65%'
                        }}
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Ecrivez votre texte ici"
                        onChange={e => changeMsg(e.target.value)}
                        value={msg}
                    />
                    <button
                        className='primary_button z-depth-1'
                        type="submit"
                        onClick={(event) => {
                            event.preventDefault()
                            sendMessage(msg)
                            changeMsg('')
                        }}>
                        Envoyer
                    </button>
                </form>
        </div >
    )
}

export default PostMessage;
