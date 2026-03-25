import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { CircleCheck, Clock, MapPin, Phone, Shield, Heart } from 'lucide-react';
import { elderlyCareData as content } from '../config/elderlyCareData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/mekinComponents/Footer';
import { useContext, useEffect, useRef, useState } from 'react';
import { globalState } from '@/context/GlobalContext';
import { TailSpin } from 'react-loader-spinner';

export function ServiceDetailPage() {
  const navigateTo = useNavigate();
  const { serviceSlug } = useParams();
  const { serviceRes } = useContext(globalState);
  const [currentService, setCurrentService] = useState();

  useEffect(() => {
    if (serviceRes && serviceRes.length > 0) {
      const service = serviceRes?.find(
        (item) => item.ServiceSlug === serviceSlug,
      );

      if (!service) {
        navigateTo('/uknown-service-page');
      } else {
        setCurrentService(service);
      }
    }
  }, [serviceSlug, serviceRes]);
  console.log(currentService, 'current');

  const header = useRef();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return <div className='min-h-screen w-full font-sans flex flex-col justify-between'>
    {
      serviceRes && serviceRes.length > 0 ? (
        <div className='min-h-screen w-full font-sans'>
          <div className='hidden'>
            <h1>{content.title}</h1>
            <meta name='description' content={content.metaDescription} />
            <meta name='keywords' content={content.keywords.join(', ')} />
          </div>

          {/* Hero Section */}

          <section className='text-gray-950 py-4 px-4'>
            <div
              ref={header}
              className='w-full flex flex-col items-center justify-center max-w-6xl mx-auto'
            >
              <h1 className='text-2xl md:text-3xl font-bold mb-2'>
                {currentService?.Title}
              </h1>
              <p className='text-lg opacity-90 max-w-3xl'>
                {currentService?.ServiceHeroDescription}
              </p>
            </div>
          </section>
          <section className='py-4 bg-white'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-6 text-center'>
                <div className='flex flex-col items-center'>
                  <Shield className='w-8 h-8 stroke-1 text-blue-600 mb-2' />
                  <p>Licensed Professionals</p>
                </div>
                <div className='flex flex-col items-center'>
                  <Clock className='w-8 h-8 stroke-1 text-blue-600 mb-2' />
                  <p>24/7 Availability</p>
                </div>
                <div className='flex flex-col items-center'>
                  <MapPin className='w-8 stroke-1 h-8 text-blue-600 mb-2' />
                  <p>All Nairobi Areas</p>
                </div>
                <div className='flex flex-col items-center'>
                  <Heart className='w-8 h-8 stroke-1 text-blue-600 mb-2' />
                  <p>Compassionate Care</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className='max-w-6xl mx-auto px-8 py-4'>
            {/* Overview Section */}

            <section className='mb-10'>
              <h2 className='text-2xl text-center md:text-3xl font-bold mb-2'>
                About This Service
              </h2>
              <div className='prose prose-lg max-w-none flex flex-col gap-3'>
                <p className='text-gray-700 font-sans leading-relaxed'>
                  {currentService?.ServiceOverview}
                </p>
                <img src={currentService?.Gallery[0]?.url} alt='' />
              </div>
            </section>
            {currentService &&
              currentService.ServiceBenefits &&
              currentService.ServiceBenefits.length > 0 ? (
              <section className='mb-10'>
                <h2 className=' text-2xl md:text-3xl font-bold mb-2 text-center'>
                  Why Choose Our {currentService?.Title}?
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 place-items-center  lg:grid-cols-3 gap-6'>
                    {currentService &&
                      currentService.ServiceBenefits &&
                      currentService.ServiceBenefits.length > 0 ? (
                      currentService.ServiceBenefits.map((benefit) => (
                        <Card
                          key={benefit?._id}
                          className='rounded-[0.4em] outline-1 h-full outline-gray-200 shadow-none transition-colors'
                        >
                          <CardHeader>
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1 text-blue-600'>
                              <CircleCheck className='w-6 h-6' />
                            </div>
                            <CardTitle className='text-lg'>
                              {benefit?.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className='text-gray-600'>{benefit?.description}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <h2></h2>
                    )}
                  </div>
              </section>
            ) : null}

            {currentService && currentService.ServiceProcess.length > 0 && (
              <section className='mb-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  How Our Service Works
                </h2>
                <div className='max-w-4xl mx-auto'>
                  {currentService.ServiceProcess.map((step, index) => (
                    <div key={step._id} className='flex gap-6 mb-8 last:mb-0'>
                      <div className='shrink-0'>
                        <div className='w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl'>
                          {step.step}
                        </div>
                      </div>
                      <div className='flex-1'>
                        <h3 className='mb-2'>{step.title}</h3>
                        <p className='text-gray-600'>{step.description}</p>
                        {index < currentService.ServiceProcess.length - 1 && (
                          <Separator className='mt-6' />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {currentService && currentService.Gallery.length > 0 && (
              <section className='mb-4 rounded-lg p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  Service Gallery
                </h2>
                <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                  {currentService.Gallery.map((image) => (
                    <div className='w-full p-1 outline-1 outline-gray-200 rounded-[0.4em] h-full '>
                      <img className='h-full w-full rounded-[0.4em]' src={image?.url} loading='lazy' alt={currentService?.itle} />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {currentService && currentService?.ServiceInclusion?.length > 0 ? (
              <section className='mb-10 rounded-lg p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  What's Included in Our Service
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto'>
                  {currentService?.ServiceInclusion.map((item) => (
                    <div key={item._id} className='flex items-start gap-3'>
                      <CircleCheck className='w-5 h-5 text-green-600 shrink-0 mt-1' />
                      <span className='text-gray-700'>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            {currentService && currentService?.ServiceFeatures?.length > 0 ? (
              <section className='mb-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  Comprehensive Care Services
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {currentService.ServiceFeatures.map((feature) => (
                    <Card key={feature._id}>
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          {feature.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className='space-y-2'>
                          {feature.items.map((item) => (
                            <li key={item._id} className='flex items-start gap-2'>
                              <CircleCheck className='w-4 h-4 text-blue-600 shrink-0 mt-1' />
                              <span className='text-gray-700'>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}
            {currentService && currentService?.TargetAudience?.length > 0 ? (
              <section className='mb-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  Who Can Benefit from This Service?
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {currentService?.TargetAudience?.map((audience) => (
                    <Card
                      key={audience._id}
                      className='bg-linear-to-tr from-indigo-300 to-blue-400'
                    >
                      <CardHeader>
                        <CardTitle className='text-lg'>{audience.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-600'>{audience.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}
            {/* Coverage Areas in Nairobi */}
            {currentService && currentService.ServiceCoverageAreas?.length > 0 ? (
              <section className='mb-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  Areas We Serve in Nairobi
                </h2>
                <Card className='max-w-4xl outline-1 outline-gray-300 mx-auto'>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <MapPin className='w-4 h-4 text-blue-600' />
                      <CardTitle>
                        Professional Home Care Across Nairobi County
                      </CardTitle>
                    </div>
                    <CardDescription>
                      We provide {currentService.Title.toLowerCase()} to homes,
                      hospitals, and care facilities throughout Nairobi and
                      surrounding areas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      {currentService.ServiceCoverageAreas.map((area) => (
                        <Badge
                          key={area._id}
                          variant='secondary'
                          className='text-sm'
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <p className='text-sm text-gray-600 mt-4'>
                      Don't see your area?{' '}
                      <Link to={'tel:+254713231908'} className='text-blue-600'>
                        Contact us
                      </Link>{' '}
                      - we may still be able to serve you!
                    </p>
                  </CardContent>
                </Card>
              </section>
            ) : null}

            {/* Pricing Note */}

            {currentService && currentService.PricingNote && (
              <section className='mb-16'>
                <Card className='max-w-4xl mx-auto bg-linear-to-r from-blue-50 to-purple-50'>
                  <CardHeader>
                    <CardTitle>Transparent Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-700'>{currentService.PricingNote}</p>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* FAQ Schema Markup Placeholder */}
            {

              currentService && currentService.serviceFAQs.length > 0 && <section className='mb-10 max-w-4xl mx-auto'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-center'>
                  Frequently Asked Questions
                </h2>
                <div className='space-y-4'>
                  {
                    currentService.serviceFAQs.map((faq) => (
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            {faq.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='text-gray-600'>
                            {
                              faq.answer
                            }
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  }
                </div>
              </section>
            }


            {/* Call to Action */}

            {currentService &&
              currentService.CTATitle &&
              currentService.CTADescription ? (
              <section className='mb-5'>
                <Card className='max-w-4xl mx-auto bg-linear-to-r from-blue-600 to-blue-800 text-white'>
                  <CardHeader>
                    <CardTitle className='text-3xl text-white'>
                      {currentService.CTATitle}
                    </CardTitle>
                    <CardDescription className='text-blue-100 text-lg'>
                      {currentService.CTADescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <Button
                        size='lg'
                        className='bg-white text-blue-700 hover:bg-blue-100'
                      >
                        <Link
                          className='flex items-center justify-center flex-row'
                          to={'tel:+254713231908'}
                        >
                          <Phone className='mr-2 h-5 w-5' />
                          Call Us Now
                        </Link>
                      </Button>
                    </div>
                    <div className='mt-3 flex flex-wrap gap-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4' />
                        <span>24/7 Support Available</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MapPin className='w-4 h-4' />
                        <span>Serving All Nairobi</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            ) : null}
          </div>
        </div>) : <div className='w-full flex mt-10 flex-col items-center justify-center'>
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#155dfc"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    }
    <Footer />
  </div>;

}
