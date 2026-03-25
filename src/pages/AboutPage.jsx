import React, { useEffect, useRef } from 'react';
import { Heart, Shield, Users, Award, Clock, Target } from 'lucide-react';
import CTA from '@/components/mekinComponents/CTA';
import Footer from '@/components/mekinComponents/Footer';

const AboutPage = () => {
  const stats = [
    {
      number: '500+',
      label: 'Happy Families',
      icon: <Users className='w-8 h-8' />,
    },
    {
      number: '50+',
      label: 'Certified Caregivers',
      icon: <Award className='w-8 h-8' />,
    },
    {
      number: '24/7',
      label: 'Available Support',
      icon: <Clock className='w-8 h-8' />,
    },
    {
      number: '10+',
      label: 'Years Experience',
      icon: <Shield className='w-8 h-8' />,
    },
  ];

  const values = [
    {
      icon: <Heart className='w-10 h-10' />,
      title: 'Compassionate Care',
      description:
        'We treat every client with dignity, respect, and genuine compassion, providing care that goes beyond medical needs to nurture the whole person.',
    },
    {
      icon: <Shield className='w-10 h-10' />,
      title: 'Trust & Safety',
      description:
        'All our caregivers undergo rigorous background checks and continuous training to ensure the highest standards of safety and professionalism in Nairobi.',
    },
    {
      icon: <Target className='w-10 h-10' />,
      title: 'Excellence',
      description:
        'We are committed to delivering exceptional home healthcare services that exceed expectations and improve quality of life for our clients across Kenya.',
    },
    {
      icon: <Users className='w-10 h-10' />,
      title: 'Family-Centered',
      description:
        'We work closely with families to create personalized care plans that address unique needs and promote independence while ensuring peace of mind.',
    },
  ];

  const services = [
    'Nursing Care',
    'Post-Natal Care',
    'Disability Support',
    'Elderly Care',
    'IV Therapy',
    'Speech Therapy',
    'Physiotherapy',
    'Chronic Disease Management',
    'Wound Care',
    'Medication Management',
    'Mobility Assistance',
    'Companionship',
  ];

  const team = [
    {
      name: 'Dr. Sarah Wanjiku',
      role: 'Medical Director',
      image:
        'https://images.unsplash.com/photo-1616291446004-b89a8453561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbnVyc2UlMjBjYXJlZ2l2ZXIlMjBwYXRpZW50fGVufDF8fHx8MTc2ODU3NTkwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credentials: 'MD, Geriatric Care Specialist',
    },
    {
      name: 'James Omondi',
      role: 'Head of Nursing',
      image:
        'https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFsdGhjYXJlJTIwdGVhbXxlbnwxfHx8fDE3Njg1NzU5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credentials: 'RN, BSN, 15+ Years Experience',
    },
    {
      name: 'Grace Muthoni',
      role: 'Senior Physiotherapist',
      image:
        'https://images.unsplash.com/photo-1768508236664-3f294aaf7d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHlzaW90aGVyYXB5JTIwdHJlYXRtZW50JTIwc2Vzc2lvbnxlbnwxfHx8fDE3Njg1NTY3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credentials: 'PT, DPT, Rehab Specialist',
    },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='relative text-black py-4'>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-2xl md:text-3xl font-bold mb-3'>
              About Mekin Home Care
            </h1>
            <p className='text-lg text-blue-950 max-w-3xl mx-auto'>
              Leading home healthcare provider in Nairobi, Kenya. Delivering
              compassionate, professional care to families across the
              metropolitan area since 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white rounded-[0.3em] outline-1 outline-gray-300 py-3 text-center  duration-300'
            >
              <div className='flex justify-center text-blue-600 mb-4'>
                {stat.icon}
              </div>
              <div className='text-3xl font-semibold text-gray-900 mb-2'>
                {stat.number}
              </div>
              <div className='text-gray-600'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
              Our Story
            </h2>
            <div className='space-y-4 text-gray-600'>
              <p>
                Founded in 2015, Mekin Home Care began with a simple mission: to
                provide exceptional home healthcare services that allow Nairobi
                families to care for their loved ones with dignity and comfort
                in their own homes.
              </p>
              <p>
                What started as a small team of dedicated nurses has grown into
                Nairobi's most trusted home care provider, serving hundreds of
                families across Westlands, Kilimani, Karen, Lavington,
                Parklands, and surrounding areas.
              </p>
              <p>
                Today, we offer comprehensive healthcare services including
                nursing care, post-natal support, elderly care, physiotherapy,
                and specialized therapies. Our team of over 50 certified
                caregivers brings years of experience and unwavering commitment
                to every home we serve.
              </p>
              <p>
                We understand that inviting someone into your home requires
                trust. That's why we maintain the highest standards of
                professionalism, conduct thorough background checks, and ensure
                continuous training for all our staff members.
              </p>
            </div>
          </div>
          <div className='relative'>
            <img
              src='https://images.unsplash.com/photo-1654027678170-2f16d4e87787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YW4lMjBoZWFsdGhjYXJlJTIwd29ya2VyJTIwZWxkZXJseXxlbnwxfHx8fDE3Njg1NzU5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              alt='Healthcare worker caring for elderly patient in Nairobi'
              className='rounded-[0.4em] '
            />
            <div className='absolute -bottom-6 bg-blue-600 text-white p-3 rounded-[0.4em] max-w-xs'>
              <p className='font-semibold'>
                "Trusted by over 500 families across Nairobi for quality home
                healthcare."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className='bg-white pt-14'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-2'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
              Our Core Values
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              The principles that guide everything we do at Mekin Home Care
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <div
                key={index}
                className='bg-white rounded-[0.3em] p-4 outline-1 outline-gray-300 transition-shadow duration-300'
              >
                <div className='text-blue-600 mb-4'>{value.icon}</div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
            Comprehensive Care Services
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            From nursing care to specialized therapies, we provide complete home
            healthcare solutions throughout Nairobi
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {services.map((service, index) => (
            <div
              key={index}
              className='bg-linear-to-br from-blue-50 to-white border border-blue-100 text-fsm rounded-lg p-2 text-center cursor-pointer hover:border-blue-600'
            >
              <div className='flex items-center justify-center gap-2'>
                <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                <span className='font-medium text-gray-900'>{service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className='text-gray-950'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-4'>
            <h2 className='text-2xl md:text-3xl font-bold mb-2'>
              Meet Our Leadership Team
            </h2>
            <p className='text-lg text-blue-950 max-w-2xl mx-auto'>
              Experienced healthcare professionals dedicated to your wellbeing
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {team.map((member, index) => (
              <div
                key={index}
                className='bg-white/10 backdrop-blur-sm outline-1 outline-gray-300 rounded-[0.3em] overflow-hidden'
              >
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role} at Mekin Home Care Nairobi`}
                  className='w-full h-64 object-cover'
                />
                <div className='p-3'>
                  <h3 className='text-xl font-bold mb-1'>{member.name}</h3>
                  <p className='text-gray-950 mb-1'>{member.role}</p>
                  <p className='text-sm text-gray-950'>{member.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className=' p-8 md:p-12'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center'>
            Why Families in Nairobi Choose Us
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              'Licensed and certified healthcare professionals',
              'Personalized care plans tailored to individual needs',
              'Thorough background checks for all caregivers',
              'Continuous training and professional development',
              'Available 24/7 for emergencies and support',
              'Affordable rates with flexible payment options',
              'Serving all Nairobi metropolitan areas',
              'Multilingual caregivers (English, Swahili, Kikuyu)',
              'Regular health monitoring and reporting',
              'Compassionate and respectful care approach',
              'Strong track record with 500+ satisfied families',
              'Comprehensive insurance coverage',
            ].map((item, index) => (
              <div key={index} className='flex items-start gap-3'>
                <div className='bg-blue-600 text-white rounded-full p-1 mt-1 shrink-0'>
                  <svg
                    className='w-3 h-3'
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
                <span className='text-gray-700'>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Keywords Section (hidden but helps with SEO) */}
      <div className='sr-only'>
        About Mekin home Care Nairobi, best home care services Kenya,
        professional caregivers Nairobi, home healthcare Westlands, nursing care
        Kilimani, elderly care Karen, post-natal care Lavington, disability
        support Parklands, physiotherapy Nairobi, speech therapy Kenya, IV
        therapy home Nairobi, chronic disease management Kenya, licensed
        caregivers Nairobi, trusted home care provider Kenya, 24/7 healthcare
        support Nairobi, affordable home care Nairobi metropolitan
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
