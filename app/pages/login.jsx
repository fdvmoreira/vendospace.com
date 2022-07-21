import { useRef } from "react";
import TextInput from "../components/textInput";
import Link from "next/link";

const Login = () => {
  let loginForm = useRef();

  return (
    <div className='container bg-light border col-md-6 col-lg-4'>
      <h5>Login</h5>
      <form
        id='login-form'
        onSubmit={signIn}
        ref={loginForm}
        className='group-input mb-3'>
        <div className='form-group'>
          <TextInput
            type={"email"}
            placeholder={"Email address"}
            name={"email"}
          />
          <TextInput
            type={"password"}
            placeholder={"Password"}
            name={"password"}
          />
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </div>
        <hr data-content='OR' className='hr-text' />
      </form>
      <div className='flex-content'>
        <h6>Continue with:</h6>
        <ul className='nav nav-pills py-3'>
          <li className='nav-item'>
            <a href='/auth/facebook' className='nav-link'>
              <i className='bi bi-facebook'></i> facebook
            </a>
          </li>
          <li className='nav-item'>
            <a href='/auth/google' className='nav-link'>
              <i className='bi bi-google'></i> google
            </a>
          </li>
          <li className='nav-item'>
            <a href='/auth/linkedin' className='nav-link'>
              <i className='bi bi-linkedin'></i> linkedin
            </a>
          </li>
        </ul>
      </div>
      <hr data-content='' className='hr-text' />
      <p className='text-end'>
        I don't have an account,{" "}
        <Link href='/register'>
          <a className='text-primary'>sign me up</a>
        </Link>
      </p>
    </div>
  );
};

const signIn = () => {
  const data = new FormData(loginForm).append("type", "Email");

  fetch("/login", {
    method: "POST",
    body: data,
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      a;
      if (data) window.location("/");
    })
    .catch();
};

export default Login;
