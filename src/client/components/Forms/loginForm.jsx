import React from 'react';

export default function LoginForm(props) {
  return (
    <form onSubmit={props.parseForm}>
      <input name='username' type='text' placeholder='Email'/>
      <input name='password' type='text' placeholder='Password'/>
      <button>Login</button>
    </form>
  );
}