import React,{Fragment} from 'react'
import Login from '../components/auth/login'
import SignUp from '../components/auth/SignUp'

function auth() {
    return (
        <Fragment>
            <Login/>
            <SignUp/>
        </Fragment>
    )
}

export default auth
