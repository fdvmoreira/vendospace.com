import { useAuth } from "@/context/authContext";
import notify from "@/utils/notify";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email required"),
    password: yup.string().required("Password required"),
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
      <h5 className='lead text-center'>Login</h5>
      <hr />
      {router?.query?.auth_success == "false" ? (
        <p className='alert alert-warning'>Authentication has failed!</p>
      ) : null}
      <form
        id='login-form'
        onSubmit={handleSubmit((data) => {
          fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((data) => data.json())
            .then((res) => {
              notify(res.message, res.success);
              if (res.success) {
                updateAuth({
                  isAuthenticated: res.success,
                  user: res.data,
                  token: res.token,
                });

                router.push("/");
              }
            })
            .catch(console.error);
        })}
        className='group-input mb-3'>
        <div className='form-group'>
          <div className='mb-2'>
            {/** email */}
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
          <div className='mb-2'>
            {/** password */}
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
          <input type='submit' className='btn btn-primary' value='Login' />
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
        <Link href='/register' className='link-primary'>
          sign me up
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
