import React, { Component } from 'react';

export class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.parseForm = this.parseForm.bind(this);
  }

  parseForm(e) {
    e.preventDefault();
    const userLogin = {};

    e.target.childNodes.forEach(node => {
      if (node.type === 'text' && node.value !== '') {
        userLogin[node.name] = node.value;
      }
    });

    if (userLogin.hasOwnProperty('email') && userLogin.hasOwnProperty('password')) this.submitForm(userLogin);
  }

  submitForm(loginData) {
    fetch('/login', {
      method: 'POST',
      header: {'Content-type': 'application/json'},
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
        <form onSubmit={this.parseForm}>
          <input name='email' type='text' placeholder='Email'/>
          <input name='password' type='text' placeholder='Password'/>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginContainer;