import { useRef } from "react";
import TextInput from "../components/textInput";
export default function login(){

  let loginForm = useRef();

  return (
    <div className="container">
      <h5>Login</h5>
      <form id ='login-form' onSubmit={signIn} ref={loginForm} className="group-input mb-3">
        <div className="form-group col-md-6">
          <TextInput type={'email'} placeholder={'Email address'} name={'email'}/>
          <TextInput type={'password'} placeholder={'Password'} name={'password'}/>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
        <hr data-content="OR" className="hr-text"/>
      </form>
        <div className="flex-content">
          <h6>Login with:</h6>
          <ul className="nav nav-tabs py-3">
            <li className="nav-item"><a href="http://localhost:5000/auth/facebook" className="nav-link"><i className="bi bi-facebook"></i> facebook</a></li>
            <li className="nav-item"><a href="http://localhost:5000/auth/google" className="nav-link"><i className="bi bi-google"></i> google</a></li>
            <li className="nav-item"><a href="http://localhost:5000/auth/linkedin" className="nav-link"><i className="bi bi-linkedin"></i> linkedin</a></li>
          </ul>
        </div>
    </div>
  )
}

const signIn = ()=>{
      const data = new FormData(loginForm).append('type','Email');
      
      fetch('http://localhost:5000/login',{
      method:'POST',
      body: data,
      credentials:"include"
    }).then((res=>res.json())).then((data)=>{a
      if (data) window.location('/index');
    }).catch()
}