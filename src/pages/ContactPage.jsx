import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import CTA from '@/components/mekinComponents/CTA';
import Footer from '@/components/mekinComponents/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const contactInfo = [
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Visit Us',
      details: ['Westlands, Nairobi', 'Kenya'],
      link: 'https://maps.google.com',
    },
    {
      icon: <Phone className='w-6 h-6' />,
      title: 'Call Us',
      details: ['+254 700 123 456', '+254 733 456 789'],
      link: 'tel:+254700123456',
    },
    {
      icon: <Mail className='w-6 h-6' />,
      title: 'Email Us',
      details: ['info@mekinhomecare.co.ke', 'support@mekinhomecare.co.ke'],
      link: 'mailto:info@mekinhomecare.co.ke',
    },
    {
      icon: <Clock className='w-6 h-6' />,
      title: 'Working Hours',
      details: ['24/7 Emergency Care', 'Mon-Sun: Always Available'],
      link: null,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    setStatus('Thank you! We will contact you within 24 hours.');
    setTimeout(() => setStatus(''), 5000);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className=' text-gray-950 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-center mb-4'>
            Get In Touch With Us
          </h1>
          <p className='text-lg text-center text-blue-950 max-w-2xl mx-auto'>
            Quality home healthcare services in Nairobi. We're here to support
            you and your loved ones 24/7.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-[0.5em] outline-1 outline-gray-300 p-4 duration-300 border-t-4 border-blue-600'
            >
              <div className='flex justify-center mb-4'>
                <div className='bg-blue-100 text-blue-600 p-4 rounded-full'>
                  {item.icon}
                </div>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 text-center mb-3'>
                {item.title}
              </h3>
              {item.details.map((detail, idx) => (
                <p key={idx} className='text-gray-600 text-center text-sm mb-1'>
                  {item.link && idx === 0 ? (
                    <a
                      href={item.link}
                      className='hover:text-blue-600 transition-colors'
                    >
                      {detail}
                    </a>
                  ) : (
                    detail
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6'>
          {/* Contact Form */}
          <div className='bg-white rounded-[0.5em]'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Send Us a Message
            </h2>
            <p className='text-gray-600 mb-3'>
              Fill out the form below and our team will get back to you
              promptly. For emergencies, please call us directly.
            </p>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Full Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all'
                  placeholder='John Doe'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Email Address *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all'
                    placeholder='john@example.com'
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Phone Number *
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all'
                    placeholder='+254 700 000 000'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='service'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Service Interested In
                </label>
                <select
                  id='service'
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all'
                >
                  <option value=''>Select a service</option>
                  <option value='nursing-care'>Nursing Care</option>
                  <option value='post-natal-care'>Post-Natal Care</option>
                  <option value='disability-support'>Disability Support</option>
                  <option value='elderly-care'>Elderly Care</option>
                  <option value='iv-therapy'>IV Therapy</option>
                  <option value='speech-therapy'>Speech Therapy</option>
                  <option value='physiotherapy'>Physiotherapy</option>
                  <option value='chronic-disease'>
                    Chronic Disease Management
                  </option>
                  <option value='other'>Other Services</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Message *
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows='5'
                  className='w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none'
                  placeholder='Tell us about your care needs...'
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-[0.3em] hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 font-semibold'
              >
                <Send className='w-5 h-5' />
                Send Message
              </button>

              {status && (
                <div className='bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg'>
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className='space-y-6'>
            {/* Google Map Placeholder */}
            <div className='bg-white rounded-[0.5em] p-4 overflow-hidden'>
              <div className='bg-gray-200 h-60 flex items-center justify-center'>
                <img
                  src='https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlyb2JpJTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzY4NTc1OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                  alt='Nairobi City - Mekin home Care Location'
                  className='w-full h-60 object-cover'
                />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Our Location in Nairobi
                </h3>
                <p className='text-gray-600'>
                  Conveniently located in Westlands, we serve all areas across
                  Nairobi Metropolitan including Kilimani, Karen, Lavington,
                  Parklands, and surrounding regions.
                </p>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className='bg-linear-to-br from-blue-600 to-blue-700 rounded-[0.5em] p-4 text-white'>
              <h3 className='text-2xl font-bold'>
                Why Choose Mekin Home Care?
              </h3>
              <ul className='space-y-2'>
                <li className='flex items-start gap-3'>
                  <div className='bg-white/20 rounded-full p-1 mt-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span>Licensed and certified caregivers in Nairobi</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='bg-white/20 rounded-full p-1 mt-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span>24/7 emergency response and support</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='bg-white/20 rounded-full p-1 mt-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span>Personalized care plans for your needs</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='bg-white/20 rounded-full p-1 mt-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span>Affordable rates with flexible payment options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Keywords Section (hidden but helps with SEO) */}
      <div className='sr-only'>
        Home care services in Nairobi, nursing care Nairobi, elderly care
        services Kenya, post-natal care Nairobi, disability support Nairobi,
        physiotherapy home services Nairobi, speech therapy Nairobi, IV therapy
        at home Kenya, chronic disease management Nairobi, home healthcare
        Westlands, professional caregivers Nairobi, 24/7 home care Kenya
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
