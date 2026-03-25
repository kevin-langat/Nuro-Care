import { useContext, useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  Settings,
  Plus,
  Phone,
  Clock,
  Activity,
  Menu,
  X,
  Bell,
  Heart,
  Download,
  Eye,
  CheckCircle,
  Star,
  TrendingUp,
  Home,
  Pill,
  Stethoscope,
  CalendarCheck,
  Wallet,
  Shield,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Toaster } from '../components/ui/sonner';
import { globalState } from '@/context/GlobalContext';
import { PatientAppointmentSheet } from './components/AppointmentSheet';
import PatientDashBookAppointment from './components/BookAppointment';

// Mock Patient Data
const patientData = {
  name: 'Jane Kamau',
  email: 'jane.kamau@example.com',
  phone: '+254 712 345 678',
  location: 'Westlands, Nairobi',
  memberSince: 'January 2025',
  patientId: 'MHC-2026-001',
  emergencyContact: '+254 723 456 789',
};

const mockAppointments = [
  {
    id: 1,
    service: 'Elderly Care',
    caregiver: 'Mary Wanjiku',
    caregiverRating: 4.8,
    date: '2026-01-10',
    time: '09:00 AM',
    status: 'Upcoming',
    location: 'Home Visit',
    duration: '4 hours',
    amount: 5000,
    notes: 'Regular checkup and assistance',
  },
  {
    id: 2,
    service: 'Physiotherapy',
    caregiver: 'Grace Akinyi',
    caregiverRating: 4.9,
    date: '2026-01-12',
    time: '02:00 PM',
    status: 'Upcoming',
    location: 'Home Visit',
    duration: '2 hours',
    amount: 6500,
    notes: 'Lower back therapy session',
  },
  {
    id: 3,
    service: 'Medication Management',
    caregiver: 'Lucy Njeri',
    caregiverRating: 4.7,
    date: '2026-01-08',
    time: '10:00 AM',
    status: 'Completed',
    location: 'Home Visit',
    duration: '3 hours',
    amount: 4500,
    notes: 'Weekly medication review',
  },
  {
    id: 4,
    service: 'Elderly Care',
    caregiver: 'Mary Wanjiku',
    caregiverRating: 4.8,
    date: '2026-01-05',
    time: '09:00 AM',
    status: 'Completed',
    location: 'Home Visit',
    duration: '4 hours',
    amount: 5000,
    notes: 'Daily care assistance',
  },
  {
    id: 5,
    service: 'Companionship',
    caregiver: 'Jane Nyambura',
    caregiverRating: 4.9,
    date: '2026-01-03',
    time: '03:00 PM',
    status: 'Completed',
    location: 'Home Visit',
    duration: '4 hours',
    amount: 3500,
    notes: 'Social interaction and activities',
  },
];

const mockCaregivers = [
  {
    id: 1,
    name: 'Mary Wanjiku',
    specialty: 'Elderly Care',
    rating: 4.8,
    totalVisits: 12,
    image: 'MW',
    nextVisit: '2026-01-10',
    phone: '+254 711 111 111',
    experience: '5 years',
  },
  {
    id: 2,
    name: 'Grace Akinyi',
    specialty: 'Physiotherapy',
    rating: 4.9,
    totalVisits: 8,
    image: 'GA',
    nextVisit: '2026-01-12',
    phone: '+254 722 222 222',
    experience: '3 years',
  },
  {
    id: 3,
    name: 'Lucy Njeri',
    specialty: 'Medication Management',
    rating: 4.7,
    totalVisits: 15,
    image: 'LN',
    nextVisit: 'TBD',
    phone: '+254 733 333 333',
    experience: '7 years',
  },
];

const mockPayments = [
  {
    id: 1,
    transactionId: 'MPESA001234',
    service: 'Elderly Care',
    amount: 5000,
    date: '2026-01-08 14:30',
    status: 'Completed',
    method: 'M-Pesa',
    receipt: 'RCP-001234',
  },
  {
    id: 2,
    transactionId: 'MPESA001235',
    service: 'Physiotherapy',
    amount: 6500,
    date: '2026-01-06 15:45',
    status: 'Completed',
    method: 'M-Pesa',
    receipt: 'RCP-001235',
  },
  {
    id: 3,
    transactionId: 'MPESA001236',
    service: 'Medication Management',
    amount: 4500,
    date: '2026-01-05 16:20',
    status: 'Completed',
    method: 'M-Pesa',
    receipt: 'RCP-001236',
  },
  {
    id: 4,
    transactionId: 'MPESA001237',
    service: 'Companionship',
    amount: 3500,
    date: '2026-01-03 11:10',
    status: 'Completed',
    method: 'M-Pesa',
    receipt: 'RCP-001237',
  },
];

const mockReports = [
  {
    id: 1,
    title: 'Weekly Progress Report',
    date: '2026-01-08',
    type: 'Progress Report',
    caregiver: 'Mary Wanjiku',
    summary:
      'Patient showing good improvement in mobility and daily activities. Appetite stable.',
    status: 'Available',
  },
  {
    id: 2,
    title: 'Physiotherapy Session Notes',
    date: '2026-01-06',
    type: 'Session Notes',
    caregiver: 'Grace Akinyi',
    summary:
      'Completed lower back exercises. Patient reports reduced pain. Continue with current routine.',
    status: 'Available',
  },
  {
    id: 3,
    title: 'Medication Review',
    date: '2026-01-05',
    type: 'Medical Record',
    caregiver: 'Lucy Njeri',
    summary:
      'All medications taken as prescribed. No adverse reactions noted. Blood pressure stable.',
    status: 'Available',
  },
  {
    id: 4,
    title: 'Monthly Health Summary',
    date: '2025-12-30',
    type: 'Health Summary',
    caregiver: 'System Generated',
    summary:
      'Overall health stable. All vital signs within normal range. Recommended continuation of care plan.',
    status: 'Available',
  },
];

const healthMetricsData = [
  { date: 'Jan 1', bloodPressure: 120, heartRate: 72, steps: 3200 },
  { date: 'Jan 2', bloodPressure: 118, heartRate: 70, steps: 3500 },
  { date: 'Jan 3', bloodPressure: 122, heartRate: 74, steps: 3100 },
  { date: 'Jan 4', bloodPressure: 119, heartRate: 71, steps: 3800 },
  { date: 'Jan 5', bloodPressure: 121, heartRate: 73, steps: 3600 },
  { date: 'Jan 6', bloodPressure: 120, heartRate: 72, steps: 4000 },
  { date: 'Jan 7', bloodPressure: 118, heartRate: 70, steps: 3900 },
];

const appointmentActivityData = [
  { month: 'Aug', appointments: 8 },
  { month: 'Sep', appointments: 10 },
  { month: 'Oct', appointments: 12 },
  { month: 'Nov', appointments: 11 },
  { month: 'Dec', appointments: 13 },
  { month: 'Jan', appointments: 6 },
];

const services = [
  {
    id: 1,
    name: 'Elderly Care',
    description: 'Comprehensive care for senior citizens',
    price: 5000,
    duration: '4 hours',
    icon: Heart,
  },
  {
    id: 2,
    name: 'Physiotherapy',
    description: 'Physical rehabilitation and therapy',
    price: 6500,
    duration: '2 hours',
    icon: Activity,
  },
  {
    id: 3,
    name: 'Medication Management',
    description: 'Help with medication schedules',
    price: 4500,
    duration: '3 hours',
    icon: Pill,
  },
  {
    id: 4,
    name: 'Post-Surgery Care',
    description: 'Recovery assistance after surgery',
    price: 8000,
    duration: '6 hours',
    icon: Stethoscope,
  },
  {
    id: 5,
    name: 'Companionship',
    description: 'Social interaction and support',
    price: 3500,
    duration: '4 hours',
    icon: Users,
  },
  {
    id: 6,
    name: 'Dementia Care',
    description: 'Specialized dementia patient care',
    price: 7500,
    duration: '6 hours',
    icon: Shield,
  },
];

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { authRes, patientAppointments } = useContext(globalState);

  const customFormatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'caregivers', label: 'My Caregivers', icon: Users },
    { id: 'payments', label: 'Payments & Billing', icon: CreditCard },
    { id: 'reports', label: 'Medical Reports', icon: FileText },
    { id: 'health', label: 'Health Metrics', icon: Activity },
    { id: 'book', label: 'Book Appointment', icon: Plus },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile & Settings', icon: Settings },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      Upcoming: 'bg-blue-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
      'In Progress': 'bg-purple-100 text-purple-700',
      Available: 'bg-green-100 text-green-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const renderDashboard = () => (
    <div className='space-y-2 md:space-y-3 overflow-hidden'>
      <Toaster />

      {/* Quick Stats */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
        <div className='bg-white p-4 md:p-6 rounded-[1em] border'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-blue-100 p-2 md:p-3 rounded-lg'>
              <CalendarCheck className='w-5 h-5 md:w-6 md:h-6 text-blue-600' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs md:text-sm font-semibold text-gray-900'>
                Upcoming
              </p>
              <p className='text-xl md:text-3xl font-semibold'>2</p>
            </div>
          </div>
          <p className='text-sm text-gray-800'>Next: Jan 10</p>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-[1em] border '>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-green-100 p-2 md:p-3 rounded-lg'>
              <CheckCircle className='w-5 h-5 md:w-6 md:h-6 text-green-600' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs md:text-sm font-semibold text-gray-600'>
                Completed
              </p>
              <p className='text-xl md:text-3xl font-semibold'>24</p>
            </div>
          </div>
          <p className='text-sm text-gray-800'>This year</p>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-[1em] border '>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-purple-100 p-2 md:p-3 rounded-lg'>
              <Users className='w-5 h-5 md:w-6 md:h-6 text-purple-600' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs md:text-sm font-semibold text-gray-900'>
                Caregivers
              </p>
              <p className='text-xl md:text-3xl font-semibold'>3</p>
            </div>
          </div>
          <p className='text-sm text-gray-800'>Assigned</p>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-[1em] border '>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-orange-100 p-2 md:p-3 rounded-lg'>
              <Wallet className='w-5 h-5 md:w-6 md:h-6 text-orange-600' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs md:text-sm font-semibold text-gray-900'>
                This Month
              </p>
              <p className='text-xl md:text-3xl font-semibold'>16K</p>
            </div>
          </div>
          <p className='text-sm text-gray-800'>KES spent</p>
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>
            Health Metrics Trend
          </h3>
          <div className='w-full overflow-x-auto'>
            <div className='min-w-75'>
              <ResponsiveContainer width='100%' height={250}>
                <AreaChart data={healthMetricsData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    type='monotone'
                    dataKey='bloodPressure'
                    stroke='#3b82f6'
                    fill='#3b82f6'
                    fillOpacity={0.6}
                    name='Blood Pressure'
                  />
                  <Area
                    type='monotone'
                    dataKey='heartRate'
                    stroke='#10b981'
                    fill='#10b981'
                    fillOpacity={0.3}
                    name='Heart Rate'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>
            Appointment Activity
          </h3>
          <div className='w-full overflow-x-auto'>
            <div className='min-w-75'>
              <ResponsiveContainer width='100%' height={250}>
                <BarChart data={appointmentActivityData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey='appointments'
                    fill='#8b5cf6'
                    name='Appointments'
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments & Quick Actions */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-base md:text-lg'>Upcoming Appointments</h3>
            <button
              onClick={() => setActiveTab('appointments')}
              className='text-sm text-blue-600 hover:underline'
            >
              View All
            </button>
          </div>
          <div className='space-y-3'>
            {mockAppointments
              .filter((a) => a.status === 'Upcoming')
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className='border border-gray-200 rounded-lg p-3 md:p-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='flex flex-col sm:flex-row justify-between gap-3'>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-2'>
                        <div>
                          <h4 className='font-medium text-sm md:text-base'>
                            {appointment.service}
                          </h4>
                          <p className='text-xs md:text-sm text-gray-600 mt-1'>
                            with {appointment.caregiver}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            appointment.status,
                          )} ml-2`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-xs md:text-sm text-gray-600'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3 md:w-4 md:h-4' />
                          {appointment.date}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='w-3 h-3 md:w-4 md:h-4' />
                          {appointment.time}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Home className='w-3 h-3 md:w-4 md:h-4' />
                          {appointment.location}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Star className='w-3 h-3 md:w-4 md:h-4 text-yellow-500' />
                          {appointment.caregiverRating} Rating
                        </div>
                      </div>
                    </div>
                    <div className='flex sm:flex-col gap-2'>
                      <button className='flex-1 sm:flex-initial px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs md:text-sm hover:bg-blue-100 whitespace-nowrap'>
                        View Details
                      </button>
                      <button className='flex-1 sm:flex-initial px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs md:text-sm hover:bg-gray-100 whitespace-nowrap'>
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-4'>Quick Actions</h3>
          <div className='space-y-3'>
            <button
              onClick={() => setActiveTab('book')}
              className='w-full p-3 md:p-4 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-3 text-left'
            >
              <Plus className='w-5 h-5' />
              <div>
                <div className='font-medium text-sm md:text-base'>
                  Book Appointment
                </div>
                <div className='text-xs text-blue-100'>Schedule new care</div>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className='w-full p-3 md:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3 text-left'
            >
              <MessageSquare className='w-5 h-5 text-gray-600' />
              <div>
                <div className='font-medium text-sm md:text-base'>
                  Contact Support
                </div>
                <div className='text-xs text-gray-600'>Get help anytime</div>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className='w-full p-3 md:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3 text-left'
            >
              <FileText className='w-5 h-5 text-gray-600' />
              <div>
                <div className='font-medium text-sm md:text-base'>
                  View Reports
                </div>
                <div className='text-xs text-gray-600'>Medical records</div>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className='w-full p-3 md:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3 text-left'
            >
              <CreditCard className='w-5 h-5 text-gray-600' />
              <div>
                <div className='font-medium text-sm md:text-base'>
                  Payment History
                </div>
                <div className='text-xs text-gray-600'>View transactions</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
        <div>
          <h2 className='text-xl md:text-2xl'>My Appointments</h2>
          <p className='text-xs md:text-sm text-gray-600 mt-1'>
            View and manage your care appointments
          </p>
        </div>
        <button
          onClick={() => setActiveTab('book')}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base flex items-center gap-2 w-full sm:w-auto justify-center'
        >
          <Plus className='w-4 h-4' />
          New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          <button className='px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium'>
            All ({patientAppointments?.length})
          </button>
          <button className='px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100'>
            Upcoming (2)
          </button>
          <button className='px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100'>
            Completed (3)
          </button>
          <button className='px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100'>
            Cancelled (0)
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className='space-y-3 md:space-y-4'>
        {patientAppointments &&
          patientAppointments?.length > 0 &&
          patientAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'
            >
              <div className='flex flex-col lg:flex-row gap-4'>
                <div className='flex-1'>
                  <div className='flex justify-between items-start mb-3'>
                    <div>
                      <h3 className='text-base md:text-lg font-medium'>
                        {appointment.service}
                      </h3>
                      <p className='text-sm text-gray-600 mt-1'>
                        Session ID: #
                        {appointment._id.toString().padStart(6, '0')}
                      </p>
                    </div>
                    {/* {getStatusColor(
                      appointment.urgency,
                    )} */}
                    <span className={`px-3 py-1 rounded-full text-xs $`}>
                      {appointment.urgency}
                    </span>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4'>
                    <div className='flex items-center gap-2 text-sm'>
                      <Users className='w-4 h-4 text-gray-400' />
                      <div>
                        <span className='text-gray-600'>Caregiver:</span>
                        <span
                          className={`${appointment.caregiver === '' ? 'italic text-orange-500' : 'text-green-500'} ml-2 font-medium`}
                        >
                          {appointment.caregiver === ''
                            ? 'Not yet assigned'
                            : appointment.caregiver}
                        </span>
                        {appointment.caregiver !== '' ? (
                          <span className='ml-2 text-yellow-600'>★5.2</span>
                        ) : null}
                      </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Calendar className='w-4 h-4 text-gray-400' />
                      <span className='text-gray-600'>Date:</span>
                      <span className='ml-1 font-medium'>
                        {customFormatter.format(
                          new Date(appointment?.preferredDate),
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Clock className='w-4 h-4 text-gray-400' />
                      <span className='text-gray-600'>Time:</span>
                      <span className='ml-1 font-medium'>
                        {appointment.preferredTime}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Activity className='w-4 h-4 text-gray-400' />
                      <span className='text-gray-600'>Duration:</span>
                      <span className='ml-1 font-medium'>
                        {appointment.serviceDuration}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Home className='w-4 h-4 text-gray-400' />
                      <span className='text-gray-600'>Location:</span>
                      <span className='ml-1 font-medium'>
                        {appointment.area}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <CreditCard className='w-4 h-4 text-gray-400' />
                      <span className='text-gray-600'>Amount:</span>
                      <span
                        className={`${appointment.amount === null ? ' italic text-orange-500' : 'text-green-400'} ml-1 font-medium`}
                      >
                        {appointment.amount === null
                          ? 'Waiting for approval'
                          : `KES ${appointment.amount}`}
                      </span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className='bg-gray-50 p-3 rounded-lg'>
                      <p className='text-sm text-gray-600'>
                        <span className='font-medium'>Notes:</span>{' '}
                        {appointment.additionalNotes}
                      </p>
                    </div>
                  )}
                </div>

                <div className='flex lg:flex-col gap-2 lg:w-40'>
                  {appointment.urgency === 'soon' ? (
                    <>
                      <button
                        onClick={() => setSheetOpen(true)}
                        className='flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100'
                      >
                        View Details
                      </button>
                      <button className='flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100'>
                        Reschedule
                      </button>
                      <button className='flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100'>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100'>
                        View Report
                      </button>
                      <button className='flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100'>
                        Rebook
                      </button>
                      <button className='flex-1 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-sm hover:bg-yellow-100'>
                        Rate
                      </button>
                    </>
                  )}
                </div>
                <PatientAppointmentSheet
                  open={sheetOpen}
                  setSheetOpen={setSheetOpen}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderCaregivers = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>My Caregivers</h2>
        <p className='text-xs md:text-sm text-gray-600 mt-1'>
          Your assigned healthcare professionals
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {mockCaregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'
          >
            <div className='flex items-start gap-4 mb-4'>
              <div className='w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shrink-0'>
                <span className='text-lg md:text-xl'>{caregiver.image}</span>
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-base md:text-lg font-medium truncate'>
                  {caregiver.name}
                </h3>
                <p className='text-xs md:text-sm text-gray-600'>
                  {caregiver.specialty}
                </p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                  <span className='text-sm font-medium'>
                    {caregiver.rating}
                  </span>
                  <span className='text-xs text-gray-500'>
                    ({caregiver.totalVisits} visits)
                  </span>
                </div>
              </div>
            </div>

            <div className='space-y-2 mb-4 text-xs md:text-sm'>
              <div className='flex items-center gap-2 text-gray-600'>
                <Clock className='w-4 h-4' />
                {caregiver.experience} experience
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <Phone className='w-4 h-4' />
                {caregiver.phone}
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <Calendar className='w-4 h-4' />
                Next visit: {caregiver.nextVisit}
              </div>
            </div>

            <div className='flex gap-2'>
              <button className='flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs md:text-sm hover:bg-blue-100'>
                Contact
              </button>
              <button className='flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs md:text-sm hover:bg-gray-100'>
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
        <div>
          <h2 className='text-xl md:text-2xl'>Payments & Billing</h2>
          <p className='text-xs md:text-sm text-gray-600 mt-1'>
            Track your M-Pesa payments and billing history
          </p>
        </div>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base flex items-center gap-2 w-full sm:w-auto justify-center'>
          <Download className='w-4 h-4' />
          Download Statement
        </button>
      </div>

      {/* Payment Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>This Month</p>
          <p className='text-lg md:text-2xl font-semibold mt-1'>KES 16,000</p>
          <p className='text-xs text-gray-500 mt-1'>4 payments</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Total Spent</p>
          <p className='text-lg md:text-2xl font-semibold mt-1'>KES 120K</p>
          <p className='text-xs text-gray-500 mt-1'>All time</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Avg. Payment</p>
          <p className='text-lg md:text-2xl font-semibold mt-1'>KES 5,200</p>
          <p className='text-xs text-gray-500 mt-1'>Per session</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Next Due</p>
          <p className='text-lg md:text-2xl font-semibold mt-1'>KES 5,000</p>
          <p className='text-xs text-gray-500 mt-1'>Jan 10, 2026</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className='hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left py-4 px-4 text-sm'>Transaction ID</th>
                <th className='text-left py-4 px-4 text-sm'>Service</th>
                <th className='text-left py-4 px-4 text-sm'>Amount</th>
                <th className='text-left py-4 px-4 text-sm'>Date & Time</th>
                <th className='text-left py-4 px-4 text-sm'>Method</th>
                <th className='text-left py-4 px-4 text-sm'>Status</th>
                <th className='text-left py-4 px-4 text-sm'>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className='border-b hover:bg-gray-50'>
                  <td className='py-4 px-4 font-mono text-sm'>
                    {payment.transactionId}
                  </td>
                  <td className='py-4 px-4 text-sm'>{payment.service}</td>
                  <td className='py-4 px-4 font-medium text-sm text-green-600'>
                    KES {payment.amount.toLocaleString()}
                  </td>
                  <td className='py-4 px-4 text-sm'>{payment.date}</td>
                  <td className='py-4 px-4 text-sm'>
                    <span className='px-2 py-1 bg-green-100 text-green-700 rounded text-xs'>
                      {payment.method}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        payment.status,
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    <button className='text-blue-600 hover:underline text-sm flex items-center gap-1'>
                      <Download className='w-4 h-4' />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className='md:hidden space-y-3'>
        {mockPayments.map((payment) => (
          <div
            key={payment.id}
            className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'
          >
            <div className='flex justify-between items-start mb-3'>
              <div>
                <p className='font-mono text-xs text-gray-600'>
                  {payment.transactionId}
                </p>
                <p className='font-medium mt-1'>{payment.service}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  payment.status,
                )}`}
              >
                {payment.status}
              </span>
            </div>

            <div className='space-y-2 text-sm mb-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Amount:</span>
                <span className='font-medium text-green-600'>
                  KES {payment.amount.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Method:</span>
                <span className='px-2 py-1 bg-green-100 text-green-700 rounded text-xs'>
                  {payment.method}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Date:</span>
                <span className='text-xs'>{payment.date}</span>
              </div>
            </div>

            <button className='w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 flex items-center justify-center gap-1'>
              <Download className='w-4 h-4' />
              Download Receipt
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Medical Reports</h2>
        <p className='text-xs md:text-sm text-gray-600 mt-1'>
          Access your care reports and progress tracking
        </p>
      </div>

      <div className='space-y-3 md:space-y-4'>
        {mockReports.map((report) => (
          <div
            key={report.id}
            className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'
          >
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <div className='flex flex-col sm:flex-row justify-between items-start gap-2 mb-3'>
                  <div>
                    <h3 className='text-base md:text-lg font-medium'>
                      {report.title}
                    </h3>
                    <p className='text-xs md:text-sm text-gray-600 mt-1'>
                      {report.type} • {report.date} • by {report.caregiver}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      report.status,
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <p className='text-sm text-gray-700 bg-gray-50 p-3 rounded-lg'>
                  {report.summary}
                </p>
              </div>

              <div className='flex md:flex-col gap-2 md:w-40'>
                <button className='flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 flex items-center justify-center gap-1'>
                  <Eye className='w-4 h-4' />
                  View
                </button>
                <button className='flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 flex items-center justify-center gap-1'>
                  <Download className='w-4 h-4' />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Health Metrics</h2>
        <p className='text-xs md:text-sm text-gray-600 mt-1'>
          Track your health vitals and progress
        </p>
      </div>

      {/* Current Vitals */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center gap-2 mb-2'>
            <Activity className='w-5 h-5 text-red-500' />
            <p className='text-xs md:text-sm text-gray-600'>Blood Pressure</p>
          </div>
          <p className='text-xl md:text-2xl font-semibold'>120/80</p>
          <p className='text-xs text-green-600 mt-1'>Normal</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center gap-2 mb-2'>
            <Heart className='w-5 h-5 text-pink-500' />
            <p className='text-xs md:text-sm text-gray-600'>Heart Rate</p>
          </div>
          <p className='text-xl md:text-2xl font-semibold'>72 bpm</p>
          <p className='text-xs text-green-600 mt-1'>Healthy</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-blue-500' />
            <p className='text-xs md:text-sm text-gray-600'>Steps Today</p>
          </div>
          <p className='text-xl md:text-2xl font-semibold'>3,900</p>
          <p className='text-xs text-gray-500 mt-1'>Goal: 5,000</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center gap-2 mb-2'>
            <Activity className='w-5 h-5 text-purple-500' />
            <p className='text-xs md:text-sm text-gray-600'>Overall Score</p>
          </div>
          <p className='text-xl md:text-2xl font-semibold'>85/100</p>
          <p className='text-xs text-green-600 mt-1'>Good</p>
        </div>
      </div>

      {/* Charts */}
      <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
        <h3 className='text-base md:text-lg mb-4'>7-Day Trends</h3>
        <div className='w-full overflow-x-auto'>
          <div className='min-w-75'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={healthMetricsData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type='monotone'
                  dataKey='bloodPressure'
                  stroke='#3b82f6'
                  strokeWidth={2}
                  name='Blood Pressure'
                />
                <Line
                  type='monotone'
                  dataKey='heartRate'
                  stroke='#ec4899'
                  strokeWidth={2}
                  name='Heart Rate'
                />
                <Line
                  type='monotone'
                  dataKey='steps'
                  stroke='#10b981'
                  strokeWidth={2}
                  name='Steps (÷10)'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookAppointment = () => <PatientDashBookAppointment />;
  const renderMessages = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Messages</h2>
        <p className='text-xs md:text-sm text-gray-600 mt-1'>
          Chat with caregivers and support team
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <h3 className='text-base font-medium mb-4'>Conversations</h3>
          <div className='space-y-2'>
            {mockCaregivers.map((caregiver) => (
              <button
                key={caregiver.id}
                className='w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left border border-gray-100'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shrink-0'>
                    {caregiver.image}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-sm truncate'>
                      {caregiver.name}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>
                      Click to message
                    </p>
                  </div>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                </div>
              </button>
            ))}
            <button className='w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left border border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shrink-0'>
                  <MessageSquare className='w-5 h-5' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-medium text-sm'>Support Team</p>
                  <p className='text-xs text-gray-500'>Available 24/7</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className='lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-12 flex items-center justify-center'>
          <div className='text-center'>
            <MessageSquare className='w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-base md:text-lg mb-2'>Select a conversation</h3>
            <p className='text-xs md:text-base text-gray-600'>
              Choose a caregiver or support to start messaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Profile & Settings</h2>
        <p className='text-xs md:text-sm text-gray-600 mt-1'>
          Manage your account information
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
        {/* Profile Card */}
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <div className='w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl mx-auto mb-4'>
              {patientData.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <h3 className='text-lg md:text-xl font-medium'>
              {patientData.name}
            </h3>
            <p className='text-sm text-gray-600'>{patientData.patientId}</p>
            <p className='text-xs text-gray-500 mt-2'>
              Member since {patientData.memberSince}
            </p>
            <button className='mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm w-full'>
              Change Photo
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className='lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-4'>Personal Information</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name
              </label>
              <input
                type='text'
                defaultValue={patientData.name}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                defaultValue={patientData.email}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Phone Number
              </label>
              <input
                type='tel'
                defaultValue={patientData.phone}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Emergency Contact
              </label>
              <input
                type='tel'
                defaultValue={patientData.emergencyContact}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Home Address
              </label>
              <input
                type='text'
                defaultValue={patientData.location}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-4'>Notifications</h3>
          <div className='space-y-3'>
            {[
              'Email notifications for appointments',
              'SMS reminders',
              'Payment confirmations',
              'Care report updates',
            ].map((setting, index) => (
              <div
                key={index}
                className='flex items-center justify-between py-2'
              >
                <span className='text-xs md:text-sm'>{setting}</span>
                <label className='relative inline-block w-11 h-6'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked={index % 2 === 0}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-4'>Security</h3>
          <div className='space-y-3'>
            <button className='w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm'>
              Change Password
            </button>
            <button className='w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm'>
              Two-Factor Authentication
            </button>
            <button className='w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm'>
              Privacy Settings
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col-reverse sm:flex-row justify-end gap-3'>
        <button className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm md:text-base'>
          Cancel
        </button>
        <button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base'>
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'appointments':
        return renderAppointments();
      case 'caregivers':
        return renderCaregivers();
      case 'payments':
        return renderPayments();
      case 'reports':
        return renderReports();
      case 'health':
        return renderHealth();
      case 'book':
        return renderBookAppointment();
      case 'messages':
        return renderMessages();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Patient Dashboard - Mekin Home Care | Manage Your Care</title>
      <meta
        name='description'
        content='Manage your home care appointments, view medical reports, track health metrics, and communicate with caregivers through Mekin Home Care patient portal.'
      />
      <meta
        name='keywords'
        content='patient portal, home care dashboard, health tracking, appointments, medical reports, Nairobi healthcare'
      />
      <meta property='og:title' content='Mekin Home Care - Patient Dashboard' />
      <meta
        property='og:description'
        content='Your personal home care management portal'
      />
      <meta property='og:type' content='website' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      />

      <div className='flex h-screen bg-gray-50 overflow-hidden'>
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          fixed lg:relative inset-y-0 left-0 z-50
          ${
            mobileSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
          ${sidebarOpen ? 'w-52' : 'w-64 lg:w-20'} 
          bg-gray-100 rounded-[0.5em] outline-1 outline-gray-300  transition-all duration-300 flex flex-col
        `}
        >
          {/* Logo */}
          <div className='h-14 md:h-16 flex items-center justify-between px-4'>
            {(sidebarOpen || mobileSidebarOpen) && (
              <div>
                <h1 className='text-lg md:text-xl text-blue-600'>Mekin Care</h1>
                <p className='text-xs text-gray-500'>Patient Portal</p>
              </div>
            )}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileSidebarOpen(false);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className='p-2 hover:bg-gray-100 rounded-lg'
            >
              {mobileSidebarOpen ? <X className='w-5 h-5 lg:hidden' /> : null}
              <Menu className='w-5 h-5 hidden lg:block' />
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 overflow-y-auto py-2 md:py-4'>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className='w-5 h-5 shrink-0' />
                  {(sidebarOpen || mobileSidebarOpen) && (
                    <span className='text-sm'>{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className='p-4 border-t border-gray-200'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-linear-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white shrink-0'>
                {patientData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              {(sidebarOpen || mobileSidebarOpen) && (
                <div className='flex-1 min-w-0'>
                  <div className='text-sm truncate'>{patientData.name}</div>
                  <div className='text-xs text-gray-500 truncate'>
                    {patientData.email}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 flex flex-col items-center justify-center overflow-hidden w-full'>
          {/* Header */}
          <header className='h-14 md:h-16 bg-gray-50 mt-0.5 z-50   flex items-center justify-between px-3 outline-1 w-[97%] rounded-[0.5em] outline-gray-300 md:px-6 shrink-0'>
            <div className='flex items-center gap-2 md:gap-3 min-w-0 flex-1'>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className='lg:hidden p-2 hover:bg-gray-100 rounded-lg shrink-0'
              >
                <Menu className='w-5 h-5' />
              </button>
              <div className=' w-11/12 justify-between flex flex-row items-center'>
                <div>
                  <h2 className='text-lg font-bold text-blue-500'>
                    Habari, Kevin! Karibu Tena.
                  </h2>
                  <p className='text-md'>
                    Everything is set for your wellness and comfort.
                  </p>
                </div>
                <div className='min-w-0'>
                  <h2 className='text-base md:text-xl text-gray-950 truncate'>
                    {
                      navigationItems.find((item) => item.id === activeTab)
                        ?.label
                    }
                  </h2>
                  <p className='text-xs md:text-sm text-gray-800 hidden sm:block'>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 md:gap-4 shrink-0'>
              <button className='relative p-2 hover:bg-gray-100 rounded-lg'>
                <Bell className='w-4 h-4 md:w-5 md:h-5' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
              </button>
            </div>
          </header>

          {/* Content Area */}
          <div className='flex-1 overflow-y-auto md:p-4'>{renderContent()}</div>
        </main>
      </div>
    </>
  );
}
