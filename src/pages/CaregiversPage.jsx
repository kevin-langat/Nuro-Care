import React from 'react';
import {
  Shield,
  Award,
  Heart,
  CheckCircle,
  Star,
  GraduationCap,
  Users,
  Clock,
  FileCheck,
} from 'lucide-react';
import Footer from '@/components/mekinComponents/Footer';

// Example caregivers data structure - Replace with API fetch
export const CAREGIVERS_DATA = [
  {
    id: 1,
    name: 'Mary Wanjiku Kamau',
    role: 'Senior Registered Nurse',
    specialization: 'Elderly Care & Chronic Disease Management',
    experience: '12 years',
    languages: ['English', 'Swahili', 'Kikuyu'],
    certifications: [
      'Registered Nurse License (Kenya)',
      'Advanced Cardiac Life Support (ACLS)',
      'Geriatric Care Specialist',
      'Diabetes Management Certification',
    ],
    education: 'BSc Nursing - University of Nairobi',
    image:
      'https://images.unsplash.com/photo-1616291446004-b89a8453561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbnVyc2UlMjBjYXJlZ2l2ZXIlMjBwYXRpZW50fGVufDF8fHx8MTc2ODU3NTkwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    certificateImage:
      'https://images.unsplash.com/photo-1613825787302-22acac0de2fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBkaXBsb21hfGVufDF8fHx8MTc2ODU3NTkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 87,
    verified: true,
    backgroundCheck: true,
    bio: 'Mary has dedicated over a decade to providing compassionate care to elderly patients in Nairobi. She specializes in managing chronic conditions like diabetes and hypertension with a patient-centered approach.',
  },
  {
    id: 2,
    name: 'James Odhiambo Otieno',
    role: 'Certified Physiotherapist',
    specialization: 'Rehabilitation & Mobility Support',
    experience: '8 years',
    languages: ['English', 'Swahili', 'Luo'],
    certifications: [
      'Licensed Physiotherapist (Kenya)',
      'Orthopedic Rehabilitation Specialist',
      'Neurological Physiotherapy',
      'Manual Therapy Certification',
    ],
    education: 'Bachelor of Physiotherapy - Kenyatta University',
    image:
      'https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFsdGhjYXJlJTIwdGVhbXxlbnwxfHx8fDE3Njg1NzU5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    certificateImage:
      'https://images.unsplash.com/photo-1613825787302-22acac0de2fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBkaXBsb21hfGVufDF8fHx8MTc2ODU3NTkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviews: 62,
    verified: true,
    backgroundCheck: true,
    bio: 'James brings expertise in post-surgery rehabilitation and helps patients regain mobility and independence through personalized physiotherapy programs at home.',
  },
  {
    id: 3,
    name: 'Grace Njeri Mwangi',
    role: 'Post-Natal Care Specialist',
    specialization: 'Maternal & Newborn Care',
    experience: '10 years',
    languages: ['English', 'Swahili', 'Kikuyu'],
    certifications: [
      'Registered Midwife License (Kenya)',
      'Neonatal Resuscitation Certification',
      'Lactation Consultant Certification',
      'Post-Natal Care Specialist',
    ],
    education: 'Diploma in Midwifery - Kenya Medical Training College',
    image:
      'https://images.unsplash.com/photo-1509099342178-e323b1717dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbW90aGVyJTIwbmV3Ym9ybiUyMGJhYnl8ZW58MXx8fHwxNzY4NTc1OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    certificateImage:
      'https://images.unsplash.com/photo-1613825787302-22acac0de2fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBkaXBsb21hfGVufDF8fHx8MTc2ODU3NTkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 94,
    verified: true,
    backgroundCheck: true,
    bio: 'Grace has supported hundreds of new mothers in Nairobi with expert post-natal care, breastfeeding support, and newborn care. Her gentle approach brings comfort to families.',
  },
  {
    id: 4,
    name: 'Peter Kimani Maina',
    role: 'Disability Support Specialist',
    specialization: 'Special Needs Care & Assistance',
    experience: '7 years',
    languages: ['English', 'Swahili', 'Kikuyu', 'Kamba'],
    certifications: [
      'Certified Nursing Assistant (CNA)',
      'Disability Care Specialist',
      'First Aid & CPR Certified',
      'Behavioral Support Certification',
    ],
    education:
      'Certificate in Disability Care - Kenya Institute of Special Education',
    image:
      'https://images.unsplash.com/photo-1654027678170-2f16d4e87787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YW4lMjBoZWFsdGhjYXJlJTIwd29ya2VyJTIwZWxkZXJseXxlbnwxfHx8fDE3Njg1NzU5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    certificateImage:
      'https://images.unsplash.com/photo-1613825787302-22acac0de2fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBkaXBsb21hfGVufDF8fHx8MTc2ODU3NTkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 53,
    verified: true,
    backgroundCheck: true,
    bio: "Peter is passionate about empowering individuals with disabilities to live independently. He provides compassionate, dignified care tailored to each person's unique needs.",
  },
  {
    id: 5,
    name: 'Sarah Akinyi Ouma',
    role: 'Home Healthcare Nurse',
    specialization: 'IV Therapy & Wound Care',
    experience: '9 years',
    languages: ['English', 'Swahili', 'Luo'],
    certifications: [
      'Registered Nurse License (Kenya)',
      'IV Therapy Certification',
      'Wound Care Specialist',
      'Infection Control Certification',
    ],
    education:
      "Diploma in Nursing - Nairobi Women's Hospital School of Nursing",
    image:
      'https://images.unsplash.com/photo-1708461859488-2a0c081ff826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMGhlbHBpbmclMjBlbGRlcmx5JTIwcGF0aWVudHxlbnwxfHx8fDE3Njg1NzU5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    certificateImage:
      'https://images.unsplash.com/photo-1613825787302-22acac0de2fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBkaXBsb21hfGVufDF8fHx8MTc2ODU3NTkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 71,
    verified: true,
    backgroundCheck: true,
    bio: 'Sarah excels in providing skilled nursing care at home, specializing in IV therapy and complex wound management for patients across Nairobi.',
  },
];

const CaregiversPage = () => {
  const trustFactors = [
    {
      icon: <Shield className='w-8 h-8' />,
      title: 'Comprehensive Background Checks',
      description:
        'Every caregiver undergoes thorough criminal background checks, reference verification, and identity validation before joining our team in Nairobi.',
    },
    {
      icon: <Award className='w-8 h-8' />,
      title: 'Licensed & Certified Professionals',
      description:
        'All caregivers hold valid licenses from the Nursing Council of Kenya and relevant professional certifications in their specializations.',
    },
    {
      icon: <GraduationCap className='w-8 h-8' />,
      title: 'Continuous Training & Development',
      description:
        'Our caregivers participate in regular training programs to stay updated with the latest healthcare practices and standards in Kenya.',
    },
    {
      icon: <Heart className='w-8 h-8' />,
      title: 'Compassionate & Patient-Centered',
      description:
        'We select caregivers not just for their skills, but for their genuine compassion, patience, and commitment to dignified care.',
    },
    {
      icon: <FileCheck className='w-8 h-8' />,
      title: 'Insured & Bonded',
      description:
        'All our caregivers are fully insured and bonded, providing you complete peace of mind when inviting them into your Nairobi home.',
    },
    {
      icon: <Clock className='w-8 h-8' />,
      title: 'Reliable & Punctual',
      description:
        'Our caregivers are committed to punctuality and reliability, ensuring consistent, high-quality care for your loved ones every day.',
    },
  ];

  const vettingProcess = [
    {
      step: 1,
      title: 'Application & Resume Review',
      description:
        'We carefully review qualifications, experience, and credentials of every applicant.',
    },
    {
      step: 2,
      title: 'Comprehensive Interviews',
      description:
        'Multiple rounds of interviews assess both technical skills and personal values.',
    },
    {
      step: 3,
      title: 'License & Certification Verification',
      description:
        'We verify all professional licenses and certifications with relevant Kenya authorities.',
    },
    {
      step: 4,
      title: 'Background & Reference Checks',
      description:
        'Thorough criminal background checks and professional reference verification.',
    },
    {
      step: 5,
      title: 'Skills Assessment & Testing',
      description:
        'Practical tests and scenarios to evaluate clinical competence and problem-solving.',
    },
    {
      step: 6,
      title: 'Orientation & Training',
      description:
        'Comprehensive onboarding program covering our standards, protocols, and best practices.',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='relative text-gray-950 py-4'>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-2xl md:text-3xl font-bold mb-2'>
              Meet Our Trusted Professional Caregivers
            </h1>
            <p className='text-lg text-gray-950 max-w-3xl mx-auto mb-4'>
              Highly qualified, licensed, and compassionate healthcare
              professionals serving families across Nairobi with excellence and
              dedication
            </p>
            <div className='flex flex-wrap justify-center gap-6 text-lg'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5 stroke-blue-600' />
                <span>Licensed & Certified</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5 stroke-blue-600' />
                <span>Background Checked</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5 stroke-blue-600' />
                <span>Insured & Bonded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div id='quality-assurance' className='bg-white py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap justify-center items-center gap-8 text-center'>
            <div>
              <div className='text-3xl font-bold text-blue-600'>100%</div>
              <div className='text-gray-600'>Background Verified</div>
            </div>
            <div className='w-px h-12 bg-blue-200 hidden md:block'></div>
            <div>
              <div className='text-3xl font-bold text-blue-600'>50+</div>
              <div className='text-gray-600'>Licensed Caregivers</div>
            </div>
            <div className='w-px h-12 bg-blue-200 hidden md:block'></div>
            <div>
              <div className='text-3xl font-bold text-blue-600'>500+</div>
              <div className='text-gray-600'>Families Trust Us</div>
            </div>
            <div className='w-px h-12 bg-blue-200 hidden md:block'></div>
            <div>
              <div className='text-3xl font-bold text-blue-600'>4.9/5</div>
              <div className='text-gray-600'>Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Trust Our Caregivers */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
            Why Families in Nairobi Trust Our Caregivers
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            We maintain the highest standards in caregiver selection, training,
            and ongoing support to ensure your loved ones receive exceptional,
            reliable care
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {trustFactors.map((factor, index) => (
            <div
              key={index}
              className='bg-linear-to-br from-white to-blue-50 outline-1 outline-gray-200 rounded-[0.5em] p-8 transition-all duration-300'
            >
              <div className='text-blue-600 mb-4'>{factor.icon}</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {factor.title}
              </h3>
              <p className='text-gray-600'>{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Caregivers */}
      <div className='bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
              Our Professional Caregiver Team
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Experienced, certified healthcare professionals dedicated to
              providing the highest quality home care services in Nairobi
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {CAREGIVERS_DATA.map((caregiver) => (
              <div
                key={caregiver.id}
                className='bg-white rounded-[0.5em] overflow-hidden outline-1 outline-gray-200 hover:outline-gray-300 transition-all duration-300 group'
              >
                {/* Caregiver Image */}
                <div className='relative h-72 overflow-hidden'>
                  <img
                    src={caregiver.image}
                    alt={`${caregiver.name} - Professional ${caregiver.role} in Nairobi`}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  {caregiver.verified && (
                    <div className='absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1'>
                      <CheckCircle className='w-4 h-4' />
                      Verified
                    </div>
                  )}
                  {caregiver.backgroundCheck && (
                    <div className='absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1'>
                      <Shield className='w-4 h-4' />
                      Background Checked
                    </div>
                  )}
                </div>

                <div className='p-6'>
                  {/* Name & Role */}
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>
                    {caregiver.name}
                  </h3>
                  <p className='text-blue-600 font-medium mb-2'>
                    {caregiver.role}
                  </p>

                  {/* Rating */}
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(caregiver.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-sm font-medium text-gray-700'>
                      {caregiver.rating} ({caregiver.reviews} reviews)
                    </span>
                  </div>

                  {/* Specialization */}
                  <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-1'>
                      Specialization:
                    </p>
                    <p className='text-gray-600'>{caregiver.specialization}</p>
                  </div>

                  {/* Experience */}
                  <div className='flex items-center gap-2 mb-4 text-sm text-gray-600'>
                    <Clock className='w-4 h-4 text-blue-600' />
                    <span>{caregiver.experience} of experience</span>
                  </div>

                  {/* Languages */}
                  <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>
                      Languages:
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {caregiver.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium'
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                    {caregiver.bio}
                  </p>

                  {/* Education */}
                  <div className='mb-4 pb-4 border-b border-gray-100'>
                    <div className='flex items-start gap-2 text-sm'>
                      <GraduationCap className='w-4 h-4 text-blue-600 mt-0.5 shrink-0' />
                      <div>
                        <p className='font-medium text-gray-700'>Education</p>
                        <p className='text-gray-600'>{caregiver.education}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div id='certification' className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                      <Award className='w-4 h-4 text-blue-600' />
                      Certifications:
                    </p>
                    <ul className='space-y-1'>
                      {caregiver.certifications.slice(0, 3).map((cert, idx) => (
                        <li
                          key={idx}
                          className='flex items-start gap-2 text-sm text-gray-600'
                        >
                          <CheckCircle className='w-3 h-3 text-green-600 mt-1 shrink-0' />
                          <span>{cert}</span>
                        </li>
                      ))}
                      {caregiver.certifications.length > 3 && (
                        <li className='text-sm text-blue-600 font-medium'>
                          +{caregiver.certifications.length - 3} more
                          certifications
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Certificate Image */}
                  <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>
                      Professional License:
                    </p>
                    <div className='relative h-32 rounded-lg overflow-hidden border border-gray-200'>
                      <img
                        src={caregiver.certificateImage}
                        alt={`${caregiver.name} professional certificate - Licensed caregiver in Kenya`}
                        className='w-full h-full object-cover'
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-3'>
                        <span className='text-white text-xs font-medium'>
                          Verified License
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className='w-full bg-blue-600 text-white py-1 rounded-[0.2em] font-semibold hover:bg-blue-700 transition-colors'>
                    Request {caregiver.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Vetting Process */}
      <div
        id='vetting-process'
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14'
      >
        <div className='text-center mb-6'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
            Our Rigorous 6-Step Vetting Process
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Every caregiver goes through extensive screening to ensure they meet
            our high standards for professionalism, competence, and
            trustworthiness in Nairobi
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {vettingProcess.map((item, index) => (
            <div key={index} className='relative'>
              <div className='bg-white outline-1 outline-gray-200 rounded-[0.5em] p-4 hover:outline-gray-300 cursor-pointer transition-all duration-300 h-full'>
                <div className='flex items-start gap-4 mb-4'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0'>
                    {item.step}
                  </div>
                  <div>
                    <h3 className='text-fmds font-bold text-gray-900 mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-gray-600'>{item.description}</p>
                  </div>
                </div>
              </div>
              {index < vettingProcess.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200'></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className='bg-white text-gray-950 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold mb-2'>
              What Nairobi Families Say About Our Caregivers
            </h2>
            <p className='text-lg text-gray-950 max-w-2xl mx-auto'>
              Real testimonials from families who trust our caregivers
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                name: 'Margaret Nduta',
                location: 'Westlands, Nairobi',
                text: "Mary has been a blessing to our family. Her care for my elderly mother is exceptional - professional, compassionate, and always reliable. We couldn't ask for better care in Nairobi.",
                rating: 5,
              },
              {
                name: 'David Kimani',
                location: 'Karen, Nairobi',
                text: 'James helped my father regain his mobility after surgery. His expertise in physiotherapy and patient approach made a huge difference. Highly recommend Mekin Home Care!',
                rating: 5,
              },
              {
                name: 'Susan Wangari',
                location: 'Kilimani, Nairobi',
                text: 'Grace supported me through my post-natal recovery with incredible care and knowledge. She made those first weeks with my newborn so much easier. Forever grateful!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className='bg-white/10 outline-1 outline-gray-200 backdrop-blur-sm rounded-[0.5em] p-3'
              >
                <div className='flex items-center gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>
                <p className='text-blue-950 mb-6 italic'>
                  "{testimonial.text}"
                </p>
                <div>
                  <p className='font-bold'>{testimonial.name}</p>
                  <p className='text-sm text-blue-800'>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
          Ready to Meet Your Perfect Caregiver?
        </h2>
        <p className='text-lg text-gray-600 mb-3'>
          Book a consultation today and we'll match you with the ideal caregiver
          for your family's unique needs in Nairobi
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='px-4 py-1 bg-blue-600 text-white rounded-[0.3em] font-semibold text-lg transition-colors'>
            Book a Consultation
          </button>
          <button className='px-4 py-1 outline-2 outline-blue-600 text-blue-600 rounded-[0.3em] hover:bg-blue-100 transition-colors'>
            Call Us: +254 700 123 456
          </button>
        </div>
      </div>

      {/* SEO Keywords Section- hidden */}
      <div className='sr-only'>
        Professional caregivers Nairobi Kenya, licensed nurses Nairobi,
        certified home care workers Kenya, trusted caregivers Westlands,
        experienced elderly care nurses Nairobi, post-natal care specialists
        Kenya, physiotherapists home care Nairobi, disability support caregivers
        Kenya, background checked nurses Nairobi, insured caregivers Kenya,
        registered nurses Nairobi home care, qualified healthcare workers Kenya,
        compassionate caregivers Nairobi, reliable home care nurses Kenya,
        certified nursing assistants Nairobi, home healthcare professionals
        Kilimani Karen Lavington Parklands, licensed midwives Nairobi,
        experienced physiotherapists Kenya, speech therapists Nairobi, IV
        therapy nurses Kenya, chronic disease care specialists Nairobi, vetted
        caregivers Kenya, professional home care staff Nairobi
      </div>

      <Footer />
    </div>
  );
};

export default CaregiversPage;
