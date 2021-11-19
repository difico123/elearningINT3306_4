import React from 'react';
import AuthApi from '../authUser';
import cookies from 'js-cookie'

const Login = () => {
    let Auth = React.useContext(AuthApi)
  
    const handleLogin = () => {
      cookies.set('user',"userAuth")
      Auth.setAuth(true)
      console.log(cookies.get('user'))
    }
  
    return (
      <div>
        <h2>Helloword</h2>
        <button onClick={handleLogin}>login</button>
      </div>
    )
  }

  export default Login