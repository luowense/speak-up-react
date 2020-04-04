import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { HashRouter as BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from './pages/collaborateur/Accueil';
import Collaborateur from './pages/collaborateur/Collaborateur';
import AccueilPsy from './pages/psychologue/AccueilPsy';
import Psychologue from './pages/psychologue/Psychologue';
import PrivateRoute from './hoc/PrivateRoute';
import { GlobalContext } from './providers/GlobalContext'
import PsychologueProvider from './providers/PsychologueContext';
import CollaborateurProvider from './providers/CollaborateurContext';
import socketIOClient from 'socket.io-client';


function App() {
  const { endpoint } = useContext(GlobalContext);
  const socket = socketIOClient(endpoint);
  const params = (new URL(document.location)).searchParams;
  const token = params.get('token');
  const id = params.get('id');
  const [checkTokenValue, setCheckTokenValue] = useState(false)

  useEffect(() => {
    if (id && token) CheckToken().then(val => setCheckTokenValue(val))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CheckToken = async () => {
    try {
      const { data } = await axios.get(`${endpoint}/api/tickets?token=${token}`)
      return (data.id.toString() === id.toString())
    } catch (error) {
      // console.log("Erreur:", error)
    };
  }

  const Authorized = () => {
    if (checkTokenValue === true)
      return (
        <>
          <Route exact path='/' component={Accueil} />
          <Route path='/collab' component={Collaborateur} />
        </>
      );
  }

  const Unauthorized = () => {
    if ((!id || !token) || (id && token))
      return (
        <div className="d-flex h-100 w-100 align-items-center justify-content-center">
          <Link to={'/admin'}>
            <MDBBtn
              type="button"
              outline
              color="primary"
              className='position-absolute fixed-top secondary_button '
              style={{ borderRadius: '10em' }}
            >
              Admin
            </MDBBtn>
          </Link>
          <h3>La page que vous cherchez n'existe pas.</h3>
        </div>
      )
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        minHeight: '500px',
        minWidth: '600px'
      }}
    >
      <BrowserRouter>
        <PsychologueProvider endpoint={endpoint} socket={socket}>
        <CollaborateurProvider endpoint={endpoint} socket={socket} userInfos={{id, token}} >
        <Switch>
          <Route path='/admin' component={AccueilPsy} />
          <PrivateRoute path='/psy' component={Psychologue} />
          {(checkTokenValue === true) ? <Authorized /> : <Unauthorized />}
        </Switch>
        </CollaborateurProvider>
        </PsychologueProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
