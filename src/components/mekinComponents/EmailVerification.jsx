import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { getUserEmail, verifyUser } from '@/APIs/User';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import axios from 'axios';

export default function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);
  const params = useParams();
  const [emailData, setEmailData] = useState(null);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (params?.cryptography) {
      getUserEmail(params.cryptography)
        .then((res) => setEmailData(res))
        .catch((e) => {
          setEmailData(e);
        });
    }
  }, []);
  // Start resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      setError('');
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    verifyUser(params.cryptography, verificationCode)
      .then((res) => {
        toast.success(res?.data?.message);
        setIsVerifying(false);
        setIsVerified(true);
        setTimeout(() => {
          navigateTo('/patient-dashboard');
        }, 4000);
      })
      .catch((e) => {
        if (
          e.response.data.message ===
          'The verification code you entered is incorect.'
        ) {
          toast.error(e.response.data.message);
          setError('Invalid verification code');
        } else {
          toast.error(e.response.data.message);
        }
        setIsVerifying(false);
      });
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    // Simulate resending code
    setResendTimer(60);
    setCode(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  if (isVerified) {
    return (
      <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center'>
            <div className='w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6'>
              <CheckCircle className='w-10 h-10 md:w-12 md:h-12 text-green-600' />
            </div>
            <h2 className='text-xl md:text-2xl mb-2'>Email Verified!</h2>
            <p className='text-sm md:text-base text-gray-600 mb-6'>
              Your email has been successfully verified. Redirecting to your
              dashboard...
            </p>
            <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <Toaster />
      {/* SEO Meta Tags */}
      <title>Verify Email - Mekin Home Care Registration</title>
      <meta
        name='description'
        content='Verify your email address to complete your Mekin Home Care registration'
      />

      <div className='w-full max-w-md'>
        {/* Logo/Branding */}
        <div className='text-center mb-2 md:mb-4'>
          <div className='inline-block'>
            <h1 className='text-2xl md:text-3xl text-blue-600 mb-1'>
              Mekin Home Care
            </h1>
            <p className='text-xs md:text-sm text-gray-600'>
              Quality Care at Your Doorstep
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
          {/* Back Button */}
          <button
            onClick={() => navigateTo('/auth/sign-up')}
            className='flex items-center gap-2 hover:underline hover:text-blue-600 text-gray-600 mb-4 text-sm md:text-base transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to registration
          </button>

          {/* Icon */}
          <div className='w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6'>
            <Mail className='w-7 h-7 md:w-8 md:h-8 text-blue-600' />
          </div>

          {/* Title and Description */}
          <h2 className='text-xl md:text-2xl text-center mb-2'>
            Verify Your Email
          </h2>
          <p className='text-sm md:text-base text-gray-600 text-center mb-2 md:mb-4'>
            We've sent a 6-digit verification code to
            <br />
            <span className='font-medium text-gray-800'>
              {emailData?.data?.email}
            </span>
          </p>

          {/* Code Input */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-3 text-center'>
              Enter verification code
            </label>
            <div className='flex flex-row items-center gap-1 md:gap-4 justify-center'>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`
                    w-12 h-14 md:w-11 md:h-13 text-center text-lg md:text-xl font-semibold
                    border rounded-lg transition-all
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                    ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                    ${digit ? 'border-blue-500 bg-blue-50' : ''}
                  `}
                  disabled={isVerifying}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          <div className='w-full flex flex-col items-center justify-center'>
            {error && (
              <div className='mb-2 py-1 w-3/4 select-none bg-red-50 border border-red-200 rounded-[0.5em]'>
                <p className='text-sm text-red-600 text-center'>{error}</p>
              </div>
            )}
          </div>

          {/* Verify Button */}
          <div className='w-full flex  flex-col items-center justify-center'>
            <button
              onClick={handleVerify}
              disabled={isVerifying || code.join('').length !== 6}
              className={`
              w-[85%] py-2.5  rounded-lg font-medium text-sm md:text-base
              transition-all duration-200 flex items-center justify-center gap-2
              ${
                isVerifying || code.join('').length !== 6
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }
            `}
            >
              {isVerifying ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </div>

          {/* Resend Code */}
          <div className='mt-3 text-center'>
            <p className='text-sm text-gray-600 mb-2'>
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              className={`
               group text-sm md:text-base font-medium inline-flex items-center gap-2
                transition-colors
                ${
                  resendTimer > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700'
                }
              `}
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  resendTimer > 0
                    ? ''
                    : ' group-hover:rotate-180 transition-transform duration-500'
                }`}
              />
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </button>
          </div>

          {/* Help Text */}
          <div className='mt-2 pt-2 border-t border-gray-200'>
            <p className='text-xs md:text-sm text-gray-500 text-center'>
              Having trouble? Contact us at{' '}
              <a
                href='mailto:support@mekinhomecare.co.ke'
                className='text-blue-600 hover:underline'
              >
                support@mekinhomecare.co.ke
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-2 text-center'>
          <p className='text-xs md:text-sm text-gray-600'>
            Check your spam folder if you don't see the email
          </p>
        </div>
      </div>
    </div>
  );
}
