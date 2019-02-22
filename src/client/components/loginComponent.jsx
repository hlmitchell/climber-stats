import React from 'react';

export default function LoginComponent(props) {
  return (
    <div>
      <form onSubmit={props.parseForm}>
        <input name='email' type='text' placeholder='Email'/>
        <input name='password' type='text' placeholder='Password'/>
        <button>Login</button>
      </form>
      <div>Forgot Password? Reset.</div>
      <div>Create an account here.</div>
    </div>
  );
}