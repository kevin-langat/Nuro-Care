import { createNewAppointment } from '@/APIs/Appointments';
import { Toaster } from '@/components/ui/sonner';
import { globalState } from '@/context/GlobalContext';
import { CheckCircle, FileText, User } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
function PatientDashBookAppointment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',

    // Location Information
    county: 'Nairobi',
    area: '',
    address: '',
    landmark: '',

    // Service Details
    serviceType: '',
    serviceCategory: '',
    urgency: 'routine',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',

    // Patient Information
    patientName: '',
    patientAge: '',
    patientGender: '',
    relationship: '',

    // Medical Details
    medicalCondition: '',
    medications: '',
    allergies: '',
    mobility: '',
    specialRequirements: '',

    // Caregiver Preferences
    caregiverGender: 'no-preference',
    languagePreference: [],
    experienceLevel: '',

    // Service Duration
    serviceDuration: '',
    hoursPerDay: '',
    daysPerWeek: '',

    // Additional Information
    additionalNotes: '',
    howDidYouHear: '',

    // Terms
    termsAccepted: false,

    // Metadata for analytics
    submittedAt: '',
    source: 'website',
    deviceType:
      typeof window !== 'undefined'
        ? window.innerWidth < 768
          ? 'mobile'
          : 'desktop'
        : 'desktop',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const { authRes } = useContext(globalState);

  const nairobiAreas = [
    'Westlands',
    'Kilimani',
    'Karen',
    'Lavington',
    'Parklands',
    'Kileleshwa',
    'Spring Valley',
    'Muthaiga',
    'Runda',
    'Rosslyn',
    'Gigiri',
    'Kitisuru',
    'Upperhill',
    'Riverside',
    'Hurlingham',
    'South B',
    'South C',
    'Langata',
    'Ngong Road',
    'Dagoretti',
    'Kasarani',
    'Roysambu',
    'Thika Road',
    'Other',
  ];

  const serviceTypes = [
    { value: 'nursing-care', label: 'Nursing Care', category: 'Medical' },
    {
      value: 'post-natal-care',
      label: 'Post-Natal Care',
      category: 'Maternal',
    },
    {
      value: 'disability-support',
      label: 'Disability Support',
      category: 'Special Needs',
    },
    { value: 'elderly-care', label: 'Elderly Care', category: 'Senior Care' },
    { value: 'iv-therapy', label: 'IV Therapy', category: 'Medical' },
    { value: 'speech-therapy', label: 'Speech Therapy', category: 'Therapy' },
    { value: 'physiotherapy', label: 'Physiotherapy', category: 'Therapy' },
    {
      value: 'chronic-disease',
      label: 'Chronic Disease Management',
      category: 'Medical',
    },
    { value: 'wound-care', label: 'Wound Care', category: 'Medical' },
    { value: 'companionship', label: 'Companionship', category: 'Support' },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      email: authRes?.personalInfo?.email,
    });
  }, []);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleLanguageChange = (language) => {
    const languages = bookingData.languagePreference;
    const newLanguages = languages.includes(language)
      ? languages.filter((l) => l !== language)
      : [...languages, language];

    setBookingData({
      ...bookingData,
      languagePreference: newLanguages,
    });
  };

  const newErrors = {};
  const validateStep = (step) => {
    if (step === 1) {
      if (!bookingData.fullName) newErrors.fullName = 'Full name is required';
      if (!bookingData.phone) newErrors.phone = 'Phone number is required';
      if (!bookingData.area) newErrors.area = 'Area is required';
      if (!bookingData.address) newErrors.address = 'Address is required';
    }

    if (step === 2) {
      if (!bookingData.serviceType)
        newErrors.serviceType = 'Service type is required';
      if (!bookingData.preferredDate)
        newErrors.preferredDate = 'Preferred date is required';
      if (!bookingData.preferredTime)
        newErrors.preferredTime = 'Preferred time is required';
      if (!bookingData.serviceDuration)
        newErrors.serviceDuration = 'Service duration is required';
    }

    if (step === 3) {
      if (!bookingData.patientName)
        newErrors.patientName = 'Patient name is required';
      if (!bookingData.patientAge)
        newErrors.patientAge = 'Patient age is required';
      if (!bookingData.patientGender)
        newErrors.patientGender = 'Patient gender is required';
      if (!bookingData.relationship)
        newErrors.relationship = 'Relationship is required';
    }

    if (step === 4) {
      if (!bookingData.termsAccepted)
        newErrors.termsAccepted = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please fix the errors');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) {
      toast.error('Please fix the errors');
      return;
    }

    const submissionData = {
      ...bookingData,
      submittedAt: new Date().toISOString(),
    };

    try {
      console.log('Booking Data for Backend:', submissionData);
      createNewAppointment(submissionData)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
      setSubmitStatus('success');
      setCurrentStep(5);
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Booking submission error', error);
    }
  };

  const steps = [
    { number: 1, title: 'Contact & Location' },
    { number: 2, title: 'Service Details' },
    { number: 3, title: 'Patient Information' },
    { number: 4, title: 'Review & Confirm' },
  ];
  return (
    <div>
      <div className='overflow-hidden'>
        <Toaster />

        {/* Progress Steps */}
        {currentStep !== 5 ? (
          <div className=' p-2 mb-2'>
            <div className='flex flex-row items-center justify-between'>
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold transition-colors ${
                        currentStep >= step.number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className='w-4 h-4' />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium hidden md:block ${
                        currentStep >= step.number
                          ? 'text-blue-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 rounded-full mb-3 h-1 mx-2 transition-colors ${
                        currentStep > step.number
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className='bg-white p-3 mb-8'>
            {/* Step 1: Contact & Location */}
            {currentStep === 1 && (
              <div className='space-y-3'>
                <h2 className='text-xl text-center font-bold text-gray-900 mb-3'>
                  Contact & Location Information
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      name='fullName'
                      value={bookingData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='John Doe'
                    />
                    {errors.fullName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number *
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                      }}
                      maxLength={10}
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='0712 345 678'
                    />
                    {errors.phone && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Alternate Phone (Optional)
                    </label>
                    <input
                      type='tel'
                      name='alternatePhone'
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                      }}
                      maxLength={10}
                      value={bookingData.alternatePhone}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-[0.4em] focus:ring-1 focus:ring-blue-600'
                      placeholder='0712 345 678'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Area in Nairobi *
                    </label>
                    <select
                      name='area'
                      value={bookingData.area}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.area ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value=''>Select your area</option>
                      {nairobiAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <p className='text-red-500 text-sm mt-1'>{errors.area}</p>
                    )}
                  </div>

                  <div className='md:col-span-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Street Address *
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={bookingData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='123 Main Street, Building Name, Apt/House No.'
                    />
                    {errors.address && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Landmark (Optional)
                    </label>
                    <input
                      type='text'
                      name='landmark'
                      value={bookingData.landmark}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600'
                      placeholder='Near Sarit Centre, opposite ABC Bank'
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className='space-y-6'>
                <h2 className='text-xl text-center font-bold text-gray-900 mb-3'>
                  Service Details
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Type of Service Required *
                    </label>
                    <select
                      name='serviceType'
                      value={bookingData.serviceType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.serviceType
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value=''>Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label} ({service.category})
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Urgency Level *
                    </label>
                    <select
                      name='urgency'
                      value={bookingData.urgency}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600'
                    >
                      <option value='routine'>Routine (7+ days)</option>
                      <option value='soon'>Soon (3-7 days)</option>
                      <option value='urgent'>Urgent (1-2 days)</option>
                      <option value='emergency'>Emergency (Same day)</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Service Duration *
                    </label>
                    <select
                      name='serviceDuration'
                      value={bookingData.serviceDuration}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.serviceDuration
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value=''>Select duration</option>
                      <option value='one-time'>One-time visit</option>
                      <option value='short-term'>Short-term (1-4 weeks)</option>
                      <option value='medium-term'>
                        Medium-term (1-3 months)
                      </option>
                      <option value='long-term'>Long-term (3+ months)</option>
                      <option value='ongoing'>Ongoing/Permanent</option>
                    </select>
                    {errors.serviceDuration && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.serviceDuration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Preferred Start Date *
                    </label>
                    <input
                      type='date'
                      name='preferredDate'
                      value={bookingData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.preferredDate
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Preferred Time *
                    </label>
                    <select
                      name='preferredTime'
                      value={bookingData.preferredTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.preferredTime
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value=''>Select time</option>
                      <option value='morning'>Morning (6AM - 12PM)</option>
                      <option value='afternoon'>Afternoon (12PM - 6PM)</option>
                      <option value='evening'>Evening (6PM - 10PM)</option>
                      <option value='night'>Night (10PM - 6AM)</option>
                      <option value='flexible'>Flexible</option>
                    </select>
                    {errors.preferredTime && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.preferredTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Hours Per Day
                    </label>
                    <select
                      name='hoursPerDay'
                      value={bookingData.hoursPerDay}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600'
                    >
                      <option value=''>Select hours</option>
                      <option value='2-4'>2-4 hours</option>
                      <option value='4-8'>4-8 hours</option>
                      <option value='8-12'>8-12 hours</option>
                      <option value='12-24'>12-24 hours</option>
                      <option value='24'>24 hours (Live-in)</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Days Per Week
                    </label>
                    <select
                      name='daysPerWeek'
                      value={bookingData.daysPerWeek}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-[0.4em] focus:ring-1 focus:ring-blue-600'
                    >
                      <option value=''>Select days</option>
                      <option value='1-2'>1-2 days</option>
                      <option value='3-4'>3-4 days</option>
                      <option value='5-6'>5-6 days</option>
                      <option value='7'>7 days (Daily)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Patient Information */}
            {currentStep === 3 && (
              <div className='space-y-4'>
                <h2 className='text-2xl text-center font-bold text-gray-900 mb-4'>
                  Patient Information
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='md:col-span-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Patient's Full Name *
                    </label>
                    <input
                      type='text'
                      name='patientName'
                      value={bookingData.patientName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                        errors.patientName
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="Patient's name"
                    />
                    {errors.patientName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.patientName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Patient's Age *
                    </label>
                    <input
                      type='number'
                      name='patientAge'
                      value={bookingData.patientAge}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 focus:outline-none border rounded-[0.4em] focus:ring-1 focus:ring-blue-600 ${
                        errors.patientAge ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='Age'
                      min='0'
                    />
                    {errors.patientAge && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.patientAge}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Patient's Gender *
                    </label>
                    <select
                      name='patientGender'
                      value={bookingData.patientGender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.patientGender
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value=''>Select gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </select>
                    {errors.patientGender && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.patientGender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Your Relationship to Patient *
                    </label>
                    <select
                      name='relationship'
                      value={bookingData.relationship}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 ${
                        errors.relationship
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value=''>Select relationship</option>
                      <option value='self'>Self</option>
                      <option value='spouse'>Spouse</option>
                      <option value='parent'>Parent</option>
                      <option value='child'>Child</option>
                      <option value='sibling'>Sibling</option>
                      <option value='relative'>Relative</option>
                      <option value='friend'>Friend</option>
                      <option value='caretaker'>Caretaker</option>
                      <option value='other'>Other</option>
                    </select>
                    {errors.relationship && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.relationship}
                      </p>
                    )}
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Medical Condition / Reason for Care
                    </label>
                    <textarea
                      name='medicalCondition'
                      value={bookingData.medicalCondition}
                      onChange={handleInputChange}
                      rows='3'
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none'
                      placeholder="Describe the patient's condition or reason for care..."
                    ></textarea>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Current Medications
                    </label>
                    <textarea
                      name='medications'
                      value={bookingData.medications}
                      onChange={handleInputChange}
                      rows='2'
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none'
                      placeholder='List current medications...'
                    ></textarea>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Allergies
                    </label>
                    <textarea
                      name='allergies'
                      value={bookingData.allergies}
                      onChange={handleInputChange}
                      rows='2'
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:ring-1 focus:outline-none  focus:ring-blue-600 resize-none'
                      placeholder='List any allergies...'
                    ></textarea>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Mobility Status
                    </label>
                    <select
                      name='mobility'
                      value={bookingData.mobility}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600'
                    >
                      <option value=''>Select mobility status</option>
                      <option value='fully-mobile'>Fully Mobile</option>
                      <option value='partially-mobile'>Partially Mobile</option>
                      <option value='wheelchair'>Wheelchair User</option>
                      <option value='bedridden'>Bedridden</option>
                    </select>
                  </div>

                  <div className='md:col-span-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Caregiver Gender Preference
                    </label>
                    <select
                      name='caregiverGender'
                      value={bookingData.caregiverGender}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600'
                    >
                      <option value='no-preference'>No Preference</option>
                      <option value='female'>Female Caregiver</option>
                      <option value='male'>Male Caregiver</option>
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Language Preferences
                    </label>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                      {[
                        'English',
                        'Swahili',
                        'Kikuyu',
                        'Luo',
                        'Kamba',
                        'Luhya',
                        'Kalenjin',
                        'Other',
                      ].map((lang) => (
                        <label
                          key={lang}
                          className='flex items-center gap-2 cursor-pointer'
                        >
                          <input
                            type='checkbox'
                            checked={bookingData.languagePreference.includes(
                              lang,
                            )}
                            onChange={() => handleLanguageChange(lang)}
                            className='w-4 h-4 text-blue-600 rounded-[0.4em]  focus:outline-none'
                          />
                          <span className='text-sm text-gray-700'>{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Special Requirements or Notes
                    </label>
                    <textarea
                      name='specialRequirements'
                      value={bookingData.specialRequirements}
                      onChange={handleInputChange}
                      rows='3'
                      className='w-full px-4 py-3 border border-gray-300 rounded-[0.4em] focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none'
                      placeholder='Any special requirements, dietary needs, or other important information...'
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div
                className='space-y-6 outline-1 p-3 rounded-[0.3em]
                            outline-gray-200'
              >
                <h2 className='text-xl text-center font-bold text-gray-900 mb-2'>
                  Review & Confirm
                </h2>

                <div className='space-y-6'>
                  {/* Contact Information */}
                  <div className='bg-gray-50 rounded-lg p-2'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                      <User className='w-5 h-5 text-blue-600' />
                      Contact Information
                    </h3>
                    <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <dt className='text-sm text-gray-500'>Name</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.fullName}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>Email</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.email}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>Phone</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>Location</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.area}, Nairobi
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Service Details */}
                  <div className='bg-gray-50 rounded-lg p-2'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                      <FileText className='w-5 h-5 text-blue-600' />
                      Service Details
                    </h3>
                    <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <dt className='text-sm text-gray-500'>Service Type</dt>
                        <dd className='font-medium text-gray-900'>
                          {serviceTypes.find(
                            (s) => s.value === bookingData.serviceType,
                          )?.label || '-'}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>Duration</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.serviceDuration || '-'}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>
                          Preferred Start Date
                        </dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.preferredDate
                            ? new Date(
                                bookingData.preferredDate,
                              ).toLocaleDateString()
                            : '-'}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>
                          Preferred Time
                        </dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.preferredTime || '-'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Patient Information */}
                  <div className='bg-gray-50 rounded-lg p-2'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                      <User className='w-5 h-5 text-blue-600' />
                      Patient Information
                    </h3>
                    <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <dt className='text-sm text-gray-500'>Patient Name</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.patientName}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>Age & Gender</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.patientAge} years,{' '}
                          {bookingData.patientGender}
                        </dd>
                      </div>
                      <div>
                        <dt className='text-sm text-gray-500'>Relationship</dt>
                        <dd className='font-medium text-gray-900'>
                          {bookingData.relationship}
                        </dd>
                      </div>
                      {bookingData.mobility && (
                        <div>
                          <dt className='text-sm text-gray-500'>Mobility</dt>
                          <dd className='font-medium text-gray-900'>
                            {bookingData.mobility}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {/* Additional Information */}
                  <div className='bg-gray-50 rounded-lg p-2'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      Additional Information
                    </h3>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        How did you hear about us?
                      </label>
                      <select
                        name='howDidYouHear'
                        value={bookingData.howDidYouHear}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:ring-1 focus:ring-blue-600'
                      >
                        <option value=''>Select an option</option>
                        <option value='google'>Google Search</option>
                        <option value='facebook'>Facebook</option>
                        <option value='instagram'>Instagram</option>
                        <option value='referral'>
                          Referral from friend/family
                        </option>
                        <option value='doctor'>Doctor/Hospital referral</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>

                    <div className='mt-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Additional Notes
                      </label>
                      <textarea
                        name='additionalNotes'
                        value={bookingData.additionalNotes}
                        onChange={handleInputChange}
                        rows='3'
                        className='w-full px-4 py-2 border border-gray-300 rounded-[0.4em] focus:ring-1 focus:outline-none focus:ring-blue-600 resize-none'
                        placeholder="Any other information you'd like us to know..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className='bg-blue-50 border border-blue-200 rounded-[0.4em] p-2'>
                    <label className='flex items-start gap-3 cursor-pointer'>
                      <input
                        type='checkbox'
                        name='termsAccepted'
                        checked={bookingData.termsAccepted}
                        onChange={handleInputChange}
                        className={`w-5 h-5 text-blue-600 rounded focus:ring-0  mt-0.5 ${
                          errors.termsAccepted ? 'border-red-500' : ''
                        }`}
                      />
                      <div>
                        <span className='text-gray-900 font-medium'>
                          I accept the terms and conditions *
                        </span>
                        <p className='text-sm text-gray-600 mt-1'>
                          I understand that this booking is subject to caregiver
                          availability. Mekin Home Care will contact me within
                          24 hours to confirm the booking and discuss payment
                          options. I consent to the collection and use of my
                          information as per the privacy policy.
                        </p>
                      </div>
                    </label>
                    {errors.termsAccepted && (
                      <p className='text-red-500 ml-6 text-sm mt-2'>
                        {errors.termsAccepted}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Success Message */}
          {currentStep === 5 && submitStatus === 'success' && (
            <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
              <div className='bg-white text-center'>
                <div className='w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <CheckCircle className='w-8 h-8 text-green-600' />
                </div>
                <h2 className='text-lg font-bold text-gray-900 mb-2'>
                  Booking Request Received!
                </h2>
                <p className='text-gray-600 mb-6'>
                  Thank you for choosing Mekin Home Care. We have received your
                  booking request and will contact you within 24 hours to
                  confirm your appointment and discuss next steps.
                </p>
                <div className='bg-white rounded-lg mb-2 text-left'>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    What happens next?
                  </h3>
                  <ul className='space-y-2 text-gray-600'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-5 h-5 text-blue-600 mt-0.5 shrink-0' />
                      <span>
                        Our team will review your request and assign the best
                        caregiver
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-5 h-5 text-blue-600 mt-0.5 shrink-0' />
                      <span>
                        We'll call you to confirm the details and discuss
                        payment
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-5 h-5 text-blue-600 mt-0.5 shrink-0' />
                      <span>
                        Your caregiver will arrive at the scheduled time
                      </span>
                    </li>
                  </ul>
                </div>
                <p className='text-gray-600 mb-6'>
                  A confirmation email has been sent to{' '}
                  <strong>{bookingData.email}</strong>
                </p>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className='flex justify-between items-center'>
            {currentStep > 1 && currentStep < 5 && (
              <button
                type='button'
                onClick={prevStep}
                className='px-6 py-1.5 border border-gray-300 mb-8 text-gray-700 font-medium hover:bg-gray-50 transition-colors'
              >
                Previous
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type='button'
                onClick={nextStep}
                className='ml-auto px-6 py-1.5 mb-8 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors'
              >
                Next Step
              </button>
            ) : null}
            {currentStep === 4 ? (
              <button
                type='submit'
                className='ml-auto px-6 py-1.5 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2'
              >
                <CheckCircle className='w-5 h-5' />
                Confirm Booking
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
export default PatientDashBookAppointment;
