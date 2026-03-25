import { loginUser, registerUser } from '@/APIs/User';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import { globalState } from '@/context/GlobalContext';


function Login({ signUp }) {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const [validationErrs, setValidationErrs] = useState({
    email: {
      valid: null,
      error: '',
    },
    password: {
      valid: null,
      error: '',
    },
    confirmPassword: {
      valid: null,
      error: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  function handleRegistration(e) {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  }

  function validateInputs(getName, getValue) {
    switch (getName) {
      case 'email':
        setValidationErrs({
          ...validationErrs,
          email:
            getValue.length === 0
              ? {
                  valid: false,
                  error: 'Email required',
                }
              : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    getValue,
                  )
                ? {
                    valid: true,
                    error: '',
                  }
                : {
                    valid: false,
                    error: 'Invalid email',
                  },
        });
        break;

      case 'password':
        setValidationErrs({
          ...validationErrs,
          password:
            getValue.length === 0
              ? {
                  valid: false,
                  error: 'Pasword is required',
                }
              : getValue.length < 6
                ? {
                    valid: false,
                    error: 'Password must be atleast 6 characters',
                  }
                : {
                    valid: true,
                    error: '',
                  },
        });
        break;

      case 'confirmPassword':
        setValidationErrs({
          ...validationErrs,
          confirmPassword:
            registrationData.password.length >= 6 &&
            registrationData.confirmPassword.length === 0
              ? {
                  valid: false,
                  error: 'Confirm your password',
                }
              : getValue !== registrationData.password &&
                  registrationData.password.length >= 6 &&
                  registrationData.confirmPassword.length > 0
                ? {
                    valid: false,
                    error: 'Passwords does not match',
                  }
                : {
                    valid: true,
                    error: '',
                  },
        });
        break;

      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateInputs('email', registrationData.email);
    validateInputs('password', registrationData.password);
    validateInputs('confirmPassword', registrationData.confirmPassword);

    if (
      validationErrs.email.valid &&
      validationErrs.password.valid &&
      validationErrs.confirmPassword.valid &&
      registrationData.confirmPassword === registrationData.password
    ) {
      setLoading(true);
      registerUser(
        registrationData.email,
        registrationData.password,
        registrationData.rememberMe,
      )
        .then((res) => {
          setLoading(false);

          if (res?.data?.success) {
            toast.success(res?.data?.message);
            setTimeout(() => {
              navigateTo(`/auth/verify-account/${res?.data?.accessToken}`);
            }, 3000);
          }
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e?.response?.data.message || 'Some error occurred');
        });
    } else {
      if (
        registrationData.email === '' ||
        registrationData.password === '' ||
        registrationData.confirmPassword === ''
      ) {
        toast.error('All fields are required');
      } else {
        toast.error('Please fix the errors');
      }
    }
  }
  function handleLogin(e) {
    e.preventDefault();
    validateInputs('email', registrationData.email);
    validateInputs('password', registrationData.password);

    if (validationErrs.email.valid && validationErrs.password.valid) {
      setLoading(true);
      loginUser(
        registrationData.email,
        registrationData.password,
        registrationData.rememberMe,
      )
        .then((res) => {
          setLoading(false);
          if (res.data.role === 'admin') {
            navigateTo('/admin-dashboard');
          } else {
            navigateTo('/patient-dashboard');
          }
        })
        .catch((e) => {
          setLoading(false);

          toast.error(
            !e.response.data.message
              ? e.response.statusText
              : e.response.data.message,
          );
          if (
            e.response.data.message ===
            'Your email is not verified. We have sent the 6-digit code to verify your email.'
          ) {
            navigateTo(`/auth/verify-account/${e.response?.data?.hashedCode}`);
          }
        });
    } else {
      if (
        registrationData.email === '' ||
        registrationData.password === '' ||
        registrationData.confirmPassword === ''
      ) {
        toast.error('All fields are required');
      } else {
        toast.error('Please fix the errors');
      }
    }
  }

  return (
    <div className='flex h-146 w-full'>
      <Toaster />
      <div className='w-full hidden md:inline-block'>
        <img
          fetchPriority='high'
          className='h-full w-full'
          src='https://res.cloudinary.com/dwwaetdws/image/upload/v1767298404/nappy-jkQzYGJ7dBA-unsplash_qrrden.jpg'
          alt='leftSideImage'
        />
      </div>

      <div className='w-full  flex flex-col items-center justify-center'>
        <form className='md:w-96 w-80 flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-poppins text-gray-900 font-medium'>
            {signUp ? 'Create Account' : 'Sign In'}
          </h2>
          <p className='text-sm text-gray-500/90'>
            {signUp
              ? 'Welcome To Mekin Home Care'
              : ' Welcome back! Please sign in to continue'}
          </p>

          <button
            onClick={() => {
              window.location.href = '/api/auth/google';
            }}
            type='button'
            className='w-full mt-4 bg-gray-500/10 flex items-center justify-center h-12 rounded-full'
          >
            <img
              src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg'
              alt='googleLogo'
            />
          </button>

          <div className='flex items-center gap-4 w-full my-5'>
            <div className='w-full h-px bg-gray-300/90'></div>
            <p className='w-full text-nowrap text-sm text-gray-500/90'>
              {signUp ? 'or sign up with email' : ' or sign in with email'}
            </p>
            <div className='w-full h-px bg-gray-300/90'></div>
          </div>
          <div className='w-full transform duration-500 ease-out'>
            <div
              className={`flex items-center w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-3 ${
                validationErrs.email.valid === false
                  ? 'border-red-500'
                  : 'border-gray-300/60'
              }`}
            >
              <svg
                width='16'
                height='11'
                viewBox='0 0 16 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z'
                  fill='#6B7280'
                />
              </svg>
              <input
                onChange={handleRegistration}
                value={registrationData.email}
                onBlur={(e) => validateInputs('email', e.target.value)}
                onFocus={() =>
                  setValidationErrs({
                    ...validationErrs,
                    email: {
                      valid: null,
                      error: '',
                    },
                  })
                }
                name='email'
                type='email'
                placeholder='Email id'
                className='bg-transparent text-gray-950 placeholder-gray-500/80 outline-none text-sm w-full h-full'
                required
              />
            </div>
            {validationErrs.email.valid === false && (
              <p className='text-red-500 animateInputErr text-fxs'>
                {validationErrs.email.error}
              </p>
            )}
          </div>

          <div className='w-full transform duration-500 ease-out'>
            <div
              className={`flex items-center mt-6 w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-3  ${
                validationErrs.password.valid === false ||
                validationErrs.confirmPassword.valid === false
                  ? 'border-red-500'
                  : 'border-gray-300/60'
              }`}
            >
              <svg
                width='13'
                height='17'
                viewBox='0 0 13 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z'
                  fill='#6B7280'
                />
              </svg>
              <input
                onChange={handleRegistration}
                value={registrationData.password}
                onFocus={() =>
                  setValidationErrs({
                    ...validationErrs,
                    password: {
                      valid: null,
                      error: '',
                    },
                  })
                }
                onBlur={(e) => validateInputs('password', e.target.value)}
                name='password'
                type='password'
                placeholder='Enter Password'
                className='bg-transparent outline-0 text-gray-950 placeholder-gray-500/80 text-sm w-full h-full'
                required
              />
            </div>
            {validationErrs.password.valid === false && (
              <p className='text-red-500 animateInputErr text-fxs'>
                {validationErrs.password.error}
              </p>
            )}
          </div>
          {signUp && (
            <div className='w-full transform duration-500 ease-out'>
              <div
                className={`flex items-center mt-6 w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-3 ${
                  validationErrs.confirmPassword.valid === false
                    ? 'border-red-500'
                    : 'border-gray-300/60'
                }`}
              >
                <svg
                  width='13'
                  height='17'
                  viewBox='0 0 13 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z'
                    fill='#6B7280'
                  />
                </svg>
                <input
                  onChange={(e) => {
                    handleRegistration(e);
                  }}
                  value={registrationData.confirmPassword}
                  onFocus={() =>
                    setValidationErrs({
                      ...validationErrs,
                      confirmPassword: {
                        valid: null,
                        error: '',
                      },
                    })
                  }
                  onBlur={(e) =>
                    validateInputs('confirmPassword', e.target.value)
                  }
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                  className=' outline-0 text-gray-950 placeholder-gray-500/80 text-sm w-full h-full'
                  required
                />
              </div>
              {validationErrs.confirmPassword.valid === false && (
                <p className='text-red-500 animateInputErr text-fxs'>
                  {validationErrs.confirmPassword.error}
                </p>
              )}
            </div>
          )}

          <div className='w-full flex items-center justify-between mt-8 text-gray-500/80'>
            <div className='flex items-center gap-2'>
              <input
                onChange={(e) => {
                  setRegistrationData({
                    ...registrationData,
                    [e.target.name]: e.target.checked,
                  });
                }}
                checked={registrationData.rememberMe}
                name='rememberMe'
                className='h-5'
                type='checkbox'
                id='checkbox'
              />
              <label className='text-sm' htmlFor='checkbox'>
                Remember me for 7 days
              </label>
            </div>
            {!signUp && (
              <Link className='text-sm underline' href='#'>
                Forgot password?
              </Link>
            )}
          </div>

          <button
            type='submit'
            onClick={signUp ? handleSubmit : handleLogin}
            disabled={loading}
            className={` ${
              loading ? 'bg-blue-600/30' : 'bg-blue-600'
            } mt-4 w-full h-10 rounded-full text-white hover:opacity-90 transition-opacity`}
          >
            {loading ? (
              <span className='loader'></span>
            ) : signUp ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </button>
          <h2 className='text-gray-500/90 flex flex-row gap-1 text-sm mt-4'>
            <p>
              {signUp ? 'Already have an account?' : ' Don’t have an account?'}
            </p>
            <Link
              onClick={() => {
                setValidationErrs({
                  email: {
                    valid: null,
                    error: '',
                  },
                  password: {
                    valid: null,
                    error: '',
                  },
                  confirmPassword: {
                    valid: null,
                    error: '',
                  },
                });
                setRegistrationData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                });
              }}
              className='text-blue-500 hover:underline'
              to={signUp ? '/auth/sign-in' : '/auth/sign-up'}
            >
              {signUp ? 'login' : ' Sign up'}
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default Login;
