import React, { Component } from 'react';
import LoginContainer from './containers/loginContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* React Router needed here to determine if cookie is present to bypass login page */}
        <LoginContainer/>
      </div>
    )
  }
}

export default App;