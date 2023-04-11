import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import notify from "../utils/notify";

let registerForm;

const Register = () => {
  const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
  registerForm = useRef(undefined);

  const schema = yup.object().shape({
    name: yup.string().required("Name required"),
    email: yup.string().email("Invalid email").required("Email required"),
    password: yup.string().required("Password required").min(8),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Your passwords do not match"),
    agreement: yup
      .bool()
      .oneOf([true], "Please accept the terms and conditions")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, updateAuth] = useAuth();
  const router = useRouter();

  return (
    <div className='container bg-light border col-md-6 col-lg-4'>
      {/*
        Uncomment to enable google capatcha 
        <Script
        id='google-js'
        src='https://www.google.com/recaptcha/api.js'
        strategy='lazyOnload'
        onLoad={() => {
          console.log("Recaptcha loaded");
        }}
      /> */}

      <h1 className='lead text-center'>Register</h1>
      <hr />
      <form
        onSubmit={handleSubmit( data => {
          data['signup-method'] = 'email';
          fetch('/auth/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          })
          .then((data) => data.json())
          .then(res=>{
            notify(res.message, res.success);
            if(res.success){
              updateAuth({
                isAuthenticated: res.success,
                user: res.data,
                token: res.token
              });
            
              router.push('/');
            }
          })
          .catch(console.error);
        })}

        ref={registerForm}>
        {/** Full name */}
        <div className='form-group '>
          <div className='mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              {...register("name")}
            />
            {/** name error check */}
            {errors.name?.message && (
              <span className='text-danger'>{errors.name?.message}</span>
            )}
          </div>

          {/** email */}
          <div className='mb-2'>
            <input
              type='email'
              className='form-control'
              placeholder='Email address'
              {...register("email")}
            />
            {/** email error check */}
            {errors.email?.message && (
              <span className='text-danger'>{errors.email?.message}</span>
            )}
          </div>

          {/** password */}
          <div className='mb-2'>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              {...register("password")}
            />
            {/** password error check */}
            {errors.password?.message && (
              <span className='text-danger'>{errors.password?.message}</span>
            )}
          </div>

          {/** confirm password */}
          <div className='mb-2'>
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              {...register("confirmPassword")}
            />
            {/** confirm error check */}
            {errors.confirmPassword?.message && (
              <span className='text-danger'>
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>

          {/** terms and conditions agreements */}
          <div className='form-input my-3'>
            <input
              className='form-check-input'
              type='checkbox'
              id='termsAgreed'
              {...register("agreement")}
            />
            <label className='ms-2 form-check-label' htmlFor='termsAgreed'>
              I agree with all the statements in{" "}
              <Link href={"#"} className='link-primary'>
                Terms of service
              </Link>
            </label>
            {errors.agreement?.message && (
              <span className='text-danger'>
                <br />
                {errors.agreement?.message}
              </span>
            )}
          </div>

          <input
            type='submit'
            className='btn btn-primary g-recaptcha'
            // Uncomment to enable google capatcha
            // data-sitekey={`${RECAPTCHA_SITE_KEY}`}
            // data-callback='recaptchaSubmit'
            // data-action='submit'
            value='Register'
          />
        </div>
      </form>

      <hr className='hr-text' data-content='OR' />
      <div className='flex-content'>
        <h5 className='fst-'>Register with</h5>
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
      <hr className='hr' data-content='OR' />
      <p className='text-end'>
        I already have an account,{" "}
        <Link href='/login' className='link-primary'>
          sign in
        </Link>
      </p>
      <ToastContainer/>
    </div>
  );
};

const recaptchaSubmit = (token) => {
  console.log(token);
  registerForm.current.submit();
};

export default Register;
