import React from "react";
import TextInput from "../components/textInput";
import Script from "next/script";
import Link from "next/link";

const Register = () => {
  return (
    <div className='container bg-light border col-md-6 col-lg-4'>
      <Script
        id='google-js'
        src='https://https://www.google.com/recaptcha/api.js'
        strategy='lazyOnload'
        onLoad={() => {
          console.log("recaptcha loaded");
        }}
      />

      <header>
        <h6>Register</h6>
      </header>
      <form onSubmit={handleSubmit}>
        <div className='form-group '>
          <TextInput
            type={"text"}
            placeholder={"Full name"}
            name={"name"}
            required={true}
          />
          <TextInput
            type={"email"}
            placeholder={"Email address"}
            name={"email"}
            required={true}
          />
          <TextInput
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            required={true}
          />
          <TextInput
            type={"password"}
            placeholder={"Repeat Password"}
            name={"password"}
            required={true}
          />

          <div className='g-recaptcha' data-sitekey='your_site_key'>
            <span></span>
          </div>

          <div className='form-input my-3'>
            <input
              className='form-check-input me-2'
              type='checkbox'
              id='termsAgreed'
              required
            />
            <label className='form-check-label' htmlFor='termsAgreed'>
              I agree all statements in <a href='#!'>Terms of service</a>
            </label>
          </div>

          <button type='submit' className='btn btn-primary text-smallcaps'>
            Register
          </button>
        </div>
      </form>

      <hr data-content='OR' className='hr-text' />
      <div className='flex-content'>
        <h6>Continue with</h6>
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
      <hr className='' data-content='OR' />
      <p className='text-end'>
        I already have an account,{" "}
        <Link href='/login'>
          <a className='text-primary'>sign in</a>
        </Link>
      </p>
    </div>
  );
};

// register the user
const handleSubmit = async (event) => {
  event.preventDefault();
};

const handlePasswordMismatch = () => {};

export default Register;
