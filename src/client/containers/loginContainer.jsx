import React, { Component } from 'react';
import LoginForm from '../components/Forms/loginForm.jsx';

export class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.parseForm = this.parseForm.bind(this);
  }

  parseForm(e) {
    e.preventDefault();
    const userLogin = {};

    e.target.childNodes.forEach(node => {
      if (node.nodeName === 'INPUT' && node.value !== '') {
        userLogin[node.name] = node.value;
      }
    });

    if (userLogin.hasOwnProperty('username') && userLogin.hasOwnProperty('password')) {
      this.submitForm(userLogin);
    }
  }

  submitForm(loginData) {
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm parseForm={this.parseForm}/>
          {/* React Router redirects below */}
        <div>Forgot Password? Reset.</div>
        <div>Create an account here.</div>
      </div>
    )
  }
}

export default LoginContainer;