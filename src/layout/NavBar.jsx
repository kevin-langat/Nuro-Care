import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  ShieldCheck,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { HoverCard } from 'radix-ui';
import { useContext, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { TailSpin } from 'react-loader-spinner';
import { globalState } from '@/context/GlobalContext';

function NavBar() {
  const [openForServices, setOpenForServices] = useState(false);
  const [openForServicesSm, setOpenForServicesSm] = useState(false);
  const [openForCaregivers, setOpenForCaregivers] = useState(false);
  const [openForCaregiversSm, setOpenForCaregiversSm] = useState(false);
  const [menuDialog, setMenuDialog] = useState(false);
  const navigateTo = useNavigate();
  const { serviceRes } = useContext(globalState)
  return (
    <div className='dark:bg-gray-950 fixed z-50 backdrop-blur-3xl  font-montserrat w-full outline-1 outline-gray-200 dark:outline-gray-800 h-13 flex flex-row items-center justify-center bg-white/90'>
      {/* logo */}
      <div className=' w-[93%]  flex flex-row items-center justify-between lg:justify-around '>
        <HashLink
          to='/home#hero'
          className='flex  transform duration-500 ease-in-out  items-center space-x-2'
        >
          <Heart className='h-8 w-8 stroke-blue-600 dark:stroke-blue-500' />
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-gray-900 dark:text-gray-300'>
              MEKIN
            </span>
            <span className='text-xs text-gray-600 dark:text-gray-400 leading-none'>
              Home Care & Nursing
            </span>
          </div>
        </HashLink>
        {/* navlinks */}
        <div className='hidden h-10 lg:w-[53%] lg:flex flex-row items-center  '>
          <div className='w-full transform duration-200 ease-out *:font-sans gap-2 *:cursor-pointer font-lightblack *:text-vsm h-full items-center justify-around flex flex-row '>
            <HashLink
              to={'/home#hero'}
              className='hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-600'
            >
              Home
            </HashLink>
            <div>
              <HoverCard.Root
                open={openForServices}
                onOpenChange={() => setOpenForServices(!openForServices)}
                openDelay={100}
              >
                <HoverCard.Trigger>
                  <div
                    onClick={() => setOpenForServices(true)}
                    className='hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-600'
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: '1px',
                      justifyContent: 'space-around',
                      cursor: 'pointer',
                    }}
                  >
                    <h2 className='tracking-tight'>Services</h2>
                    <ChevronDown
                      size={20}
                      className='transform duration-700 stroke-1 ease-in-out '
                      style={
                        openForServices
                          ? { transform: 'rotate(180deg)', marginTop: '3px' }
                          : { transform: 'rotate(0deg) ', marginTop: '3px' }
                      }
                    />{' '}
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content className='HoverCardContent'>

                    {
                      serviceRes && serviceRes.length > 0 ?
                        <div className='bg-white py-4 outline-1 p-4 outline-gray-300 dark:outline-gray-800 rounded-[0.4em] justify-between dark:bg-gray-900 grid grid-cols-2 gap-x-2 gap-y-5'>
                          {
                            serviceRes.map((service) => (

                              <Link
                                to={`/services/${service.ServiceSlug}`}
                                onClick={() => setOpenForServices(false)}
                                className=' group outline-0  hover:bg-sky-100 hover:outline-1 outline-gray-400/30 rounded-[0.3em]  w-full flex flex-row items-center justify-start gap-1 py-1 px-3'
                              >

                                <p className='group-hover:text-blue-500 transform duration-300 ease-in '>
                                  {service.Title}
                                </p>
                                <ChevronRight className='stroke-2 w-4 mt-1 group-hover:stroke-blue-500 group-hover:translate-x-0.5 opacity-20 group-hover:opacity-100 transform duration-300 ease-in' />
                              </Link>
                            ))
                          }
                        </div>
                        : <TailSpin
                          visible={true}
                          height='80'
                          width='80'
                          color='#155dfc'
                          ariaLabel='tail-spin-loading'
                          radius='1'
                          wrapperStyle={{}}
                          wrapperClass=''
                        />
                    }

                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </div>

            <div>
              <HoverCard.Root
                onOpenChange={() => setOpenForCaregivers(!openForCaregivers)}
                openDelay={100}
                open={openForCaregivers}
              >
                <HoverCard.Trigger>
                  <div
                    onClick={() => setOpenForCaregivers(!openForCaregivers)}
                    className='hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-600'
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: '1px',
                      justifyContent: 'space-around',
                      cursor: 'pointer',
                    }}
                  >
                    <h2 className='tracking-tight'>Caregivers</h2>
                    <ChevronDown
                      size={20}
                      className='transform duration-700 stroke-1 ease-in-out '
                      style={
                        openForCaregivers
                          ? { transform: 'rotate(180deg)', marginTop: '3px' }
                          : { transform: 'rotate(0deg) ', marginTop: '3px' }
                      }
                    />{' '}
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content className='HoverCardContent'>
                    <div className='bg-gray-50 w-120 h-50 outline-1 p-4 outline-gray-200 dark:outline-gray-800 rounded-[0.4em] justify-between dark:bg-gray-900 flex flex-row gap-2'>
                      {/* section one: trust side */}
                      <div className='w-1/2 flex flex-col items-start gap-1'>
                        <h1 className='font-semibold text-fmd'>Trust Side</h1>

                        <HashLink
                          onClick={() => setOpenForCaregivers(false)}
                          to='/caregivers#vetting-process'
                          className=' group outline-0 hover:outline-1 outline-gray-400/30 hover:bg-sky-100 rounded-[0.3em]  w-full flex flex-row items-center justify-start gap-1 px-1'
                        >
                          <svg
                            className='w-9 h-9'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            version='1.1'
                            x='0px'
                            y='0px'
                            viewBox='0 0 33 41.25'
                            enableBackground='new 0 0 33 33'
                            xmlSpace='preserve'
                          >
                            <path d='M28.022,26.635c0.823-0.906,1.339-2.099,1.339-3.417c0-2.813-2.289-5.103-5.103-5.103c-2.814,0-5.105,2.289-5.105,5.103  s2.291,5.104,5.105,5.104c1.318,0,2.509-0.516,3.416-1.339l4.477,4.479l0.349-0.349L28.022,26.635z M24.259,27.829  c-2.544,0-4.613-2.069-4.613-4.611c0-2.543,2.069-4.61,4.613-4.61c2.543,0,4.61,2.067,4.61,4.61  C28.869,25.76,26.802,27.829,24.259,27.829z' />
                            <path d='M0.994,25.296c-0.001-0.53,0.029-1.952,0.328-4.202c0.271-2.044,1.812-3.164,3.17-3.764  c-0.097,0.527-0.169,1.191-0.137,1.902c-2.018,0.577-1.465,2.979-1.222,4.02c0.13,0.556,0.381,0.949,0.745,1.171  c0.252,0.152,0.506,0.188,0.689,0.188c0.158,0,0.264-0.026,0.273-0.029l-0.123-0.477c-0.002,0-0.299,0.07-0.584-0.104  c-0.248-0.15-0.423-0.439-0.521-0.861c-0.371-1.596-0.511-3.119,0.979-3.469c1.495-0.349,2.044,1.08,2.417,2.676  c0.098,0.418,0.07,0.752-0.082,0.996c-0.178,0.285-0.48,0.357-0.48,0.357l0.102,0.482c0.02-0.005,0.498-0.109,0.791-0.569  c0.229-0.36,0.278-0.823,0.148-1.378c-0.233-1.001-0.758-3.267-2.644-3.101c-0.026-0.792,0.081-1.513,0.197-2.03  c0.662-0.24,1.222-0.354,1.476-0.398l4.599,6.773l4.597-6.773c0.254,0.044,0.813,0.158,1.475,0.396  c0.209,0.922,0.405,2.533-0.218,4.028c-0.158-0.06-0.328-0.097-0.507-0.097c-0.791,0-1.434,0.643-1.434,1.433  s0.643,1.434,1.434,1.434c0.79,0,1.433-0.644,1.433-1.434c0-0.432-0.196-0.815-0.499-1.077c0.635-1.469,0.53-3.035,0.341-4.063  c0.897,0.396,1.867,1.028,2.506,1.997c0.117-0.121,0.24-0.235,0.368-0.346c-1.573-2.295-4.848-2.766-4.973-2.781  c-0.21-0.121-0.816-0.479-1.409-0.92c1.271-1.355,1.538-3.324,1.572-3.652l0.023-0.153c0.889-0.058,1.434-0.99,1.434-1.856  c0-0.451-0.144-0.863-0.404-1.16c-0.059-0.066-0.126-0.124-0.194-0.179c0.125-0.783,0.132-1.95,0.002-3.084  c-0.198-0.841-0.818-1.167-1.055-1.263c-0.287-0.41-1.816-2.391-4.491-2.391c-2.676,0-4.203,1.98-4.492,2.391  C6.389,4.026,5.767,4.357,5.563,5.221C5.438,6.326,5.445,7.5,5.572,8.287C5.43,8.4,5.301,8.531,5.205,8.695  c-0.33,0.572-0.309,1.377,0.053,2.003c0.269,0.465,0.684,0.743,1.149,0.773L6.43,11.62c0.035,0.329,0.295,2.304,1.568,3.659  c-0.59,0.439-1.195,0.797-1.405,0.918c-0.151,0.02-5.214,0.735-5.759,4.832c-0.392,2.949-0.332,4.461-0.329,4.523l0.011,0.235  h18.773c-0.083-0.159-0.158-0.323-0.227-0.492H0.994z M17.402,22.468c0,0.519-0.422,0.94-0.939,0.94c-0.52,0-0.941-0.422-0.941-0.94  s0.422-0.94,0.941-0.94C16.98,21.527,17.402,21.949,17.402,22.468z M11.116,22.604l-0.913-1.346l0.409-1.158  c0.129-0.309-0.016-0.496-0.086-0.586l-0.04-0.055l-0.772-0.945l1.36-0.908h0.083l1.364,0.852l-0.777,1.002l-0.039,0.055  c-0.07,0.09-0.218,0.277-0.092,0.572l0.416,1.172L11.116,22.604z M6.048,5.306c0.174-0.735,0.78-0.928,0.805-0.935L6.94,4.346  l0.05-0.078c0.015-0.022,1.471-2.236,4.127-2.236c2.646,0,4.11,2.214,4.125,2.236l0.051,0.076l0.086,0.026  c0.026,0.008,0.631,0.2,0.8,0.906c0.112,0.991,0.112,2.019,0.019,2.755c-0.16-0.054-0.33-0.094-0.518-0.104  c-0.929-1.251-0.815-2.252-0.813-2.262l0.064-0.467l-0.42,0.215c-0.019,0.009-1.775,0.896-3.395,0.896  c-1.616,0-3.376-0.888-3.394-0.896L7.309,5.205l0.058,0.459C7.367,5.676,7.48,6.676,6.553,7.928  c-0.188,0.01-0.357,0.051-0.518,0.105C5.939,7.294,5.94,6.268,6.048,5.306z M6.918,11.551l-0.093-0.6l-0.234,0.025  c-0.497,0.06-0.783-0.313-0.906-0.524C5.412,9.98,5.391,9.359,5.632,8.941c0.198-0.344,0.56-0.524,1.046-0.524h0.121l0.073-0.096  c0.75-0.968,0.941-1.819,0.983-2.304c0.622,0.273,1.961,0.785,3.262,0.785c1.299,0,2.639-0.512,3.261-0.784  c0.04,0.483,0.231,1.335,0.982,2.304l0.074,0.095h0.12c0.407,0,0.72,0.122,0.93,0.362c0.182,0.207,0.282,0.504,0.282,0.836  c0,0.689-0.414,1.443-1.126,1.361l-0.235-0.025l-0.093,0.621c-0.049,0.461-0.59,4.515-4.196,4.515  C7.493,16.087,6.968,12.031,6.918,11.551z M8.36,15.623c0.667,0.563,1.557,0.956,2.756,0.956c1.196,0,2.085-0.396,2.752-0.958  c0.526,0.398,1.063,0.731,1.367,0.91l-2.864,4.223l-0.294-0.832l0.019-0.1l-0.003-0.006c0.019-0.025,0.037-0.049,0.04-0.056  l0.79-1.021c0.135-0.211,0.074-0.496-0.134-0.635l-1.36-0.91c-0.179-0.117-0.448-0.117-0.628,0.001l-1.361,0.909  c-0.207,0.14-0.267,0.424-0.119,0.654l0.765,0.982c0.017,0.025,0.034,0.049,0.087,0.119l-0.313,0.891l-2.864-4.219  C7.298,16.354,7.835,16.021,8.36,15.623z' />
                          </svg>
                          <p className='group-hover:text-blue-500 transform duration-300 ease-in '>
                            Our Vetting Process
                          </p>
                          <ChevronRight className='stroke-2 w-4 mt-1 group-hover:stroke-blue-500 group-hover:translate-x-0.5 opacity-20 group-hover:opacity-100 transform duration-300 ease-in' />
                        </HashLink>
                        <HashLink
                          to='/caregivers#certification'
                          onClick={() => setOpenForCaregivers(false)}
                          className=' group outline-0 hover:outline-1 outline-gray-400/30 hover:bg-sky-100 rounded-[0.3em]  w-full flex flex-row items-center justify-start gap-1 px-1'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-9 h-9'
                            viewBox='0 0 100 125'
                            x='0px'
                            y='0px'
                          >
                            <g data-name='22 девушка сертификат'>
                              <path d='M61.94,71.48l-17.81-6.1c-.17-.06-.74-.29-.74-.8v-4a18.78,18.78,0,0,0,4.54-3.47c6.74-1,11.86,1.51,15.27,3.2,1.74.86,3.13,1.55,4.33,1.55a2.61,2.61,0,0,0,1.41-.39c1.32-.82,1.49-2.55,1.49-4,0-16.19-8.23-51.67-32.69-51.67S5,41.34,5,57.53c0,1.32.16,2.93,1.41,3.69,1.43.87,3,0,5.21-1.1C15,58.39,20,55.8,26.74,57.63a18.36,18.36,0,0,0,4,3v4c0,.51-.56.74-.74.8l-17.81,6.1C5.66,73.72,1.58,78.94,1.58,85.1v7.81h3V85.1c0-4.83,3.3-9,8.62-10.78L19.95,72,35.72,87.57v6.57h3V86.88L54,71.94,61,74.31c5.31,1.82,8.62,6,8.62,10.78v7.81h3V85.1C72.58,78.94,68.5,73.72,61.94,71.48Zm-51.66-14a20.24,20.24,0,0,1-2.17,1,6.21,6.21,0,0,1-.06-1C8,42.28,15.52,8.86,37.74,8.86S67.43,42.28,67.43,57.53a5.52,5.52,0,0,1-.12,1.34,17.34,17.34,0,0,1-2.78-1.21c-3-1.5-7.79-3.85-14-3.74a32.9,32.9,0,0,0,4.07-8,6.28,6.28,0,0,0,3.47-4.31c.69-2.56,0-5-1.58-6.19,0-.4,0-.74,0-1.1h.35a17.13,17.13,0,0,0,2.62-.2l-.46-3a14.05,14.05,0,0,1-14.58-7.32,16.92,16.92,0,0,0,.76-7l-3,.3a14.06,14.06,0,0,1-24,11.26L16,30.49A16.79,16.79,0,0,0,17.81,32a27.44,27.44,0,0,0-.18,3.17c-1.8,1.08-2.63,3.68-1.9,6.4A6.07,6.07,0,0,0,19.57,46a32.78,32.78,0,0,0,4.12,8C17.74,53.59,13.21,55.94,10.28,57.46ZM22.13,44.24l-.34-1.06-1.12,0c-.62,0-1.65-.94-2-2.37-.45-1.67.13-3,.77-3.14l1.31-.21-.06-1.33c0-.79,0-1.57,0-2.34a17,17,0,0,0,22.27-6.67A17,17,0,0,0,53.46,34a12.55,12.55,0,0,1,0,2.23l-.05,1.14,1.08.36c.58.19,1.12,1.47.68,3.11a3.07,3.07,0,0,1-1.93,2.36l-1,.12-.29.91c-2.4,7.49-8,15-15,15S24.52,51.72,22.13,44.24Zm15,18a12.65,12.65,0,0,0,3.31-.46v2.76a3.75,3.75,0,0,0,1.71,3.11,6.84,6.84,0,0,1-10.11,0,3.75,3.75,0,0,0,1.77-3.15V61.82A12.66,12.66,0,0,0,37.08,62.27Zm-.21,22.22L23.12,70.92l6-2a9.84,9.84,0,0,0,15.94,0l5.83,2Z' />
                              <polygon points='59.42 86.78 56.42 86.78 56.42 88.78 52.43 88.78 52.43 91.78 63.42 91.78 63.42 88.78 59.42 88.78 59.42 86.78' />
                              <polygon points='64.92 17.77 64.92 20.77 95.42 20.77 95.42 77.94 92.83 77.94 92.83 80.94 98.42 80.94 98.42 17.77 64.92 17.77' />
                              <path d='M81.08,52.61a7.49,7.49,0,0,0-6.5,11.23V81.11l6.5-2.85,6.5,2.85V63.83a7.49,7.49,0,0,0-6.5-11.23Zm0,3a4.5,4.5,0,1,1-4.5,4.5A4.51,4.51,0,0,1,81.08,55.61Zm0,19.37-3.5,1.54V66.74a7.46,7.46,0,0,0,7,0v9.78Z' />
                              <path d='M70.46,22.77v3H86.62a5.52,5.52,0,0,0,3.79,3.79V53.77h3v-27h-1.5a2.5,2.5,0,0,1-2.5-2.5v-1.5Z' />
                              <rect
                                x='90.42'
                                y='57.77'
                                width='3'
                                height='3.99'
                              />
                            </g>
                          </svg>
                          <p className='group-hover:text-blue-500 transform duration-300 ease-in '>
                            Certification
                          </p>
                          <ChevronRight className='stroke-2 w-4 mt-1 group-hover:stroke-blue-500 group-hover:translate-x-0.5 opacity-20 group-hover:opacity-100 transform duration-300 ease-in' />
                        </HashLink>
                        <HashLink
                          onClick={() => setOpenForCaregivers(false)}
                          to='/caregivers#quality-assurance'
                          className=' group outline-0 hover:outline-1 outline-gray-400/30 hover:bg-sky-100 rounded-[0.3em]  w-full flex flex-row items-center justify-start gap-1 px-1 py-1'
                        >
                          <ShieldCheck size={26} className='stroke-1 ' />
                          <p className='group-hover:text-blue-500 transform duration-300 ease-in '>
                            Quality Assurance
                          </p>
                          <ChevronRight className='stroke-2 w-4 mt-1 group-hover:stroke-blue-500 group-hover:translate-x-0.5 opacity-20 group-hover:opacity-100 transform duration-300 ease-in' />
                        </HashLink>
                      </div>

                      {/* for caregivers section */}
                      <div className='w-1/2 flex flex-col items-start gap-1'>
                        <h1 className='font-semibold text-fmd'>Caregivers</h1>
                        <HashLink
                          onClick={() => setOpenForCaregivers(false)}
                          to='/caregivers'
                          className=' group outline-0 hover:outline-1 outline-gray-400/30 hover:bg-sky-100 rounded-[0.3em]  w-full flex flex-row items-center justify-start gap-1 px-1'
                        >
                          <p className='group-hover:text-blue-500 transform duration-300 ease-in '>
                            Our Caregivers
                          </p>
                          <ChevronRight className='stroke-2 w-4 mt-1 group-hover:stroke-blue-500 group-hover:translate-x-0.5 opacity-20 group-hover:opacity-100 transform duration-300 ease-in' />
                        </HashLink>
                        <Link
                          to='/caregivers/apply'
                          onClick={() => setOpenForCaregivers(false)}
                          className=' mt-2 bg-blue-600 py-1 px-2 text-gray-200 text-vsm outline-1 outline-gray-100 dark:outline-gray-600 rounded-[0.4em] hover:bg-blue-700 transform  duration-100'
                        >
                          Become Our Caregiver
                        </Link>
                      </div>
                    </div>
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </div>
            <Link
              to='/blogs/all-blogs'
              className='hover:text-blue-600 tracking-tight dark:text-gray-300 dark:hover:text-blue-600'
            >
              Blogs
            </Link>
            <Link
              to='/about-mekin'
              className='hover:text-blue-600 tracking-tight dark:text-gray-300 dark:hover:text-blue-600'
            >
              About Us
            </Link>
            <Link
              to='/contact-us'
              className='hover:text-blue-600 tracking-tight dark:text-gray-300 dark:hover:text-blue-600'
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className='flex w-1/5 sm:w-[45%] md:w-[38%] smd:w-[30%]  lg:w-[22%] slg:w-1/5  flex-row justify-around h-10 items-center '>
          <div className='hidden sm:w-3/4 sm:flex  lg:w-full flex-row justify-around h-10 items-center '>
            <Link
              to='/auth/sign-in'
              className=' bg-white dark:bg-gray-300 dark:text-gray-800 hover:bg-gray-100 transform duration-200 ease-out py-0.75 px-2 text-gray-700 text-lsm hover:text-blue-500 active:scale-95 outline-1 hover:outline-blue-600 outline-gray-300 rounded-[0.4em]'
            >
              Sign in
            </Link>
            <Link
              to={'/book-appointment'}
              className='  bg-blue-600 py-0.75 px-2 text-gray-200 text-vsm outline-1 outline-gray-100 dark:outline-gray-600 active:bg-sky-500 rounded-[0.4em] hover:bg-blue-700/90 transform hover:translate-x-0.5 duration-300'
            >
              Get care now
            </Link>
          </div>

          {/* Side bar for smaller devices */}
          <Sheet
            open={menuDialog}
            onOpenChange={() => setMenuDialog(!menuDialog)}
          >
            <SheetTrigger asChild>
              <button type='button'>
                <Menu
                  aria-hidden='true'
                  className='flex lg:hidden stroke-gray-800 dark:stroke-gray-300'
                />
                <span className='sr-only'>Open Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent className='dark:bg-gray-950 rounded-l-[0.3em] w-4/5'>
              <SheetHeader>
                <SheetTitle className={' flex flex-row items-center'}>
                  {' '}
                  <Link href='/' className='flex  items-center space-x-2'>
                    <Heart className='h-8 w-8 stroke-blue-600 dark:stroke-blue-500' />
                    <div className='flex flex-col'>
                      <span className='text-xl font-bold text-gray-900 dark:text-gray-300'>
                        MEKIN
                      </span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className='grid flex-1 overflow-y-scroll auto-rows-min gap-4 px-4'>
                <div className='w-full  px-2 py-0.5 rounded-[0.3em]  flex flex-col items-center justify-between'>
                  <div
                    onClick={() => {
                      setOpenForServicesSm(!openForServicesSm);
                      setOpenForCaregiversSm(false);
                    }}
                    className='w-full flex flex-row justify-between transform duration-500 ease-in items-center'
                  >
                    <h2>Services</h2>
                    <ChevronDown
                      className={`${openForServicesSm ? 'rotate-180' : 'rotate-0'
                        } transform duration-300 stroke-1.5 ease-in`}
                    />
                  </div>
                  <hr className='w-full bg-gray-500' />
                  <div
                    className={`w-full flex-col gap-1 animate-heigth items-end ${openForServicesSm ? 'flex' : 'hidden'
                      }`}
                  >
                    <div className='flex *:active:text-blue-600 *:active:underline flex-col gap-1 items-start'>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/nursing-care'
                      >
                        Nursing Care at Home
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/post-surgical-recovery'
                      >
                        Post-Surgical Recovery Care
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/chronic-disease-management'
                      >
                        Chronic Disease Management
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/special-care'
                      >
                        Elderly & Senior Care
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/disability-support'
                      >
                        Disability Support Services
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/palliative-care'
                      >
                        Palliative & End-of-Life Care
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/speech-therapy'
                      >
                        Speech Therapy
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/physiotherapy'
                      >
                        Physiotherapy
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/postnatal-care'
                      >
                        Postnatal care
                      </HashLink>
                      <HashLink
                        onClick={() => setMenuDialog(false)}
                        to='/services/iv-therapy'
                      >
                        Iv Therapy
                      </HashLink>
                    </div>
                  </div>
                </div>
                <div className='w-full  px-2 py-0.5 rounded-[0.3em]  flex flex-col items-center justify-between'>
                  <div
                    onClick={() => {
                      setOpenForServicesSm(false);
                      setOpenForCaregiversSm(!openForCaregiversSm);
                    }}
                    className='w-full flex flex-row justify-between transform duration-500 ease-in items-center'
                  >
                    <h2>Caregivers</h2>
                    <ChevronDown
                      className={`${openForCaregiversSm ? 'rotate-180' : 'rotate-0'
                        } transform duration-300 stroke-1.5 ease-in`}
                    />
                  </div>
                  <hr className='w-full bg-gray-500' />
                  <div
                    className={`w-full flex-col gap-1 animate-heigth items-end ${openForCaregiversSm ? 'flex' : 'hidden'
                      }`}
                  >
                    <div
                      onClick={() => setMenuDialog(false)}
                      className='flex *:active:text-blue-600 *:active:underline flex-col gap-1 items-start'
                    >
                      <HashLink to='/caregivers#vetting-process'>
                        Our Vetting Process
                      </HashLink>

                      <HashLink to='/caregivers#certification'>
                        Certification
                      </HashLink>
                      <HashLink to='/caregivers#quality-assurance'>
                        Quality Assurance
                      </HashLink>

                      <HashLink to='/caregivers#requirements'>
                        Requirements
                      </HashLink>
                    </div>
                  </div>
                </div>

                <Link onClick={() => setMenuDialog(false)} to='/blogs'>
                  Blogs
                </Link>
                <Link onClick={() => setMenuDialog(false)} to='/about-mekin'>
                  About Us
                </Link>
                <Link onClick={() => setMenuDialog(false)} to='/contact-us'>
                  Contact Us
                </Link>
                <Button
                  onClick={() => {
                    setMenuDialog(false);
                    navigateTo('/caregivers/apply');
                  }}
                >
                  Apply As Caregiver
                </Button>

                <Button
                  onClick={() => {
                    setMenuDialog(false);
                    navigateTo('/auth/sign-in');
                  }}
                >
                  Sign In
                </Button>

                <Button
                  onClick={() => {
                    setMenuDialog(false);
                    navigateTo('/auth/sign-up');
                  }}
                >
                  Create Account
                </Button>
                <Button
                  onClick={() => {
                    setMenuDialog(false);
                    navigateTo('/book-appointment');
                  }}
                >
                  Get Care Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
