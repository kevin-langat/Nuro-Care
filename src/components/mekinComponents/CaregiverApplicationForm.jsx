import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Upload,
  User,
  Briefcase,
  Award,
  Calendar,
  FileText,
  Users,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  alternatePhone: '',
  dateOfBirth: '',
  gender: '',
  idNumber: '',
  nationality: '',
  county: '',
  subCounty: '',
  estate: '',
  address: '',
  yearsOfExperience: '',
  currentlyEmployed: '',
  currentEmployer: '',
  previousEmployer: '',
  reasonForLeaving: '',
  educationLevel: '',
  certifications: [],
  firstAidCertified: '',
  firstAidExpiry: '',
  careTypes: [],
  specializations: [],
  languages: [],
  otherSkills: '',
  availabilityType: '',
  preferredShift: '',
  startDate: '',
  willingToLiveIn: '',
  willingToTravel: '',
  reference1Name: '',
  reference1Phone: '',
  reference1Relationship: '',
  reference2Name: '',
  reference2Phone: '',
  reference2Relationship: '',
  criminalRecord: '',
  medicalConditions: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  whyJoin: '',
  additionalInfo: '',
};

export function CaregiverApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    idDocument: null,
    photo: null,
    certificates: [],
    firstAidCert: null,
    cvDocument: null,
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Professional Experience', icon: Briefcase },
    { number: 3, title: 'Qualifications', icon: Award },
    { number: 4, title: 'Availability', icon: Calendar },
    { number: 5, title: 'References', icon: Users },
    { number: 6, title: 'Additional Information', icon: FileText },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData((prev) => {
      const currentArray = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      }
    });
  };

  const handleFileUpload = (field, file, isMultiple = false) => {
    if (isMultiple) {
      setUploadedFiles((prev) => ({
        ...prev,
        [field]: [...prev[field], file],
      }));
    } else {
      setUploadedFiles((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleFileRemove = (field, index = null) => {
    if (index !== null) {
      setUploadedFiles((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    } else {
      setUploadedFiles((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { formData, uploadedFiles });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center p-4'>
        <Card className='max-w-2xl w-full'>
          <CardContent className='pt-12 pb-12 text-center'>
            <div className='flex justify-center mb-6'>
              <div className='bg-green-100 p-6 rounded-full'>
                <CheckCircle className='w-16 h-16 text-green-600' />
              </div>
            </div>
            <h2 className='text-3xl mb-4 text-gray-900'>
              Application Submitted Successfully!
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Thank you for applying to join Mekin Home Care. We have received
              your application and will review it carefully. Our team will
              contact you within 3-5 business days.
            </p>
            <div className='bg-blue-50 p-6 rounded-lg mb-8'>
              <p className='text-sm text-gray-700'>
                <strong>What happens next?</strong>
                <br />
                1. Application Review (2-3 days)
                <br />
                2. Phone Interview
                <br />
                3. In-person Interview & Assessment
                <br />
                4. Background Verification
                <br />
                5. Onboarding & Training
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl mb-2 font-poppins text-blue-600'>
            Mekin Home Care
          </h1>
          <p className='text-xl text-gray-600'>Caregiver Application Form</p>
        </div>

        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='flex justify-between mb-4'>
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col items-center ${
                    step.number === currentStep
                      ? 'text-blue-600'
                      : step.number < currentStep
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.number === currentStep
                        ? 'bg-blue-600 text-white'
                        : step.number < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon className='w-5 h-5' />
                  </div>
                  <span className='text-xs hidden sm:block text-center'>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className='h-2' />
          <p className='text-center text-sm text-gray-600 mt-2'>
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl text-blue-600'>
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Please fill in all required fields accurately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName'>First Name *</Label>
                      <Input
                        id='firstName'
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange('firstName', e.target.value)
                        }
                        placeholder='Enter your first name'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Last Name *</Label>
                      <Input
                        id='lastName'
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange('lastName', e.target.value)
                        }
                        placeholder='Enter your last name'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email Address *</Label>
                      <Input
                        id='email'
                        type='email'
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        placeholder='example@email.com'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone Number *</Label>
                      <Input
                        id='phone'
                        type='tel'
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        placeholder='+254 700 000 000'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='alternatePhone'>
                      Alternate Phone Number
                    </Label>
                    <Input
                      id='alternatePhone'
                      type='tel'
                      value={formData.alternatePhone}
                      onChange={(e) =>
                        handleInputChange('alternatePhone', e.target.value)
                      }
                      placeholder='+254 700 000 000'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='dateOfBirth'>Date of Birth *</Label>
                      <Input
                        id='dateOfBirth'
                        type='date'
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange('dateOfBirth', e.target.value)
                        }
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='gender'>Gender *</Label>
                      <Select
                        required
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange('gender', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='idNumber'>
                        National ID / Passport Number *
                      </Label>
                      <Input
                        id='idNumber'
                        required
                        value={formData.idNumber}
                        onChange={(e) =>
                          handleInputChange('idNumber', e.target.value)
                        }
                        placeholder='ID or Passport number'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='nationality'>Nationality *</Label>
                      <Input
                        id='nationality'
                        required
                        value={formData.nationality}
                        onChange={(e) =>
                          handleInputChange('nationality', e.target.value)
                        }
                        placeholder='e.g., Kenyan'
                      />
                    </div>
                  </div>

                  {/* ID Document Upload */}
                  <div className='space-y-2'>
                    <Label htmlFor='idDocument'>
                      Upload ID / Passport Copy *
                    </Label>
                    <div className='border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                      <input
                        type='file'
                        id='idDocument'
                        accept='image/*,.pdf'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleFileUpload('idDocument', file);
                        }}
                        className='hidden'
                      />
                      <label htmlFor='idDocument' className='cursor-pointer'>
                        {uploadedFiles.idDocument ? (
                          <div className='flex items-center justify-center gap-2'>
                            <FileText className='w-5 h-5 text-blue-600' />
                            <span className='text-sm text-gray-700'>
                              {uploadedFiles.idDocument.name}
                            </span>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              onClick={(e) => {
                                e.preventDefault();
                                handleFileRemove('idDocument');
                              }}
                              className='ml-2'
                            >
                              <X className='w-4 h-4 text-red-500' />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className='w-8 h-8 text-blue-600 mx-auto mb-2' />
                            <p className='text-sm text-gray-600'>
                              Click to upload ID or Passport copy
                            </p>
                            <p className='text-xs text-gray-400 mt-1'>
                              PDF or Image (Max 5MB)
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Passport Photo Upload */}
                  <div className='space-y-2'>
                    <Label htmlFor='photo'>Upload Passport Photo *</Label>
                    <div className='border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                      <input
                        type='file'
                        id='photo'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleFileUpload('photo', file);
                        }}
                        className='hidden'
                      />
                      <label htmlFor='photo' className='cursor-pointer'>
                        {uploadedFiles.photo ? (
                          <div className='flex items-center justify-center gap-2'>
                            <FileText className='w-5 h-5 text-blue-600' />
                            <span className='text-sm text-gray-700'>
                              {uploadedFiles.photo.name}
                            </span>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              onClick={(e) => {
                                e.preventDefault();
                                handleFileRemove('photo');
                              }}
                              className='ml-2'
                            >
                              <X className='w-4 h-4 text-red-500' />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className='w-8 h-8 text-blue-600 mx-auto mb-2' />
                            <p className='text-sm text-gray-600'>
                              Click to upload passport photo
                            </p>
                            <p className='text-xs text-gray-400 mt-1'>
                              Image (Max 2MB)
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='county'>County *</Label>
                      <Input
                        id='county'
                        required
                        value={formData.county}
                        onChange={(e) =>
                          handleInputChange('county', e.target.value)
                        }
                        placeholder='e.g., Nairobi'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='subCounty'>Sub-County *</Label>
                      <Input
                        id='subCounty'
                        required
                        value={formData.subCounty}
                        onChange={(e) =>
                          handleInputChange('subCounty', e.target.value)
                        }
                        placeholder='e.g., Westlands'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='estate'>Estate/Area *</Label>
                      <Input
                        id='estate'
                        required
                        value={formData.estate}
                        onChange={(e) =>
                          handleInputChange('estate', e.target.value)
                        }
                        placeholder='e.g., Kilimani'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='address'>Physical Address *</Label>
                    <Textarea
                      id='address'
                      required
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      placeholder='Enter your full physical address'
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Experience */}
              {currentStep === 2 && (
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='yearsOfExperience'>
                      Years of Caregiving Experience *
                    </Label>
                    <Select
                      required
                      value={formData.yearsOfExperience}
                      onValueChange={(value) =>
                        handleInputChange('yearsOfExperience', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select years of experience' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='less-1'>Less than 1 year</SelectItem>
                        <SelectItem value='1-2'>1-2 years</SelectItem>
                        <SelectItem value='3-5'>3-5 years</SelectItem>
                        <SelectItem value='6-10'>6-10 years</SelectItem>
                        <SelectItem value='10+'>10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label>Are you currently employed as a caregiver? *</Label>
                    <RadioGroup
                      required
                      value={formData.currentlyEmployed}
                      onValueChange={(value) =>
                        handleInputChange('currentlyEmployed', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yes' id='employed-yes' />
                        <Label htmlFor='employed-yes'>Yes</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='no' id='employed-no' />
                        <Label htmlFor='employed-no'>No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.currentlyEmployed === 'yes' && (
                    <div className='space-y-2'>
                      <Label htmlFor='currentEmployer'>
                        Current Employer Name & Contact
                      </Label>
                      <Textarea
                        id='currentEmployer'
                        value={formData.currentEmployer}
                        onChange={(e) =>
                          handleInputChange('currentEmployer', e.target.value)
                        }
                        placeholder='Employer name, position, and contact information'
                        rows={3}
                      />
                    </div>
                  )}

                  <div className='space-y-2'>
                    <Label htmlFor='previousEmployer'>
                      Previous Employment History
                    </Label>
                    <Textarea
                      id='previousEmployer'
                      value={formData.previousEmployer}
                      onChange={(e) =>
                        handleInputChange('previousEmployer', e.target.value)
                      }
                      placeholder='List previous employers, positions, and duration of employment'
                      rows={4}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='reasonForLeaving'>
                      Reason for Leaving Last Position
                    </Label>
                    <Textarea
                      id='reasonForLeaving'
                      value={formData.reasonForLeaving}
                      onChange={(e) =>
                        handleInputChange('reasonForLeaving', e.target.value)
                      }
                      placeholder='Please explain your reason for leaving'
                      rows={3}
                    />
                  </div>

                  {/* CV Upload */}
                  <div className='space-y-2'>
                    <Label htmlFor='cvDocument'>Upload CV / Resume</Label>
                    <div className='border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                      <input
                        type='file'
                        id='cvDocument'
                        accept='.pdf,.doc,.docx'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleFileUpload('cvDocument', file);
                        }}
                        className='hidden'
                      />
                      <label htmlFor='cvDocument' className='cursor-pointer'>
                        {uploadedFiles.cvDocument ? (
                          <div className='flex items-center justify-center gap-2'>
                            <FileText className='w-5 h-5 text-blue-600' />
                            <span className='text-sm text-gray-700'>
                              {uploadedFiles.cvDocument.name}
                            </span>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              onClick={(e) => {
                                e.preventDefault();
                                handleFileRemove('cvDocument');
                              }}
                              className='ml-2'
                            >
                              <X className='w-4 h-4 text-red-500' />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className='w-8 h-8 text-blue-600 mx-auto mb-2' />
                            <p className='text-sm text-gray-600'>
                              Click to upload your CV or Resume
                            </p>
                            <p className='text-xs text-gray-400 mt-1'>
                              PDF or Word Document (Max 5MB)
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label>Types of Care You Have Provided *</Label>
                    <div className='space-y-3 mt-2'>
                      {[
                        'Elderly Care',
                        'Child Care',
                        'Special Needs Care',
                        'Post-Surgery Care',
                        "Dementia/Alzheimer's Care",
                        'Palliative Care',
                        'Disability Care',
                      ].map((type) => (
                        <div key={type} className='flex items-center space-x-2'>
                          <Checkbox
                            id={`care-${type}`}
                            checked={formData.careTypes.includes(type)}
                            onCheckedChange={(checked) =>
                              handleArrayChange('careTypes', type, checked)
                            }
                          />
                          <Label
                            htmlFor={`care-${type}`}
                            className='cursor-pointer'
                          >
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Qualifications */}
              {currentStep === 3 && (
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='educationLevel'>
                      Highest Level of Education *
                    </Label>
                    <Select
                      required
                      value={formData.educationLevel}
                      onValueChange={(value) =>
                        handleInputChange('educationLevel', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select education level' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='primary'>
                          Primary Education
                        </SelectItem>
                        <SelectItem value='secondary'>
                          Secondary Education (KCSE)
                        </SelectItem>
                        <SelectItem value='certificate'>Certificate</SelectItem>
                        <SelectItem value='diploma'>Diploma</SelectItem>
                        <SelectItem value='degree'>
                          Bachelor's Degree
                        </SelectItem>
                        <SelectItem value='masters'>Master's Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label>Professional Certifications & Training</Label>
                    <div className='space-y-3 mt-2'>
                      {[
                        'Certified Nursing Assistant (CNA)',
                        'Home Health Aide (HHA)',
                        'Geriatric Care Certification',
                        'CPR Certified',
                        'Child Development Associate (CDA)',
                        'Medication Administration',
                        'Infection Control',
                      ].map((cert) => (
                        <div key={cert} className='flex items-center space-x-2'>
                          <Checkbox
                            id={`cert-${cert}`}
                            checked={formData.certifications.includes(cert)}
                            onCheckedChange={(checked) =>
                              handleArrayChange('certifications', cert, checked)
                            }
                          />
                          <Label
                            htmlFor={`cert-${cert}`}
                            className='cursor-pointer'
                          >
                            {cert}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certificates Upload */}
                  <div className='space-y-2'>
                    <Label htmlFor='certificates'>
                      Upload Certificates & Diplomas
                    </Label>
                    <div className='border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                      <input
                        type='file'
                        id='certificates'
                        accept='image/*,.pdf'
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          files.forEach((file) =>
                            handleFileUpload('certificates', file, true)
                          );
                        }}
                        className='hidden'
                      />
                      <label htmlFor='certificates' className='cursor-pointer'>
                        <Upload className='w-8 h-8 text-blue-600 mx-auto mb-2' />
                        <p className='text-sm text-gray-600'>
                          Click to upload certificates
                        </p>
                        <p className='text-xs text-gray-400 mt-1'>
                          You can select multiple files (PDF or Image)
                        </p>
                      </label>
                    </div>
                    {uploadedFiles.certificates.length > 0 && (
                      <div className='mt-4 space-y-2'>
                        {uploadedFiles.certificates.map((file, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between bg-blue-50 p-3 rounded'
                          >
                            <div className='flex items-center gap-2'>
                              <FileText className='w-4 h-4 text-blue-600' />
                              <span className='text-sm text-gray-700'>
                                {file.name}
                              </span>
                            </div>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              onClick={() =>
                                handleFileRemove('certificates', index)
                              }
                            >
                              <X className='w-4 h-4 text-red-500' />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label>Do you have a valid First Aid Certificate? *</Label>
                    <RadioGroup
                      required
                      value={formData.firstAidCertified}
                      onValueChange={(value) =>
                        handleInputChange('firstAidCertified', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yes' id='firstaid-yes' />
                        <Label htmlFor='firstaid-yes'>Yes</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='no' id='firstaid-no' />
                        <Label htmlFor='firstaid-no'>No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.firstAidCertified === 'yes' && (
                    <>
                      <div className='space-y-2'>
                        <Label htmlFor='firstAidExpiry'>
                          First Aid Certificate Expiry Date
                        </Label>
                        <Input
                          id='firstAidExpiry'
                          type='date'
                          value={formData.firstAidExpiry}
                          onChange={(e) =>
                            handleInputChange('firstAidExpiry', e.target.value)
                          }
                        />
                      </div>

                      {/* First Aid Certificate Upload */}
                      <div className='space-y-2'>
                        <Label htmlFor='firstAidCert'>
                          Upload First Aid Certificate
                        </Label>
                        <div className='border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                          <input
                            type='file'
                            id='firstAidCert'
                            accept='image/*,.pdf'
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) handleFileUpload('firstAidCert', file);
                            }}
                            className='hidden'
                          />
                          <label
                            htmlFor='firstAidCert'
                            className='cursor-pointer'
                          >
                            {uploadedFiles.firstAidCert ? (
                              <div className='flex items-center justify-center gap-2'>
                                <FileText className='w-5 h-5 text-blue-600' />
                                <span className='text-sm text-gray-700'>
                                  {uploadedFiles.firstAidCert.name}
                                </span>
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='sm'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleFileRemove('firstAidCert');
                                  }}
                                  className='ml-2'
                                >
                                  <X className='w-4 h-4 text-red-500' />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Upload className='w-8 h-8 text-blue-600 mx-auto mb-2' />
                                <p className='text-sm text-gray-600'>
                                  Click to upload First Aid certificate
                                </p>
                                <p className='text-xs text-gray-400 mt-1'>
                                  PDF or Image (Max 5MB)
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <div className='space-y-2'>
                    <Label>Specialized Skills & Competencies *</Label>
                    <div className='space-y-3 mt-2'>
                      {[
                        'Bathing & Personal Hygiene',
                        'Meal Preparation & Feeding',
                        'Medication Management',
                        'Mobility Assistance',
                        'Wound Care',
                        'Catheter Care',
                        'Physical Therapy Support',
                        'Vital Signs Monitoring',
                      ].map((skill) => (
                        <div
                          key={skill}
                          className='flex items-center space-x-2'
                        >
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={formData.specializations.includes(skill)}
                            onCheckedChange={(checked) =>
                              handleArrayChange(
                                'specializations',
                                skill,
                                checked
                              )
                            }
                          />
                          <Label
                            htmlFor={`skill-${skill}`}
                            className='cursor-pointer'
                          >
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label>Languages Spoken *</Label>
                    <div className='space-y-3 mt-2'>
                      {[
                        'English',
                        'Swahili',
                        'Kikuyu',
                        'Luo',
                        'Luhya',
                        'Kamba',
                        'Other',
                      ].map((lang) => (
                        <div key={lang} className='flex items-center space-x-2'>
                          <Checkbox
                            id={`lang-${lang}`}
                            checked={formData.languages.includes(lang)}
                            onCheckedChange={(checked) =>
                              handleArrayChange('languages', lang, checked)
                            }
                          />
                          <Label
                            htmlFor={`lang-${lang}`}
                            className='cursor-pointer'
                          >
                            {lang}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='otherSkills'>Other Relevant Skills</Label>
                    <Textarea
                      id='otherSkills'
                      value={formData.otherSkills}
                      onChange={(e) =>
                        handleInputChange('otherSkills', e.target.value)
                      }
                      placeholder='Any other skills or competencies relevant to caregiving'
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Availability */}
              {currentStep === 4 && (
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <Label>Preferred Work Arrangement *</Label>
                    <RadioGroup
                      required
                      value={formData.availabilityType}
                      onValueChange={(value) =>
                        handleInputChange('availabilityType', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='full-time' id='fulltime' />
                        <Label htmlFor='fulltime'>Full-time</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='part-time' id='parttime' />
                        <Label htmlFor='parttime'>Part-time</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='flexible' id='flexible' />
                        <Label htmlFor='flexible'>Flexible / On-call</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className='space-y-2'>
                    <Label>Preferred Shift *</Label>
                    <RadioGroup
                      required
                      value={formData.preferredShift}
                      onValueChange={(value) =>
                        handleInputChange('preferredShift', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='day' id='day-shift' />
                        <Label htmlFor='day-shift'>
                          Day Shift (6 AM - 6 PM)
                        </Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='night' id='night-shift' />
                        <Label htmlFor='night-shift'>
                          Night Shift (6 PM - 6 AM)
                        </Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='rotating' id='rotating' />
                        <Label htmlFor='rotating'>Rotating Shifts</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='any' id='any-shift' />
                        <Label htmlFor='any-shift'>Any Shift</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='startDate'>Earliest Start Date *</Label>
                    <Input
                      id='startDate'
                      type='date'
                      required
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange('startDate', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>
                      Are you willing to work as a live-in caregiver? *
                    </Label>
                    <RadioGroup
                      required
                      value={formData.willingToLiveIn}
                      onValueChange={(value) =>
                        handleInputChange('willingToLiveIn', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yes' id='livein-yes' />
                        <Label htmlFor='livein-yes'>Yes</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='no' id='livein-no' />
                        <Label htmlFor='livein-no'>No</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value='negotiable'
                          id='livein-negotiable'
                        />
                        <Label htmlFor='livein-negotiable'>Negotiable</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className='space-y-2'>
                    <Label>Are you willing to travel with clients? *</Label>
                    <RadioGroup
                      required
                      value={formData.willingToTravel}
                      onValueChange={(value) =>
                        handleInputChange('willingToTravel', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yes' id='travel-yes' />
                        <Label htmlFor='travel-yes'>Yes</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='no' id='travel-no' />
                        <Label htmlFor='travel-no'>No</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='depends' id='travel-depends' />
                        <Label htmlFor='travel-depends'>
                          Depends on destination
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 5: References */}
              {currentStep === 5 && (
                <div className='space-y-6'>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <p className='text-sm text-gray-700'>
                      Please provide at least two professional references who
                      can speak to your caregiving abilities. References should
                      be from previous employers or supervisors.
                    </p>
                  </div>

                  <div className='border-2 border-blue-100 rounded-lg p-4 space-y-4'>
                    <h3 className='text-lg text-blue-600'>Reference 1 *</h3>
                    <div className='space-y-2'>
                      <Label htmlFor='reference1Name'>Full Name *</Label>
                      <Input
                        id='reference1Name'
                        required
                        value={formData.reference1Name}
                        onChange={(e) =>
                          handleInputChange('reference1Name', e.target.value)
                        }
                        placeholder='Reference name'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='reference1Phone'>Phone Number *</Label>
                      <Input
                        id='reference1Phone'
                        type='tel'
                        required
                        value={formData.reference1Phone}
                        onChange={(e) =>
                          handleInputChange('reference1Phone', e.target.value)
                        }
                        placeholder='+254 700 000 000'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='reference1Relationship'>
                        Relationship/Position *
                      </Label>
                      <Input
                        id='reference1Relationship'
                        required
                        value={formData.reference1Relationship}
                        onChange={(e) =>
                          handleInputChange(
                            'reference1Relationship',
                            e.target.value
                          )
                        }
                        placeholder='e.g., Former Employer, Supervisor'
                      />
                    </div>
                  </div>

                  <div className='border-2 border-blue-100 rounded-lg p-4 space-y-4'>
                    <h3 className='text-lg text-blue-600'>Reference 2 *</h3>
                    <div className='space-y-2'>
                      <Label htmlFor='reference2Name'>Full Name *</Label>
                      <Input
                        id='reference2Name'
                        required
                        value={formData.reference2Name}
                        onChange={(e) =>
                          handleInputChange('reference2Name', e.target.value)
                        }
                        placeholder='Reference name'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='reference2Phone'>Phone Number *</Label>
                      <Input
                        id='reference2Phone'
                        type='tel'
                        required
                        value={formData.reference2Phone}
                        onChange={(e) =>
                          handleInputChange('reference2Phone', e.target.value)
                        }
                        placeholder='+254 700 000 000'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='reference2Relationship'>
                        Relationship/Position *
                      </Label>
                      <Input
                        id='reference2Relationship'
                        required
                        value={formData.reference2Relationship}
                        onChange={(e) =>
                          handleInputChange(
                            'reference2Relationship',
                            e.target.value
                          )
                        }
                        placeholder='e.g., Former Employer, Supervisor'
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Additional Information */}
              {currentStep === 6 && (
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <Label>Do you have any criminal record? *</Label>
                    <RadioGroup
                      required
                      value={formData.criminalRecord}
                      onValueChange={(value) =>
                        handleInputChange('criminalRecord', value)
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yes' id='criminal-yes' />
                        <Label htmlFor='criminal-yes'>Yes</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='no' id='criminal-no' />
                        <Label htmlFor='criminal-no'>No</Label>
                      </div>
                    </RadioGroup>
                    <p className='text-xs text-gray-500 mt-1'>
                      A background check will be conducted. Please be honest.
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='medicalConditions'>
                      Do you have any medical conditions that may affect your
                      ability to work?
                    </Label>
                    <Textarea
                      id='medicalConditions'
                      value={formData.medicalConditions}
                      onChange={(e) =>
                        handleInputChange('medicalConditions', e.target.value)
                      }
                      placeholder='Please describe any relevant medical conditions'
                      rows={3}
                    />
                  </div>

                  <div className='border-2 border-blue-100 rounded-lg p-4 space-y-4'>
                    <h3 className='text-lg text-blue-600'>
                      Emergency Contact Information *
                    </h3>
                    <div className='space-y-2'>
                      <Label htmlFor='emergencyContactName'>Full Name *</Label>
                      <Input
                        id='emergencyContactName'
                        required
                        value={formData.emergencyContactName}
                        onChange={(e) =>
                          handleInputChange(
                            'emergencyContactName',
                            e.target.value
                          )
                        }
                        placeholder='Emergency contact name'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='emergencyContactPhone'>
                        Phone Number *
                      </Label>
                      <Input
                        id='emergencyContactPhone'
                        type='tel'
                        required
                        value={formData.emergencyContactPhone}
                        onChange={(e) =>
                          handleInputChange(
                            'emergencyContactPhone',
                            e.target.value
                          )
                        }
                        placeholder='+254 700 000 000'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='emergencyContactRelationship'>
                        Relationship *
                      </Label>
                      <Input
                        id='emergencyContactRelationship'
                        required
                        value={formData.emergencyContactRelationship}
                        onChange={(e) =>
                          handleInputChange(
                            'emergencyContactRelationship',
                            e.target.value
                          )
                        }
                        placeholder='e.g., Spouse, Parent, Sibling'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='whyJoin'>
                      Why do you want to join Mekin Home Care? *
                    </Label>
                    <Textarea
                      id='whyJoin'
                      required
                      value={formData.whyJoin}
                      onChange={(e) =>
                        handleInputChange('whyJoin', e.target.value)
                      }
                      placeholder='Tell us what motivates you to work with us'
                      rows={4}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='additionalInfo'>
                      Additional Information
                    </Label>
                    <Textarea
                      id='additionalInfo'
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        handleInputChange('additionalInfo', e.target.value)
                      }
                      placeholder='Any other information you would like us to know'
                      rows={4}
                    />
                  </div>

                  <div className='bg-yellow-50 border border-yellow-200 p-4 rounded-lg'>
                    <p className='text-sm text-gray-700'>
                      <strong>Declaration:</strong> I hereby declare that all
                      the information provided in this application is true and
                      accurate to the best of my knowledge. I understand that
                      any false information may result in the rejection of my
                      application or termination of employment.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className='flex justify-between mt-8 pt-6 border-t'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className='flex items-center gap-2'
                >
                  <ChevronLeft className='w-4 h-4' />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type='button'
                    onClick={handleNext}
                    className='bg-blue-600 hover:bg-blue-700 flex items-center gap-2'
                  >
                    Next
                    <ChevronRight className='w-4 h-4' />
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    className='bg-green-600 hover:bg-green-700 flex items-center gap-2'
                  >
                    Submit Application
                    <CheckCircle className='w-4 h-4' />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className='text-center mt-8 text-sm text-gray-600'>
          <p>
            Need help? Contact us at{' '}
            <Link to='mailto:info@mekinhomecare.com' className='text-blue-600'>
              info@mekinhomecare.com
            </Link>{' '}
            or call{' '}
            <Link to='tel:+254713231908' className='text-blue-600'>
              {' '}
              +254 713 231 908
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
