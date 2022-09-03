import React from 'react';
import './App.css';
import { FriendsList } from './views/FriendsList';
import { LandingPage } from './views/LandingPage';
import { TwitterConnect } from './views/TwitterConnect';

function App() {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');

  if (state) {
    window.localStorage.setItem('state', state);
  }

  return (
    <React.Fragment>
      <LandingPage/>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {
        state ? (
          <React.Fragment>
            twitter list
            <FriendsList />

          </React.Fragment>
        ) : (
          <React.Fragment>
            connector
            <TwitterConnect />
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={() => {
          new RampInstantSDK({
            hostAppName: 'Your App',
            url: 'https://ri-widget-staging-kovan.firebaseapp.com/',
            hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
          }).show();
        }}>
          open
        </button>
        <button onClick={() => {
        }}></button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
