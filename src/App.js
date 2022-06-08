import logo from './logo.svg';
import './App.css';
import { Auth } from "aws-amplify";
import {useState} from "react";

function App() {
  const [token, setToken] = useState(null);

  async function getUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    setToken(user.signInUserSession.idToken.jwtToken)
  }

  function getViewings() {
    fetch('https://admin.local.strike.dev/api/appointments/viewings', {
      headers: { "Authorization": token ?? '' }
    }).then(response => response.json())
        .then(data => console.log(JSON.stringify(data)))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
            onClick={ () => Auth.federatedSignIn({ provider: "Google" }) }
        >Sign with google
        </button>

        <button onClick={getUser} >get cognito user</button>

        <button onClick={getViewings} >get viewings</button>

      </header>
    </div>
  );
}

export default App;
