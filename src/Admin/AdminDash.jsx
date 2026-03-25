import { useContext, useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  CreditCard,
  TrendingUp,
  Settings,
  FileText,
  MessageSquare,
  UserPlus,
  CircleCheck,
  CircleX,
  Search,
  Download,
  Plus,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Bell,
  Eye,
  Check,
  ChevronLeft,
  LogOut,
  Trash,
  Trash2Icon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { fetchAppointmentsForAdmin } from '@/APIs/Appointments';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { AdminAppointmentSheet } from './components/AppointmentSheet';
import { ViewAppointmentSheet } from './components/ViewAppointmentSheet';
import { logoutUser } from '@/APIs/User';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { globalState } from '@/context/GlobalContext';
import {
  addHeroImage,
  addTrustVideo,
  createANewService,
  fetchAllServices,
  setAdminProfileImage,
  updateHeroInfo,
  uploadServiceImages,
} from '@/APIs/Admin';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import {
  INITIAL_SERVICE_STATE,
  navigationItems,
  SERVICE_INPUT_DATA,
} from '@/config/admin';
import { Separator } from '@/components/ui/separator';
// Mock Data
const mockAppointments = [
  {
    id: 1,
    patientName: 'Jane Kamau',
    caregiver: 'Mary Wanjiku',
    service: 'Elderly Care',
    date: '2026-01-08',
    time: '09:00 AM',
    status: 'Confirmed',
    location: 'Westlands, Nairobi',
    phone: '+254 712 345 678',
    payment: 'Paid',
    amount: 5000,
  },
  {
    id: 2,
    patientName: 'John Ochieng',
    caregiver: 'Pending',
    service: 'Post-Surgery Care',
    date: '2026-01-09',
    time: '11:00 AM',
    status: 'Pending',
    location: 'Kilimani, Nairobi',
    phone: '+254 723 456 789',
    payment: 'Pending',
    amount: 8000,
  },
  {
    id: 3,
    patientName: 'Sarah Muthoni',
    caregiver: 'Grace Akinyi',
    service: 'Physiotherapy',
    date: '2026-01-08',
    time: '02:00 PM',
    status: 'In Progress',
    location: 'Karen, Nairobi',
    phone: '+254 734 567 890',
    payment: 'Paid',
    amount: 6500,
  },
  {
    id: 4,
    patientName: 'David Kipchoge',
    caregiver: 'Lucy Njeri',
    service: 'Medication Management',
    date: '2026-01-10',
    time: '10:00 AM',
    status: 'Confirmed',
    location: 'Lavington, Nairobi',
    phone: '+254 745 678 901',
    payment: 'Paid',
    amount: 4500,
  },
  {
    id: 5,
    patientName: 'Rebecca Wambui',
    caregiver: 'Pending',
    service: 'Companionship',
    date: '2026-01-11',
    time: '03:00 PM',
    status: 'Pending',
    location: 'Runda, Nairobi',
    phone: '+254 756 789 012',
    payment: 'Pending',
    amount: 3500,
  },
  {
    id: 6,
    patientName: 'Peter Otieno',
    caregiver: 'Jane Nyambura',
    service: 'Dementia Care',
    date: '2026-01-07',
    time: '08:00 AM',
    status: 'Completed',
    location: 'Parklands, Nairobi',
    phone: '+254 767 890 123',
    payment: 'Paid',
    amount: 7500,
  },
];

const mockCaregivers = [
  {
    id: 1,
    name: 'Mary Wanjiku',
    specialty: 'Elderly Care',
    experience: '5 years',
    rating: 4.8,
    status: 'Active',
    phone: '+254 711 111 111',
    email: 'mary@mekin.care',
    completedJobs: 156,
    location: 'Westlands',
  },
  {
    id: 2,
    name: 'Grace Akinyi',
    specialty: 'Physiotherapy',
    experience: '3 years',
    rating: 4.9,
    status: 'Active',
    phone: '+254 722 222 222',
    email: 'grace@mekin.care',
    completedJobs: 98,
    location: 'Kilimani',
  },
  {
    id: 3,
    name: 'Lucy Njeri',
    specialty: 'Medication Management',
    experience: '7 years',
    rating: 4.7,
    status: 'Active',
    phone: '+254 733 333 333',
    email: 'lucy@mekin.care',
    completedJobs: 203,
    location: 'Karen',
  },
  {
    id: 4,
    name: 'Jane Nyambura',
    specialty: 'Dementia Care',
    experience: '4 years',
    rating: 4.9,
    status: 'Active',
    phone: '+254 744 444 444',
    email: 'jane@mekin.care',
    completedJobs: 142,
    location: 'Lavington',
  },
];

const mockApplicants = [
  {
    id: 1,
    name: 'Elizabeth Chebet',
    specialty: 'Palliative Care',
    experience: '6 years',
    appliedDate: '2026-01-03',
    phone: '+254 755 555 555',
    email: 'elizabeth@example.com',
    certifications: 'RN, Palliative Care Cert',
    status: 'Under Review',
  },
  {
    id: 2,
    name: 'Samuel Mwangi',
    specialty: 'Physical Therapy',
    experience: '2 years',
    appliedDate: '2026-01-04',
    phone: '+254 766 666 666',
    email: 'samuel@example.com',
    certifications: 'PT License',
    status: 'Under Review',
  },
  {
    id: 3,
    name: 'Ann Wairimu',
    specialty: 'Elderly Care',
    experience: '8 years',
    appliedDate: '2026-01-05',
    phone: '+254 777 777 777',
    email: 'ann@example.com',
    certifications: 'CNA, Geriatric Care Cert',
    status: 'Interview Scheduled',
  },
];

const mockPayments = [
  {
    id: 1,
    transactionId: 'MPESA001234',
    patientName: 'Jane Kamau',
    amount: 5000,
    date: '2026-01-06 14:30',
    method: 'M-Pesa',
    status: 'Completed',
    phone: '+254712345678',
    service: 'Elderly Care',
  },
  {
    id: 2,
    transactionId: 'MPESA001235',
    patientName: 'Sarah Muthoni',
    amount: 6500,
    date: '2026-01-06 15:45',
    method: 'M-Pesa',
    status: 'Completed',
    phone: '+254734567890',
    service: 'Physiotherapy',
  },
  {
    id: 3,
    transactionId: 'MPESA001236',
    patientName: 'David Kipchoge',
    amount: 4500,
    date: '2026-01-06 16:20',
    method: 'M-Pesa',
    status: 'Completed',
    phone: '+254745678901',
    service: 'Medication Management',
  },
  {
    id: 4,
    transactionId: 'MPESA001237',
    patientName: 'John Ochieng',
    amount: 8000,
    date: '2026-01-06 17:10',
    method: 'M-Pesa',
    status: 'Pending',
    phone: '+254723456789',
    service: 'Post-Surgery Care',
  },
  {
    id: 5,
    transactionId: 'MPESA001238',
    patientName: 'Peter Otieno',
    amount: 7500,
    date: '2026-01-05 10:30',
    method: 'M-Pesa',
    status: 'Completed',
    phone: '+254767890123',
    service: 'Dementia Care',
  },
];

const appointmentTrendsData = [
  { month: 'Jul', appointments: 45, completed: 42, cancelled: 3 },
  { month: 'Aug', appointments: 52, completed: 48, cancelled: 4 },
  { month: 'Sep', appointments: 61, completed: 58, cancelled: 3 },
  { month: 'Oct', appointments: 58, completed: 53, cancelled: 5 },
  { month: 'Nov', appointments: 68, completed: 64, cancelled: 4 },
  { month: 'Dec', appointments: 75, completed: 71, cancelled: 4 },
];

const revenueData = [
  { month: 'Jul', revenue: 225000, target: 200000 },
  { month: 'Aug', revenue: 260000, target: 220000 },
  { month: 'Sep', revenue: 305000, target: 250000 },
  { month: 'Oct', revenue: 290000, target: 270000 },
  { month: 'Nov', revenue: 340000, target: 300000 },
  { month: 'Dec', revenue: 375000, target: 320000 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allAppointments, setAllAppointments] = useState(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState();
  const [openAdminQuickSettings, setOpenAdminQuickSettings] = useState(false);
  const [quickSettingsData, setQuickSettingsData] = useState({
    name: '',
    email: '',
  });
  const [pending, setPending] = useState(false);
  const [openAddNewServiceSheet, setOpenAddNewServiceSheet] = useState(false);
  const [openWarningBox, setOpenWarningBox] = useState(false);
  const [serviceCoverImage, setServiceCoverImage] = useState([]);
  const [serviceGallery, setServiceGallery] = useState([]);
  const [serviceFormData, setServiceFormData] = useState(INITIAL_SERVICE_STATE);
  const [serviceInputData, setServiceInputData] = useState(SERVICE_INPUT_DATA);
  const [serviceCategory, setServiceCategory] = useState([]);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const { authRes, fetchUserData } = useContext(globalState);
  const [servicesRes, setServiceRes] = useState([]);
  const [siteInputData, setSiteInputData] = useState({
    faq: {
      question: '',
      answer: '',
    },
    trustKeyword: '',
  });
  const [siteSettingsData, setSiteSettingsData] = useState({
    heroTitle: '',
    heroDescription: '',
    trustSectionTitle: '',
    trustSectionDescription: '',
    whyMekinTitle: '',
    whyMekinDescription: '',
    trustKeywords: [],
    homepageFaqs: [],
  });
  const [heroImage, setHeroImage] = useState(null);
  const [whyMekinVideo, setWhyMekinVideo] = useState(null);
  const [isUpdatingSiteSettings, setIsUpdatingSiteSettings] = useState('');

  const navigateTo = useNavigate();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  useEffect(() => {
    fetchAllServices()
      .then((res) => {
        setServiceRes(res.data.services);
      })
      .catch((error) => {
        toast.error(error.response?.message);
      });
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Confirmed: 'bg-blue-100 text-blue-700',
      Pending: 'bg-yellow-300 text-yellow-900',
      'In Progress': 'bg-purple-100 text-purple-700',
      Completed: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
      'Under Review': 'bg-orange-100 text-orange-700',
      'Interview Scheduled': 'bg-blue-100 text-blue-700',
      Paid: 'bg-green-100 text-green-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  useEffect(() => {
    fetchAppointmentsForAdmin()
      .then((res) => {
        setAllAppointments(res.data.allAppointments);
      })
      .catch((e) => {
        toast.error('Some error occurred while fetching appointments:', e);
      });
  }, []);

  // custom format date and time
  const customFormatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  function handleLogoutUser() {
    logoutUser()
      .then((res) => {
        if (res?.data.success) {
          toast.success(res?.data?.message);

          setTimeout(() => {
            navigateTo('/home');
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error('Some error occurred. Please retry:', error);
      });
  }

  function handleProfileImageChange(e) {
    setPending(true);
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    setAdminProfileImage(formData)
      .then((res) => {
        fetchUserData();
        setPending(false);

        toast.success(res?.data?.message);
      })
      .catch((error) => {
        fetchUserData();
        setPending(false);
        console.log(error);
      });
  }
  function handleGalleryImages(e) {
    const files = Array.from(e.target.files);

    if (serviceGallery.length === 6) {
      toast.info(
        'You have already choosed 6 images. Delete some if you want to replace.',
      );
      e.target.value = '';
      return;
    }
    let lengthOfCurrentImages = serviceGallery.length;
    let lengthOfUploadedImages = files.length;

    if (
      lengthOfCurrentImages !== 0 &&
      lengthOfCurrentImages + lengthOfUploadedImages > 6
    ) {
      toast.error(
        `You have already uploaded ${lengthOfCurrentImages}. Only ${6 - lengthOfCurrentImages} more needed.`,
      );
      e.target.value = '';
      return;
    }

    if (files.length > 6) {
      const requiredFiles = [
        files[0],
        files[1],
        files[2],
        files[3],
        files[4],
        files[5],
      ];
      setServiceGallery([...requiredFiles]);
      toast.error(
        `You choosed ${files?.length} images. Only the first 6 images will be uploaded.`,
      );
      e.target.value = '';
      return;
    }
    setServiceGallery([...serviceGallery, ...files]);
    e.target.value = '';
  }

  function handleDeleteImage(file, type) {
    const currentFile = serviceGallery.findIndex(
      (image) => image.lastModified === file.lastModified,
    );

    if (currentFile === -1) return;

    let cpyServiceGallery = [...serviceGallery];
    cpyServiceGallery.splice(currentFile, 1);

    setServiceGallery(cpyServiceGallery);
  }

  function handleServiceCoverImage(e) {
    const files = Array.from(e.target.files);
    setServiceCoverImage([...files]);
    e.target.value = '';
  }
  function handleSetHeroImage(e) {
    const files = Array.from(e.target.files);
    setHeroImage(files[0]);
    e.target.value = '';
  }
  function handleSetWhyMekinVideo(e) {
    const file = Array.from(e.target.files);
    console.log(file);
    setWhyMekinVideo(file[0]);
    e.target.value = '';
  }
  useEffect(() => {
    return () => whyMekinVideo && URL.revokeObjectURL(whyMekinVideo);
  }, [whyMekinVideo]);

  function handleStringValuesChange(e) {
    setServiceFormData({
      ...serviceFormData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmitHomePageData() {
    setIsUpdatingSiteSettings('Updating current site settings');
    updateHeroInfo(siteSettingsData)
      .then((resOne) => {
        if (resOne.data.success) {
          setIsUpdatingSiteSettings('Adding hero image. Please wait...');
          let formData = new FormData();
          formData.append('image', heroImage);
          addHeroImage(formData).then((res) => {
            if (res.data.success) {
              setIsUpdatingSiteSettings('');
              toast.success(res.data.message);
              setIsUpdatingSiteSettings("Adding trust video. Don't refresh!");
              let fd = new FormData();
              fd.append('video', whyMekinVideo);
              addTrustVideo(fd).then((res) => {
                setIsUpdatingSiteSettings('');
                toast.success(res.data.message);
                toast.success(resOne.data.message);

              });
            }
          });
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }

  function handleSubmitServiceFormData() {
    let gallery = [serviceCoverImage[0], ...serviceGallery];
    let fd = new FormData();
    gallery.forEach((file) => {
      fd.append('gallery', file);
    });
    setIsCreatingService(true);
    createANewService(serviceFormData)
      .then((res) => {
        setIsCreatingService(false);
        setIsUploadingImages(true);
        fd.append('serviceId', res?.data?.id);
        if (res.data.success && gallery.length > 1) {
          uploadServiceImages(fd)
            .then((uploadRes) => {
              setIsUploadingImages(false);
              if (uploadRes.data.success) {
                toast.success(res.data.message);

                window.document.reload();
              }
            })
            .catch((error) => {
              toast.error(error.response?.data?.message);
              setIsCreatingService(false);
              setIsUploadingImages(false);
            });
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setIsCreatingService(false);
        setIsUploadingImages(false);
      });
  }

  const renderDashboard = () => (
    <div className='space-y-4 md:space-y-6'>
      <Toaster />
      {/* Key Metrics */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs md:text-sm text-gray-600'>
                Total Appointments
              </p>
              <p className='text-2xl md:text-3xl mt-1 md:mt-2'>156</p>
              <p className='text-xs md:text-sm text-green-600 flex items-center mt-1 md:mt-2'>
                <ArrowUpRight className='w-3 h-3 md:w-4 md:h-4 mr-1' />
                12% from last month
              </p>
            </div>
            <div className='bg-blue-100 p-2 md:p-3 rounded-full'>
              <Calendar className='w-5 h-5 md:w-6 md:h-6 text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs md:text-sm text-gray-600'>
                Active Caregivers
              </p>
              <p className='text-2xl md:text-3xl mt-1 md:mt-2'>24</p>
              <p className='text-xs md:text-sm text-green-600 flex items-center mt-1 md:mt-2'>
                <ArrowUpRight className='w-3 h-3 md:w-4 md:h-4 mr-1' />3 new
                this month
              </p>
            </div>
            <div className='bg-green-100 p-2 md:p-3 rounded-full'>
              <Users className='w-5 h-5 md:w-6 md:h-6 text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs md:text-sm text-gray-600'>
                Monthly Revenue
              </p>
              <p className='text-2xl md:text-3xl mt-1 md:mt-2'>KES 375K</p>
              <p className='text-xs md:text-sm text-green-600 flex items-center mt-1 md:mt-2'>
                <ArrowUpRight className='w-3 h-3 md:w-4 md:h-4 mr-1' />
                17% increase
              </p>
            </div>
            <div className='bg-purple-100 p-2 md:p-3 rounded-full'>
              <DollarSign className='w-5 h-5 md:w-6 md:h-6 text-purple-600' />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs md:text-sm text-gray-600'>
                Conversion Rate
              </p>
              <p className='text-2xl md:text-3xl mt-1 md:mt-2'>5.6%</p>
              <p className='text-xs md:text-sm text-green-600 flex items-center mt-1 md:mt-2'>
                <ArrowUpRight className='w-3 h-3 md:w-4 md:h-4 mr-1' />
                0.8% improvement
              </p>
            </div>
            <div className='bg-orange-100 p-2 md:p-3 rounded-full'>
              <TrendingUp className='w-5 h-5 md:w-6 md:h-6 text-orange-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>Revenue Trends</h3>
          <div className='w-full overflow-x-auto'>
            <div className='min-w-75'>
              <ResponsiveContainer width='100%' height={250}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    type='monotone'
                    dataKey='revenue'
                    stackId='1'
                    stroke='#3b82f6'
                    fill='#3b82f6'
                    fillOpacity={0.6}
                  />
                  <Area
                    type='monotone'
                    dataKey='target'
                    stackId='2'
                    stroke='#10b981'
                    fill='#10b981'
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>
            Appointment Trends
          </h3>
          <div className='w-full overflow-x-auto'>
            <div className='min-w-75'>
              <ResponsiveContainer width='100%' height={250}>
                <BarChart data={appointmentTrendsData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey='appointments' fill='#3b82f6' />
                  <Bar dataKey='completed' fill='#10b981' />
                  <Bar dataKey='cancelled' fill='#ef4444' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Desktop Table */}
      <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
        <h3 className='text-base md:text-lg mb-3 md:mb-4'>
          Recent Appointments
        </h3>

        {/* Desktop Table View */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-3 px-4 text-sm'>Patient</th>
                <th className='text-left py-3 px-4 text-sm'>Service</th>
                <th className='text-left py-3 px-4 text-sm'>Date & Time</th>
                <th className='text-left py-3 px-4 text-sm'>Caregiver</th>
                <th className='text-left py-3 px-4 text-sm'>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAppointments.slice(0, 5).map((appointment) => (
                <tr key={appointment.id} className='border-b hover:bg-gray-50'>
                  <td className='py-3 px-4 text-sm'>
                    {appointment.patientName}
                  </td>
                  <td className='py-3 px-4 text-sm'>{appointment.service}</td>
                  <td className='py-3 px-4 text-sm'>
                    {appointment.date} {appointment.time}
                  </td>
                  <td className='py-3 px-4 text-sm'>{appointment.caregiver}</td>
                  <td className='py-3 px-4'>
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className='md:hidden space-y-3'>
          {mockAppointments.slice(0, 5).map((appointment) => (
            <div
              key={appointment.id}
              className='border border-gray-200 rounded-lg p-4 space-y-2'
            >
              <div className='flex justify-between items-start'>
                <div>
                  <p className='font-medium'>{appointment.patientName}</p>
                  <p className='text-sm text-gray-600'>{appointment.service}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}
                >
                  {appointment.status}
                </span>
              </div>
              <div className='text-sm text-gray-600'>
                <p>
                  {appointment.date} at {appointment.time}
                </p>
                <p>Caregiver: {appointment.caregiver}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4'>
        <div>
          <h2 className='text-xl md:text-2xl'>Appointments Management</h2>
          <p className='text-gray-600 text-xs md:text-sm mt-1'>
            Manage and assign appointments to caregivers
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
          <div className='relative col-span-1 sm:col-span-2 md:col-span-1'>
            <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className='px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm'>
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select className='px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm'>
            <option>All Services</option>
            {servicesRes.map((service) => (
              <option key={service._id}>{service.Title}</option>
            ))}
          </select>
          <select className='px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm'>
            <option>All Caregivers</option>
            {mockCaregivers.map((caregiver) => (
              <option key={caregiver.id}>{caregiver.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className='hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left py-4 px-4 text-sm'>Patient Details</th>
                <th className='text-left py-4 px-4 text-sm'>Service</th>
                <th className='text-left py-4 px-4 text-sm'>Date & Time</th>

                <th className='text-left py-4 px-4 text-sm'>Location</th>
                <th className='text-left py-4 px-4 text-sm'>Amount</th>
                <th className='text-left py-4 px-4 text-sm'>Payment</th>
                <th className='text-left py-4 px-4 text-sm'>Status</th>
                <th className='text-left py-4 px-4 text-sm'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments.length === 0 || allAppointments == null ? (
                <div className='rounded-[0.5em]  px-8 py-4'>
                  <h2 className='text-lg text-gray-950'>
                    There are no appointments now
                  </h2>
                </div>
              ) : (
                allAppointments &&
                allAppointments?.length > 0 &&
                allAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className='border-b hover:bg-gray-50'
                  >
                    <td className='py-4 px-4'>
                      <div>
                        <div className='text-sm'>{appointment.patientName}</div>
                        <div className='text-xs text-gray-500 flex items-center gap-1 mt-1'>
                          <Phone className='w-3 h-3' />
                          {appointment.phone}
                        </div>
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <div>
                        <div className='text-sm'>{appointment.serviceType}</div>

                        <div className='text-fsm'>
                          {appointment.serviceDuration}
                        </div>
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <div>
                        <div className='text-sm'>
                          {' '}
                          {customFormatter.format(
                            new Date(appointment?.preferredDate),
                          )}
                        </div>
                        <div className='text-xs text-gray-500 flex items-center gap-1 mt-1'>
                          <Clock className='w-3 h-3' />
                          {appointment.preferredTime}
                        </div>
                      </div>
                    </td>

                    <td className='py-4 px-4'>
                      <div className='text-sm flex items-center gap-1'>
                        <MapPin className='w-3 h-3 text-gray-400' />
                        {appointment.area}
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${appointment.amount === null ? 'text-orange-600 font-semibold italic' : 'text-green-500 font-semibold'}`}
                      >
                        {appointment.amount === null
                          ? 'Waiting '
                          : `KES ${appointment.amount}`}
                      </span>
                    </td>
                    <td className='py-4 px-4'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.paid)}`}
                      >
                        {appointment.paid}
                      </span>
                    </td>
                    <td className='py-4 px-4'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className='py-4 px-4'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => {
                            setCurrentAppointment(appointment);
                            setOpenView(true);
                          }}
                          className='p-2 hover:bg-blue-500 bg-blue-600 rounded'
                          title='View Details'
                        >
                          <Eye className='w-4 h-4 pointer-events-none text-gray-50' />
                        </button>
                        <button
                          onClick={() => {
                            setOpenSheet(true);
                          }}
                          className='p-2 hover:bg-blue-500 bg-blue-600 rounded'
                          title='Edit'
                        >
                          <Pencil className='w-4 h-4 pointer-events-none text-gray-50' />
                        </button>
                      </div>
                    </td>
                    <AdminAppointmentSheet
                      open={openSheet}
                      setSheetOpen={setOpenSheet}
                    />
                    <ViewAppointmentSheet
                      open={openView}
                      setSheetOpen={setOpenView}
                      appointment={currentAppointment}
                    />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className='lg:hidden space-y-3 md:space-y-4'>
        {mockAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'
          >
            <div className='flex justify-between items-start mb-3'>
              <div>
                <h3 className='font-medium text-sm md:text-base'>
                  {appointment.patientName}
                </h3>
                <p className='text-xs text-gray-500 flex items-center gap-1 mt-1'>
                  <Phone className='w-3 h-3' />
                  {appointment.phone}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}
              >
                {appointment.status}
              </span>
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Service:</span>
                <span className='font-medium'>{appointment.service}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Amount:</span>
                <span className='font-medium'>
                  KES {appointment.amount.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Date & Time:</span>
                <span>
                  {appointment.date} {appointment.time}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Caregiver:</span>
                <span>{appointment.caregiver}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Location:</span>
                <span className='text-right'>{appointment.location}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Payment:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.payment)}`}
                >
                  {appointment.payment}
                </span>
              </div>
            </div>

            <div className='flex gap-2 mt-4 pt-3 border-t'>
              {appointment.caregiver === 'Pending' && (
                <button className='flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100'>
                  Assign Caregiver
                </button>
              )}
              <button className='flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 flex items-center justify-center gap-1'>
                <Eye className='w-4 h-4' />
                View
              </button>
              <button className='flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 flex items-center justify-center gap-1'>
                <Pencil className='w-4 h-4' />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCaregivers = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4'>
        <div>
          <h2 className='text-xl md:text-2xl'>Caregiver Management</h2>
          <p className='text-gray-600 text-xs md:text-sm mt-1'>
            Manage active caregivers and track performance
          </p>
        </div>
        <button className='bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 text-sm md:text-base w-full sm:w-auto justify-center'>
          <Plus className='w-4 h-4' />
          Add Caregiver
        </button>
      </div>

      {/* Caregiver Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Total Active</p>
          <p className='text-xl md:text-2xl mt-1'>24</p>
        </div>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Average Rating</p>
          <p className='text-xl md:text-2xl mt-1'>4.8 ⭐</p>
        </div>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Jobs Completed</p>
          <p className='text-xl md:text-2xl mt-1'>1,245</p>
        </div>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Available Now</p>
          <p className='text-xl md:text-2xl mt-1'>18</p>
        </div>
      </div>

      {/* Caregivers Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {mockCaregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm md:text-base'>
                  {caregiver.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h3 className='font-medium text-sm md:text-base'>
                    {caregiver.name}
                  </h3>
                  <p className='text-xs md:text-sm text-gray-600'>
                    {caregiver.specialty}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(caregiver.status)}`}
              >
                {caregiver.status}
              </span>
            </div>

            <div className='space-y-2 mb-4 text-xs md:text-sm'>
              <div className='flex items-center gap-2 text-gray-600'>
                <Clock className='w-3 h-3 md:w-4 md:h-4' />
                {caregiver.experience} experience
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <MapPin className='w-3 h-3 md:w-4 md:h-4' />
                {caregiver.location}
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <Phone className='w-3 h-3 md:w-4 md:h-4' />
                {caregiver.phone}
              </div>
              <div className='flex items-center gap-2 text-gray-600 break-all'>
                <Mail className='w-3 h-3 md:w-4 md:h-4 shrink-0 ' />
                {caregiver.email}
              </div>
            </div>

            <div className='flex items-center justify-between pt-4 border-t'>
              <div>
                <p className='text-xs text-gray-600'>Rating</p>
                <p className='text-base md:text-lg'>{caregiver.rating} ⭐</p>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Jobs Done</p>
                <p className='text-base md:text-lg'>
                  {caregiver.completedJobs}
                </p>
              </div>
            </div>

            <div className='flex gap-2 mt-4'>
              <button className='flex-1 px-2 md:px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs md:text-sm hover:bg-blue-100'>
                View Profile
              </button>
              <button className='flex-1 px-2 md:px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs md:text-sm hover:bg-gray-100'>
                Assign Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicants = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4'>
        <div>
          <h2 className='text-xl md:text-2xl'>Caregiver Applicants</h2>
          <p className='text-gray-600 text-xs md:text-sm mt-1'>
            Review and approve new caregiver applications
          </p>
        </div>
        <div className='bg-orange-100 text-orange-700 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base'>
          {mockApplicants.length} Pending Review
        </div>
      </div>

      {/* Desktop Table */}
      <div className='hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left py-4 px-4 text-sm'>
                  Applicant Details
                </th>
                <th className='text-left py-4 px-4 text-sm'>Specialty</th>
                <th className='text-left py-4 px-4 text-sm'>Experience</th>
                <th className='text-left py-4 px-4 text-sm'>Certifications</th>
                <th className='text-left py-4 px-4 text-sm'>Applied Date</th>
                <th className='text-left py-4 px-4 text-sm'>Status</th>
                <th className='text-left py-4 px-4 text-sm'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockApplicants.map((applicant) => (
                <tr key={applicant.id} className='border-b hover:bg-gray-50'>
                  <td className='py-4 px-4'>
                    <div>
                      <div className='font-medium text-sm'>
                        {applicant.name}
                      </div>
                      <div className='text-xs text-gray-500 flex items-center gap-1 mt-1'>
                        <Phone className='w-3 h-3' />
                        {applicant.phone}
                      </div>
                      <div className='text-xs text-gray-500 flex items-center gap-1 mt-1'>
                        <Mail className='w-3 h-3' />
                        {applicant.email}
                      </div>
                    </div>
                  </td>
                  <td className='py-4 px-4 text-sm'>{applicant.specialty}</td>
                  <td className='py-4 px-4 text-sm'>{applicant.experience}</td>
                  <td className='py-4 px-4'>
                    <div className='text-sm'>{applicant.certifications}</div>
                  </td>
                  <td className='py-4 px-4 text-sm'>{applicant.appliedDate}</td>
                  <td className='py-4 px-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(applicant.status)}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    <div className='flex gap-2'>
                      <button className='px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 flex items-center gap-1'>
                        <CircleCheck className='w-4 h-4' />
                        Approve
                      </button>
                      <button className='px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 flex items-center gap-1'>
                        <CircleX className='w-4 h-4' />
                        Reject
                      </button>
                      <button
                        className='p-2 hover:bg-gray-100 rounded'
                        title='View Details'
                      >
                        <Eye className='w-4 h-4 text-gray-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className='lg:hidden space-y-3 md:space-y-4'>
        {mockApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'
          >
            <div className='flex justify-between items-start mb-3'>
              <div>
                <h3 className='font-medium text-sm md:text-base'>
                  {applicant.name}
                </h3>
                <p className='text-xs text-gray-500 mt-1'>
                  {applicant.specialty}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(applicant.status)}`}
              >
                {applicant.status}
              </span>
            </div>

            <div className='space-y-2 text-xs md:text-sm mb-4'>
              <div className='flex items-center gap-2 text-gray-600'>
                <Phone className='w-3 h-3' />
                {applicant.phone}
              </div>
              <div className='flex items-center gap-2 text-gray-600 break-all'>
                <Mail className='w-3 h-3 shrink-0' />
                {applicant.email}
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Experience:</span>
                <span>{applicant.experience}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Applied:</span>
                <span>{applicant.appliedDate}</span>
              </div>
              <div>
                <span className='text-gray-600'>Certifications:</span>
                <p className='mt-1'>{applicant.certifications}</p>
              </div>
            </div>

            <div className='flex gap-2'>
              <button className='flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 flex items-center justify-center gap-1'>
                <CircleCheck className='w-4 h-4' />
                Approve
              </button>
              <button className='flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 flex items-center justify-center gap-1'>
                <CircleX className='w-4 h-4' />
                Reject
              </button>
              <button className='p-2 bg-gray-50 rounded-lg hover:bg-gray-100'>
                <Eye className='w-4 h-4 text-gray-600' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4'>
        <div>
          <h2 className='text-xl md:text-2xl'>Services Management</h2>
          <p className='text-gray-600 text-xs md:text-sm mt-1'>
            Add and manage home care services
          </p>
        </div>
        <button
          onClick={() => setOpenAddNewServiceSheet(true)}
          className='bg-blue-600 text-white px-3 md:px-4 rounded-[0.2em] py-1 flex items-center gap-2 hover:bg-blue-700 text-sm md:text-base w-full sm:w-auto justify-center'
        >
          <Plus className='w-4 h-4' />
          Add New Service
        </button>
      </div>
      <Dialog
        open={openWarningBox}
        onOpenChange={() => setOpenWarningBox(!openWarningBox)}
      >
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>New Service</DialogTitle>
            <DialogDescription className='text-gray-800'>
              If you close this sheet all the fields we be cleared. Are you sure
              you want to cancel creating this service?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setOpenAddNewServiceSheet(false);
                  setOpenWarningBox(false);
                  setServiceFormData(INITIAL_SERVICE_STATE);
                }}
                className='bg-orange-500/80 hover:bg-red-500'
                variant='outline'
              >
                Yes Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => setOpenWarningBox(false)}
              className='bg-blue-600'
              type='submit'
            >
              Continue Creating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet
        open={openAddNewServiceSheet}
        onOpenChange={() => {
          setOpenWarningBox(true);
        }}
      >
        <SheetContent className='w-3/5 overflow-y-scroll px-4 rounded-l-[0.5em] py-2'>
          <Toaster />
          <SheetHeader>
            <SheetTitle className='text-lg font-semibold text-gray-950'>
              Add a new service
            </SheetTitle>
          </SheetHeader>
          <div className='flex relative w-11/12 gap-4 flex-col items-center  justify-center '>
            <div className='flex flex-col w-full gap-3'>
              <Label htmlFor='picture' className='text-start'>
                Service Cover Image
              </Label>
              <div className='w-full p-2 gap-3 flex flex-col bg-gray-100 rounded-[0.4em] outline-1 outline-gray-300'>
                <div className='flex flex-row p-2 place-items-center outline-1 outline-gray-300 gap-4 rounded-[0.4em] w-full'>
                  {serviceCoverImage && serviceCoverImage.length > 0 ? (
                    <div className='relative w-full flex flex-cols items-center justify-center'>
                      <img
                        src={
                          serviceCoverImage && serviceCoverImage.length > 0
                            ? URL.createObjectURL(serviceCoverImage[0])
                            : null
                        }
                        alt='preview'
                        className='rounded-[0.4em] h-50'
                      />

                      <Trash2Icon
                        onClick={() => {
                          setServiceCoverImage([]);
                        }}
                        className='absolute rounded-[0.2em] backdrop-blur-3xl  top-2 right-3 stroke-red-500'
                      />
                    </div>
                  ) : (
                    <h2>No cover image selected. Please select one</h2>
                  )}
                </div>
                <Field className='flex w-full items-center flex-col cursor-pointer gap-1'>
                  <Input
                    className='bg-white cursor-pointer'
                    accept='image/*'
                    type='file'
                    name='coverImage'
                    onChange={handleServiceCoverImage}
                  />
                  <FieldDescription>
                    This image will be used on the home page to present this
                    service
                  </FieldDescription>
                </Field>
              </div>
            </div>
            <div className='flex flex-col w-full gap-3'>
              <Label htmlFor='picture' className='text-start'>
                Service Gallery
              </Label>
              <div className='w-full p-2 gap-3 flex flex-col bg-gray-100 rounded-[0.4em] outline-1 outline-gray-300'>
                <div className='grid grid-cols-2 p-2 place-items-center outline-1 outline-gray-300 gap-4 rounded-[0.4em] w-full'>
                  {serviceGallery && serviceGallery.length > 0
                    ? serviceGallery?.map((file, index) => (
                      <div className='relative'>
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt='preview'
                          className='w-full rounded-[0.4em] h-50'
                        />

                        <Trash2Icon
                          onClick={() => handleDeleteImage(file)}
                          className='absolute rounded-[0.2em] backdrop-blur-3xl  top-1 right-0 stroke-red-500'
                        />
                      </div>
                    ))
                    : null}
                </div>
                <Field className='flex w-50 items-center flex-col cursor-pointer gap-1'>
                  <Input
                    className='bg-white cursor-pointer'
                    accept='image/*'
                    multiple
                    type='file'
                    onChange={handleGalleryImages}
                  />
                  <FieldDescription>You can add upto 6 images</FieldDescription>
                </Field>
              </div>
            </div>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='form-name'>Service Name</FieldLabel>
                <Input
                  type='text'
                  placeholder='e.g Elderly Care'
                  className='placeholder:italic'
                  required
                  value={serviceFormData.Title}
                  onChange={handleStringValuesChange}
                  name='Title'
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='form-email'>Service Hero Title</FieldLabel>
                <Input
                  type='text'
                  className='placeholder:italic'
                  placeholder='Dignified, Professional Care for Your Aging Loved Ones'
                  value={serviceFormData.ServiceHeroTitle}
                  onChange={handleStringValuesChange}
                  name='ServiceHeroTitle'
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='form-email'>
                  Service Meta Description
                </FieldLabel>
                <Textarea
                  className='placeholder:text-justify min-h-22 py-4 placeholder:italic '
                  placeholder='Short description of the service e.g. Compassionate elderly care at home in Nairobi. Trained caregivers for senior citizens providing companionship, personal care & medical support across Nairobi County'
                  value={serviceFormData.MetaDescription}
                  onChange={handleStringValuesChange}
                  name='MetaDescription'
                />
              </Field>
              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>Service Keywords</FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='flex flex-wrap gap-2'>
                    {serviceFormData.ServiceKeywords.length > 0 ? (
                      serviceFormData.ServiceKeywords.map((keyword, index) => (
                        <Badge key={index}>{keyword}</Badge>
                      ))
                    ) : (
                      <h2>No keywords added yet.</h2>
                    )}
                  </div>
                  <InputGroup className='w-40 h-7 rounded-[0.3em] '>
                    <InputGroupInput
                      type='text'
                      placeholder='New keyword'
                      className='focus:outline-0 placeholder:italic border-none focus:border-0'
                      onChange={(e) =>
                        setServiceInputData({
                          ...serviceInputData,
                          keyword: e.target.value,
                        })
                      }
                      value={serviceInputData.keyword}
                    />
                    <InputGroupAddon
                      className='cursor-pointer '
                      align='inline-end'
                    >
                      <Button
                        onClick={() => {
                          let cpyKeywords = [
                            ...serviceFormData.ServiceKeywords,
                          ];

                          cpyKeywords.push(serviceInputData.keyword);
                          setServiceFormData({
                            ...serviceFormData,
                            ServiceKeywords: cpyKeywords,
                          });
                          setServiceInputData({
                            ...serviceInputData,
                            keyword: '',
                          });
                        }}
                        disabled={serviceInputData.keyword.length < 4}
                        className='h-6 px-2 disabled:bg-gray-400 bg-blue-700'
                      >
                        Add
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor='form-email'>
                  Service Hero Description
                </FieldLabel>
                <Textarea
                  className='placeholder:text-justify min-h-22 py-4 placeholder:italic '
                  placeholder='A better description of the service e.g. Mekin Home Care provides dedicated caregivers who deliver respectful, compassionate care to senior citizens across Nairobi. From daily assistance to medical support, we help your elderly loved ones maintain independence and quality of life at home.'
                  value={serviceFormData.ServiceHeroDescription}
                  onChange={(e) =>
                    setServiceFormData({
                      ...serviceFormData,
                      ServiceHeroDescription: e.target.value,
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='form-email'>Service Overview</FieldLabel>
                <Textarea
                  className='placeholder:text-justify min-h-30 py-4 placeholder:italic '
                  placeholder="A long description of the service e.g. Our elderly care services in Nairobi bring professional, compassionate support to senior citizens in the comfort of their homes. Whether your aging parent lives in Westlands, Karen, Kileleshwa, Lavington, or anywhere across Nairobi County, our trained caregivers provide personalized assistance that respects dignity while promoting health, safety, and independence. We understand that aging comes with unique challenges - from mobility limitations to chronic health conditions to the need for companionship. Our elderly care program is designed to address all aspects of senior living: personal care assistance, medication management, meal preparation, light housekeeping, companionship, and coordination with healthcare providers. With Mekin Home Care's elderly care services, your loved one receives the attention, respect, and professional support they deserve, allowing them to age gracefully in familiar surroundings while giving you peace of mind."
                  value={serviceFormData.ServiceOverview}
                  onChange={(e) =>
                    setServiceFormData({
                      ...serviceFormData,
                      ServiceOverview: e.target.value,
                    })
                  }
                />
              </Field>

              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>Service Benefits</FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    {serviceFormData.ServiceBenefits.length > 0 ? (
                      serviceFormData.ServiceBenefits.map((benefit) => (
                        <div className='flex flex-col outline-1 w-full rounded-[0.4em] px-5 py-2 outline-gray-200 gap-1 bg-linear-to-tr from-indigo-600/30 to-blue-600/70'>
                          <h2 className='text-gray-950 font-semibold'>
                            {benefit.title}
                          </h2>
                          <p className='text-fsm text-justify'>
                            {benefit.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <h2>No service benefits added. Please add one</h2>
                    )}
                  </div>

                  <div className='flex flex-col outline-1 w-3/4 rounded-[0.4em] px-3 outline-gray-200 gap-3'>
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        type='text'
                        placeholder='Compassionate Caregivers'
                        value={serviceInputData.benefit.title}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            benefit: {
                              ...serviceInputData.benefit,
                              title: e.target.value,
                            },
                          });
                        }}
                      />

                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        className='placeholder:text-justify min-h-25 py-4 placeholder:italic '
                        type='text'
                        placeholder='A description of the benefit e.g. Our caregivers are specially trained in geriatric care and treat every senior with kindness, patience, and respect.'
                        value={serviceInputData.benefit.description}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            benefit: {
                              ...serviceInputData.benefit,
                              description: e.target.value,
                            },
                          });
                        }}
                      />
                    </Field>
                    <Button
                      disabled={
                        serviceInputData.benefit.title.length < 4 ||
                        serviceInputData.benefit.description.length < 100
                      }
                      onClick={(e) => {
                        let cpyServiceBenefits = [
                          ...serviceFormData.ServiceBenefits,
                        ];
                        cpyServiceBenefits.push(serviceInputData.benefit);
                        setServiceFormData({
                          ...serviceFormData,
                          ServiceBenefits: cpyServiceBenefits,
                        });
                        setServiceInputData({
                          ...serviceInputData,
                          benefit: {
                            title: '',
                            description: '',
                          },
                        });
                      }}
                    >
                      Add Benefit
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>Service Process</FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    {serviceFormData.ServiceProcess.length > 0 ? (
                      serviceFormData.ServiceProcess.map((process) => (
                        <div className='flex flex-col outline-1 w-full rounded-[0.4em] px-5 py-2 outline-gray-200 gap-1 bg-linear-to-tr from-indigo-600/30 to-blue-600/70'>
                          <div className='flex flex-row items-center gap-2'>
                            <span className='w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg p-1'>
                              {process.step}
                            </span>
                            <h2 className='text-gray-950 font-semibold'>
                              {process.title}
                            </h2>
                          </div>

                          <p className='text-fsm'>{process.description}</p>
                        </div>
                      ))
                    ) : (
                      <h2>No process added yet.</h2>
                    )}
                  </div>

                  <div className='flex flex-col outline-1 w-3/4 rounded-[0.4em] px-3 outline-gray-200 gap-3'>
                    <Field>
                      <FieldLabel className='font-semibold '>
                        Step {serviceFormData.ServiceProcess.length + 1}
                      </FieldLabel>

                      <FieldLabel>Title</FieldLabel>
                      <Input
                        type='text'
                        value={serviceInputData.process.title}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            process: {
                              ...serviceInputData.process,
                              title: e.target.value,
                            },
                          });
                        }}
                        placeholder='Free Home Assessment'
                      />

                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        className='placeholder:text-justify min-h-25 py-4 placeholder:italic '
                        type='text'
                        placeholder="Contact Mekin Home Care to schedule a complimentary in-home assessment. Our care coordinator visits your loved one's Nairobi home to understand their needs, health status, daily routine, and living environment. We discuss your concerns, preferences, and expectations."
                        value={serviceInputData.process.description}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            process: {
                              ...serviceInputData.process,
                              description: e.target.value,
                            },
                          });
                        }}
                      />
                    </Field>
                    <Button
                      disabled={
                        serviceInputData.process.title.length < 4 ||
                        serviceInputData.process.description.length < 200
                      }
                      className='disabled:bg-gray-400'
                      onClick={(e) => {
                        let cpyServiceProcess = [
                          ...serviceFormData.ServiceProcess,
                        ];

                        let newProcess = {
                          step: serviceFormData.ServiceProcess.length + 1,
                          ...serviceInputData.process,
                        };
                        cpyServiceProcess.push(newProcess);

                        setServiceFormData({
                          ...serviceFormData,
                          ServiceProcess: cpyServiceProcess,
                        });
                        setServiceInputData({
                          ...serviceInputData,
                          process: {
                            title: '',
                            description: '',
                          },
                        });
                      }}
                    >
                      Add Process
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>Target Audience</FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    {serviceFormData.TargetAudience.length > 0 ? (
                      serviceFormData.TargetAudience.map((audient) => (
                        <div className='flex flex-col outline-1 w-full rounded-[0.4em] px-1 py-2 outline-gray-200 gap-1 bg-linear-to-tr from-indigo-600/30 to-blue-600/70'>
                          <h2 className='text-fmd font-semibold'>
                            {' '}
                            {audient.title}
                          </h2>
                          <h2 className='text-gray-950 text-fsm'>
                            {audient.description}
                          </h2>
                        </div>
                      ))
                    ) : (
                      <h2>Add the target audience.</h2>
                    )}
                  </div>

                  <div className='flex flex-col outline-1 w-3/4 rounded-[0.4em] px-3 outline-gray-200 gap-3'>
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        type='text'
                        value={serviceInputData.audient.title}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            audient: {
                              ...serviceInputData.audient,
                              title: e.target.value,
                            },
                          });
                        }}
                        placeholder='Active Seniors Needing Assistance'
                      />

                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        className='placeholder:text-justify min-h-25 py-4 placeholder:italic '
                        type='text'
                        placeholder='Relatively independent elderly individuals who need help with specific tasks like transportation, meal preparation, or medication management.'
                        value={serviceInputData.audient.description}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            audient: {
                              ...serviceInputData.audient,
                              description: e.target.value,
                            },
                          });
                        }}
                      />
                    </Field>
                    <Button
                      disabled={
                        serviceInputData.audient.title.length < 4 ||
                        serviceInputData.audient.description.length < 100
                      }
                      className='disabled:bg-gray-400'
                      onClick={(e) => {
                        setServiceFormData({
                          ...serviceFormData,
                          TargetAudience: [
                            ...serviceFormData.TargetAudience,
                            serviceInputData.audient,
                          ],
                        });
                        setServiceInputData({
                          ...serviceInputData,
                          audient: {
                            title: '',
                            description: '',
                          },
                        });
                      }}
                    >
                      Add target audience
                    </Button>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>
                  What is included in the service
                </FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='flex flex-wrap gap-2'>
                    {serviceFormData.ServiceInclusion.length > 0 ? (
                      serviceFormData.ServiceInclusion.map((item, index) => (
                        <Badge key={index}>{item}</Badge>
                      ))
                    ) : (
                      <h2>No service inclusion item added yet.</h2>
                    )}
                  </div>
                  <InputGroup className='w-70 h-7 rounded-[0.3em] '>
                    <InputGroupInput
                      type='text'
                      placeholder='Meal planning and preparation'
                      className='focus:outline-0 placeholder:italic border-none focus:border-0'
                      onChange={(e) =>
                        setServiceInputData({
                          ...serviceInputData,
                          inclusionItem: e.target.value,
                        })
                      }
                      value={serviceInputData.inclusionItem}
                    />
                    <InputGroupAddon
                      className='cursor-pointer '
                      align='inline-end'
                    >
                      <Button
                        onClick={() => {
                          let cpyKeywords = [
                            ...serviceFormData.ServiceInclusion,
                          ];

                          cpyKeywords.push(serviceInputData.inclusionItem);
                          setServiceFormData({
                            ...serviceFormData,
                            ServiceInclusion: cpyKeywords,
                          });
                          setServiceInputData({
                            ...serviceInputData,
                            inclusionItem: '',
                          });
                        }}
                        disabled={serviceInputData.inclusionItem.length < 4}
                        className='h-6 disabled:bg-gray-400 px-2 bg-blue-700'
                      >
                        Add
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>Service Features</FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    {serviceFormData.ServiceFeatures.length > 0 ? (
                      serviceFormData.ServiceFeatures.map((item) => (
                        <div className='flex flex-col outline-1 w-full rounded-[0.4em] px-5 py-2 outline-gray-200 gap-1 bg-linear-to-tr from-indigo-600/30 to-blue-600/70'>
                          <h2 className='text-gray-950 font-semibold'>
                            {item.category}
                          </h2>
                          {item.items.length > 0 ? (
                            item.items.map((item) => <Badge>{item}</Badge>)
                          ) : (
                            <p>No feature item added yet.</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <h2>No service feature added yet.</h2>
                    )}
                  </div>

                  <div className='flex flex-col outline-1 w-full rounded-[0.4em] px-3 outline-gray-200 gap-3'>
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <Input
                        type='text'
                        className='placeholder:italic'
                        onChange={(e) =>
                          setServiceInputData({
                            ...serviceInputData,
                            feature: {
                              ...serviceInputData.feature,
                              category: e.target.value,
                            },
                          })
                        }
                        value={serviceInputData.feature.category}
                        placeholder='Daily Living Support'
                      />

                      <div className='flex flex-col gap-3'>
                        <FieldLabel htmlFor='form-email'>Items</FieldLabel>
                        <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                          <div className='flex flex-wrap gap-2'>
                            {serviceCategory.length > 0 ? (
                              serviceCategory.map((item) => (
                                <Badge>{item}</Badge>
                              ))
                            ) : (
                              <h2>No service items added yet.</h2>
                            )}
                          </div>
                          <InputGroup className='w-70 h-7 rounded-[0.3em] '>
                            <InputGroupInput
                              type='text'
                              placeholder='Cooking and meal preparation'
                              className='focus:outline-0 placeholder:italic border-none focus:border-0'
                              onChange={(e) =>
                                setServiceInputData({
                                  ...serviceInputData,
                                  feature: {
                                    ...serviceInputData.feature,
                                    item: e.target.value,
                                  },
                                })
                              }
                              value={serviceInputData.feature.item}
                            />
                            <InputGroupAddon
                              className='cursor-pointer '
                              align='inline-end'
                            >
                              <Button
                                onClick={() => {
                                  setServiceCategory([
                                    ...serviceCategory,
                                    serviceInputData.feature.item,
                                  ]);
                                  setServiceInputData({
                                    ...serviceInputData,
                                    feature: {
                                      ...serviceInputData.feature,
                                      item: '',
                                    },
                                  });
                                }}
                                disabled={
                                  serviceInputData.feature.item.length < 4
                                }
                                className='h-6 disabled:bg-gray-400 px-2 bg-blue-700'
                              >
                                Add
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                      </div>
                    </Field>
                    <Button
                      disabled={
                        serviceInputData.feature.category.length < 4 ||
                        serviceCategory.length === 0
                      }
                      onClick={() => {
                        let newFeature = {
                          category: serviceInputData.feature.category,
                          items: serviceCategory,
                        };
                        setServiceFormData({
                          ...serviceFormData,
                          ServiceFeatures: [
                            ...serviceFormData.ServiceFeatures,
                            newFeature,
                          ],
                        });
                        setServiceInputData({
                          ...serviceInputData,
                          feature: {
                            category: '',
                            item: '',
                          },
                        });
                        setServiceCategory([]);
                      }}
                    >
                      Add Feature
                    </Button>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>
                  Service Coverage Areas
                </FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='flex flex-wrap gap-2'>
                    {serviceFormData.ServiceCoverageAreas.length > 0 ? (
                      serviceFormData.ServiceCoverageAreas.map((area) => (
                        <Badge> {area}</Badge>
                      ))
                    ) : (
                      <h2>No area added yet.</h2>
                    )}
                  </div>
                  <InputGroup className='w-60 h-7 rounded-[0.3em] '>
                    <InputGroupInput
                      type='text'
                      placeholder='e.g Karen'
                      className='focus:outline-0 placeholder:italic border-none focus:border-0'
                      value={serviceInputData.coverageArea}
                      onChange={(e) => {
                        setServiceInputData({
                          ...serviceInputData,
                          coverageArea: e.target.value,
                        });
                      }}
                    />
                    <InputGroupAddon
                      className='cursor-pointer '
                      align='inline-end'
                    >
                      <Button
                        disabled={serviceInputData.coverageArea.length < 4}
                        onClick={() => {
                          setServiceFormData({
                            ...serviceFormData,
                            ServiceCoverageAreas: [
                              ...serviceFormData.ServiceCoverageAreas,
                              serviceInputData.coverageArea,
                            ],
                          });
                          setServiceInputData({
                            ...serviceInputData,
                            coverageArea: '',
                          });
                        }}
                        className='h-6 px-2 disabled:bg-gray-400 bg-blue-700'
                      >
                        Add
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <FieldLabel htmlFor='form-email'>Service FAQs</FieldLabel>
                <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    {serviceFormData.ServiceFAQs.length > 0 ? (
                      serviceFormData.ServiceFAQs.map((faq) => (
                        <div className='flex flex-col outline-1 w-full rounded-[0.4em] px-5 py-2 outline-gray-200 gap-1 bg-linear-to-tr from-indigo-600/30 to-blue-600/70'>
                          <h2 className='text-gray-950 font-semibold'>
                            {faq.question}
                          </h2>
                          <p className='text-fsm text-justify'>{faq.answer}</p>
                        </div>
                      ))
                    ) : (
                      <h2>No service FAQs added. Please add one</h2>
                    )}
                  </div>

                  <div className='flex flex-col outline-1 w-3/4 rounded-[0.4em] px-3 outline-gray-200 gap-3'>
                    <Field>
                      <FieldLabel>Question</FieldLabel>
                      <Input
                        type='text'
                        placeholder='How quickly can you start the service?'
                        value={serviceInputData.FAQ.question}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,

                            FAQ: {
                              ...serviceInputData.FAQ,
                              question: e.target.value,
                            },
                          });
                        }}
                      />

                      <FieldLabel>Answer</FieldLabel>
                      <Textarea
                        className='placeholder:text-justify min-h-25 py-4 placeholder:italic '
                        type='text'
                        placeholder='We can typically arrange professional elderly care services in nairobi within 24-48 hours of your initial consultation. For urgent cases in Nairobi, we offer same-day service availability.'
                        value={serviceInputData.FAQ.answer}
                        onChange={(e) => {
                          setServiceInputData({
                            ...serviceInputData,
                            FAQ: {
                              ...serviceInputData.FAQ,
                              answer: e.target.value,
                            },
                          });
                        }}
                      />
                    </Field>
                    <Button
                      disabled={
                        serviceInputData.FAQ.answer.length < 10 ||
                        serviceInputData.FAQ.question.length < 20
                      }
                      onClick={(e) => {
                        let cpyServiceFAQs = [...serviceFormData.ServiceFAQs];
                        cpyServiceFAQs.push(serviceInputData.FAQ);
                        setServiceFormData({
                          ...serviceFormData,
                          ServiceFAQs: cpyServiceFAQs,
                        });
                        setServiceInputData({
                          ...serviceInputData,
                          FAQ: {
                            answer: '',
                            question: '',
                          },
                        });
                      }}
                    >
                      Add FAQ
                    </Button>
                  </div>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor='form-email'>Pricing Note</FieldLabel>
                <Textarea
                  className='placeholder:text-justify min-h-40 max-h-50 py-4 placeholder:italic '
                  placeholder="A long description on how Mekin services are priced e.g. Our elderly care services are priced based on the level of care required, hours of service, and whether you need daily visits or 24/7 live-in care. We offer hourly rates, daily packages, and monthly care plans across all areas of Nairobi. Pricing is transparent with no hidden fees. Contact us for a free consultation and personalized quote based on your loved one's specific needs. We can work with families to create affordable care solutions."
                  onChange={(e) => {
                    setServiceFormData({
                      ...serviceFormData,
                      PricingNote: e.target.value,
                    });
                  }}
                  value={serviceFormData.PricingNote}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='form-email'>Service Duration</FieldLabel>
                <Input
                  className='placeholder:italic'
                  placeholder='Typical service duration e.g. 1 Week'
                  value={serviceFormData.ServiceDuration}
                  onChange={(e) => {
                    setServiceFormData({
                      ...serviceFormData,
                      ServiceDuration: e.target.value,
                    });
                  }}
                />
              </Field>
              <div className='grid grid-cols-2 gap-x-5'>
                <Field>
                  <FieldLabel>Service price per day</FieldLabel>
                  <Input
                    type='number'
                    value={serviceFormData.Pricing.dailyRate}
                    onChange={(e) => {
                      setServiceFormData({
                        ...serviceFormData,
                        Pricing: {
                          ...serviceFormData.Pricing,
                          dailyRate: e.target.value,
                        },
                      });
                    }}
                    placeholder='e.g. 2000'
                  />
                </Field>

                <Field>
                  <FieldLabel>Service price per month</FieldLabel>
                  <Input
                    type='number'
                    value={serviceFormData.Pricing.monthlyRate}
                    onChange={(e) => {
                      setServiceFormData({
                        ...serviceFormData,
                        Pricing: {
                          ...serviceFormData.Pricing,
                          monthlyRate: e.target.value,
                        },
                      });
                    }}
                    placeholder='e.g. 30000'
                  />
                </Field>
              </div>
              <div className='grid grid-cols-2 gap-x-5'>
                <Field>
                  <FieldLabel htmlFor='form-email'>
                    Service CTA Title
                  </FieldLabel>
                  <Textarea
                    className='placeholder:text-justify min-h-35 max-h-50 py-4 placeholder:italic'
                    placeholder='Give Your Loved One the Quality Elderly Care They Deserve in Nairobi'
                    value={serviceFormData.CTATitle}
                    onChange={(e) => {
                      setServiceFormData({
                        ...serviceFormData,
                        CTATitle: e.target.value,
                      });
                    }}
                  />
                </Field>{' '}
                <Field>
                  <FieldLabel htmlFor='form-email'>
                    Service CTA Description
                  </FieldLabel>
                  <Textarea
                    className='placeholder:text-justify min-h-35 max-h-50 py-4 placeholder:italic'
                    placeholder='Contact Mekin Home Care today for compassionate, professional elderly care services. Let us help your aging parent or relative live comfortably and safely at home in Nairobi. Free assessment available!'
                    value={serviceFormData.CTADescription}
                    onChange={(e) => {
                      setServiceFormData({
                        ...serviceFormData,
                        CTADescription: e.target.value,
                      });
                    }}
                  />
                </Field>
              </div>
              <div className='grid grid-cols-2 gap-x-5'>
                <div className='flex items-center space-x-2'>
                  <Label htmlFor='airplane-mode'>Active service</Label>
                  <Switch
                    value={serviceFormData.IsActive}
                    onCheckedChange={(checked) => {
                      setServiceFormData({
                        ...serviceFormData,
                        IsActive: checked,
                      });
                    }}
                  />
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch
                    value={serviceFormData.IsFeatured}
                    onCheckedChange={(checked) => {
                      setServiceFormData({
                        ...serviceFormData,
                        IsFeatured: checked,
                      });
                    }}
                  />
                  <Label htmlFor='airplane-mode'>Feature service</Label>
                </div>
              </div>
              <Field orientation='horizontal'>
                <Button
                  onClick={() => setOpenWarningBox(true)}
                  className='cursor-pointer hover:bg-red-500/20'
                  type='button'
                  variant='outline'
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    serviceFormData.Title.length === '' ||
                    serviceFormData.ServiceHeroTitle === '' ||
                    serviceFormData.MetaDescription === '' ||
                    serviceFormData.ServiceKeywords.length === 0 ||
                    serviceFormData.ServiceHeroDescription === '' ||
                    serviceFormData.ServiceOverview === '' ||
                    serviceFormData.ServiceBenefits.length === 0 ||
                    serviceFormData.ServiceProcess.length === 0 ||
                    serviceFormData.TargetAudience.length === 0 ||
                    serviceFormData.ServiceInclusion.length === 0 ||
                    serviceFormData.ServiceFeatures.length === 0 ||
                    serviceFormData.ServiceCoverageAreas.length === 0 ||
                    serviceFormData.ServiceFAQs.length === 0 ||
                    serviceFormData.PricingNote === '' ||
                    serviceFormData.ServiceDuration === '' ||
                    serviceFormData.CTATitle === '' ||
                    serviceFormData.CTADescription === '' ||
                    serviceFormData.CTADescription === '' ||
                    !serviceFormData.Pricing.dailyRate ||
                    !serviceFormData.Pricing.monthlyRate ||
                    serviceGallery.length !== 6 ||
                    serviceCoverImage.length !== 1
                  }
                  onClick={handleSubmitServiceFormData}
                  className='w-3/4 disabled:bg-gray-700 cursor-pointer bg-blue-700'
                  type='submit'
                >
                  Create New Service
                </Button>
              </Field>
            </FieldGroup>
            {isUploadingImages && (
              <div className='fixed w-full right-4 bottom-2 max-w-xs flex-col gap-4 [--radius:1rem]'>
                <Item
                  className='bg-gray-300 w-full text-gray-800'
                  variant='muted'
                >
                  <ItemMedia>
                    <Spinner className='size-5' />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className='line-clamp-1'>
                      Uploading service images...
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </div>
            )}
            {isCreatingService && (
              <div className='fixed right-4 bottom-2 w-full max-w-xs flex-col gap-4 [--radius:1rem]'>
                <Item className='bg-gray-300 text-gray-800' variant='muted'>
                  <ItemMedia>
                    <Spinner />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className='line-clamp-1'>
                      Creating service, Please wait...
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <div className='grid grid-cols-1 md:grid-cols-2 slg:grid-cols-3 gap-4 md:gap-6'>
        {servicesRes && servicesRes.length > 0 ? (
          servicesRes.map((service) => (
            <div
              key={service._id}
              className='bg-white rounded-[0.4em] w-full flex flex-col justify-between  outline-1   outline-gray-400'
            >
              <div className='flex flex-col items-center justify-between w-full mb-4 gap-2'>
                <img
                  src={service.ServiceCoverImage.url}
                  className='rounded-t-[0.4em] max-h-50 w-full'
                  alt={`service cover image of ${service.Title}`}
                />
                <div className='flex flex-row justify-between w-full px-3 items-center gap-3'>
                  <h3 className='font-medium text-sm md:text-base'>
                    {service.Title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${service.IsActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {service.IsActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <p className='text-xs md:text-sm px-3 text-gray-600 mb-4'>
                {service.MetaDescription}
              </p>

              <div className='space-y-2 mb-4 px-3 text-xs md:text-sm'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Daily Price:</span>
                  <span className='font-medium'>
                    KES {service.Pricing.dailyRate.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Monthly Price:</span>
                  <span className='font-medium'>
                    KES {service.Pricing.monthlyRate.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Duration:</span>
                  <span className='font-medium'>{service.ServiceDuration}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Total Bookings:</span>
                  <span className='font-medium'>
                    {service.Analytics.TotalBookings}
                  </span>
                </div>
              </div>

              <div className='flex gap-4 h-12  mt-2  p-2 border-t flex-row'>
                <button className='flex-1 py-2 bg-blue-700 hover:bg-blue-600 text-white  text-xs md:text-fmd font-semibold flex items-center justify-center gap-4'>
                  <Pencil className='w-3 h-3 md:w-4 md:h-4' />
                  Edit
                </button>
                <button className='flex-1 py-2 bg-red-600 text-white  text-xs md:text-fmd font-semibold hover:bg-red-500 flex items-center justify-center gap-4'>
                  <Trash2 className='w-3 h-3 md:w-4 md:h-4' />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2>
            There is no services added. Please add the services you're offering
          </h2>
        )}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4'>
        <div>
          <h2 className='text-xl md:text-2xl'>M-Pesa Payments</h2>
          <p className='text-gray-600 text-xs md:text-sm mt-1'>
            Track and manage M-Pesa transactions
          </p>
        </div>
        <button className='bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 text-sm md:text-base w-full sm:w-auto justify-center'>
          <Download className='w-4 h-4' />
          Export
        </button>
      </div>

      {/* Payment Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Total (Today)</p>
          <p className='text-lg md:text-2xl mt-1'>KES 16K</p>
          <p className='text-xs text-green-600 mt-1'>4 transactions</p>
        </div>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>This Month</p>
          <p className='text-lg md:text-2xl mt-1'>KES 375K</p>
          <p className='text-xs text-green-600 mt-1'>98 transactions</p>
        </div>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Pending</p>
          <p className='text-lg md:text-2xl mt-1'>KES 8K</p>
          <p className='text-xs text-orange-600 mt-1'>1 pending</p>
        </div>
        <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs md:text-sm text-gray-600'>Success Rate</p>
          <p className='text-lg md:text-2xl mt-1'>98.5%</p>
          <p className='text-xs text-green-600 mt-1'>Excellent</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className='hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left py-4 px-4 text-sm'>Transaction ID</th>
                <th className='text-left py-4 px-4 text-sm'>Patient</th>
                <th className='text-left py-4 px-4 text-sm'>Phone Number</th>
                <th className='text-left py-4 px-4 text-sm'>Service</th>
                <th className='text-left py-4 px-4 text-sm'>Amount</th>
                <th className='text-left py-4 px-4 text-sm'>Date & Time</th>
                <th className='text-left py-4 px-4 text-sm'>Status</th>
                <th className='text-left py-4 px-4 text-sm'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className='border-b hover:bg-gray-50'>
                  <td className='py-4 px-4 font-mono text-sm'>
                    {payment.transactionId}
                  </td>
                  <td className='py-4 px-4 text-sm'>{payment.patientName}</td>
                  <td className='py-4 px-4 text-sm'>{payment.phone}</td>
                  <td className='py-4 px-4 text-sm'>{payment.service}</td>
                  <td className='py-4 px-4 font-medium text-sm'>
                    KES {payment.amount.toLocaleString()}
                  </td>
                  <td className='py-4 px-4 text-sm'>{payment.date}</td>
                  <td className='py-4 px-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    <button
                      className='p-2 hover:bg-gray-100 rounded'
                      title='View Receipt'
                    >
                      <Eye className='w-4 h-4 text-gray-600' />
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
                <p className='font-medium text-sm mt-1'>
                  {payment.patientName}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}
              >
                {payment.status}
              </span>
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Service:</span>
                <span>{payment.service}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Amount:</span>
                <span className='font-medium text-green-600'>
                  KES {payment.amount.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Phone:</span>
                <span>{payment.phone}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Date:</span>
                <span className='text-xs'>{payment.date}</span>
              </div>
            </div>

            <button className='w-full mt-3 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 flex items-center justify-center gap-1'>
              <Eye className='w-4 h-4' />
              View Receipt
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4'>
        <div>
          <h2 className='text-xl md:text-2xl'>Patient Management</h2>
          <p className='text-gray-600 text-xs md:text-sm mt-1'>
            Manage patient records and history
          </p>
        </div>
        <button className='bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 text-sm md:text-base w-full sm:w-auto justify-center'>
          <Plus className='w-4 h-4' />
          Add Patient
        </button>
      </div>

      <div className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
        <div className='relative'>
          <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search patients...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
          />
        </div>
      </div>

      <div className='bg-white p-6 md:p-12 rounded-lg shadow-sm border border-gray-200 text-center'>
        <Activity className='w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4' />
        <h3 className='text-base md:text-lg mb-2'>Patient Management System</h3>
        <p className='text-xs md:text-base text-gray-600'>
          Track patient records, medical history, appointments, and care plans
        </p>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Reports & Documents</h2>
        <p className='text-gray-600 text-xs md:text-sm mt-1'>
          Generate and download business reports
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {[
          {
            title: 'Monthly Revenue Report',
            description: 'Financial summary and revenue breakdown',
            icon: DollarSign,
            color: 'from-green-400 to-green-600',
          },
          {
            title: 'Appointment Statistics',
            description: 'Detailed appointment analytics',
            icon: Calendar,
            color: 'from-blue-400 to-blue-600',
          },
          {
            title: 'Caregiver Performance',
            description: 'Individual caregiver metrics',
            icon: Users,
            color: 'from-purple-400 to-purple-600',
          },
          {
            title: 'Service Analytics',
            description: 'Service popularity and trends',
            icon: Package,
            color: 'from-orange-400 to-orange-600',
          },
          {
            title: 'Payment Records',
            description: 'Transaction history and summaries',
            icon: CreditCard,
            color: 'from-pink-400 to-pink-600',
          },
          {
            title: 'Customer Feedback',
            description: 'Reviews and satisfaction scores',
            icon: MessageSquare,
            color: 'from-indigo-400 to-indigo-600',
          },
        ].map((report, index) => (
          <div
            key={index}
            className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'
          >
            <div
              className={`w-10 h-10 md:w-12 md:h-12 bg-linear-to-br ${report.color} rounded-lg flex items-center justify-center text-white mb-3 md:mb-4`}
            >
              <report.icon className='w-5 h-5 md:w-6 md:h-6' />
            </div>
            <h3 className='font-medium mb-2 text-sm md:text-base'>
              {report.title}
            </h3>
            <p className='text-xs md:text-sm text-gray-600 mb-3 md:mb-4'>
              {report.description}
            </p>
            <button className='w-full px-3 md:px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 text-xs md:text-sm'>
              <Download className='w-3 h-3 md:w-4 md:h-4' />
              Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Messages & Communications</h2>
        <p className='text-gray-600 text-xs md:text-sm mt-1'>
          Communicate with patients and caregivers
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4'>
          <div className='relative mb-3 md:mb-4'>
            <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm'
            />
          </div>
          <div className='space-y-2'>
            {['Jane Kamau', 'John Ochieng', 'Mary Wanjiku', 'Grace Akinyi'].map(
              (name, index) => (
                <div
                  key={index}
                  className='p-2 md:p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100'
                >
                  <div className='flex items-center gap-2 md:gap-3'>
                    <div className='w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm'>
                      {name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='font-medium text-xs md:text-sm truncate'>
                        {name}
                      </div>
                      <div className='text-xs text-gray-500 truncate'>
                        Last message...
                      </div>
                    </div>
                    <div className='w-2 h-2 bg-blue-600 rounded-full shrink-0'></div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className='lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-12 flex items-center justify-center'>
          <div className='text-center'>
            <MessageSquare className='w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4' />
            <h3 className='text-base md:text-lg mb-2'>Select a conversation</h3>
            <p className='text-xs md:text-base text-gray-600'>
              Choose a conversation from the list to start messaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className='space-y-4 md:space-y-6'>
      <div>
        <h2 className='text-xl md:text-2xl'>Site Settings</h2>
        <p className='text-gray-600 text-xs md:text-sm mt-1'>
          Manage website content and configurations
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
        <div className='bg-white p-4 col-span-2 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>Website Content</h3>
          <div className='space-y-3 md:space-y-4'>
            <h2>Hero Section</h2>
            <div className='flex flex-col w-full gap-3'>
              <Label htmlFor='picture' className='text-start'>
                Hero Image
              </Label>
              <div className='w-full p-2 gap-3 flex flex-col bg-gray-100 rounded-[0.4em] outline-1 outline-gray-300'>
                <div className='flex flex-row p-2 place-items-center outline-1 outline-gray-300 gap-4 rounded-[0.4em] w-full'>
                  {heroImage ? (
                    <div className='relative w-full flex flex-cols items-center justify-center'>
                      <img
                        src={URL.createObjectURL(heroImage)}
                        alt='preview'
                        className='rounded-[0.4em]'
                      />

                      <Trash2Icon
                        onClick={() => {
                          setHeroImage([]);
                        }}
                        className='absolute rounded-[0.2em] backdrop-blur-3xl  top-2 right-3 stroke-red-500'
                      />
                    </div>
                  ) : (
                    <h2>No hero image selected. Please select one</h2>
                  )}
                </div>
                <Field className='flex w-full items-center flex-col cursor-pointer gap-1'>
                  <Input
                    className='bg-white cursor-pointer'
                    accept='image/*'
                    type='file'
                    name='heroImage'
                    onChange={handleSetHeroImage}
                  />
                  <FieldDescription>
                    This image will be displayed on the hero section on the home
                    page.
                  </FieldDescription>
                </Field>
              </div>
            </div>

            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Hero Section Title
              </label>
              <input
                type='text'
                value={siteSettingsData.heroTitle}
                onChange={(e) =>
                  setSiteSettingsData({
                    ...siteSettingsData,
                    heroTitle: e.target.value,
                  })
                }
                placeholder='e.g Trusted Home Care Services in Nairobi – Compassionate Care Right at Home'
                className='w-full px-3 md:px-4 placeholder:italic placeolder:text-gray-300 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Hero Section Description
              </label>
              <textarea
                placeholder='e.g. At Mekin Home Care, we provide reliable and compassionate home-based healthcare services in Nairobi, tailored to meet the unique needs of every patient.Our experienced caregivers and licensed healthcare professionals deliver quality care in the comfort of your home.'
                className='w-full px-3 placeholder:italic placholder:text-gray-300  md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
                rows={4}
                value={siteSettingsData.heroDescription}
                onChange={(e) => {
                  setSiteSettingsData({
                    ...siteSettingsData,
                    heroDescription: e.target.value,
                  });
                }}
              />
            </div>
            <Separator className='bg-blue-500' />
            <h2>Trust Section</h2>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Trust Section Title
              </label>
              <input
                type='text'
                value={siteSettingsData.trustSectionTitle}
                onChange={(e) =>
                  setSiteSettingsData({
                    ...siteSettingsData,
                    trustSectionTitle: e.target.value,
                  })
                }
                placeholder='e.g Our Commitment to Safety & Excellence'
                className='w-full px-3 md:px-4 placeholder:italic placeolder:text-gray-300 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Trust Section Description
              </label>
              <textarea
                placeholder='e.g. At Mekin Home Care, we provide reliable and compassionate home-based healthcare services in Nairobi, tailored to meet the unique needs of every patient.Our experienced caregivers and licensed healthcare professionals deliver quality care in the comfort of your home.'
                className='w-full px-3 placeholder:italic placholder:text-gray-300  md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
                rows={4}
                value={siteSettingsData.trustSectionDescription}
                onChange={(e) => {
                  setSiteSettingsData({
                    ...siteSettingsData,
                    trustSectionDescription: e.target.value,
                  });
                }}
              />
            </div>
            <Separator className='bg-blue-500' />
            <h2>Why Choose Mekin Section</h2>
            <div className='flex flex-col w-full gap-3'>
              <Label htmlFor='picture' className='text-start'>
                Video
              </Label>
              <div className='w-full p-2 gap-3 flex flex-col bg-gray-100 rounded-[0.4em] outline-1 outline-gray-300'>
                <div className='flex flex-row p-2 place-items-center outline-1 outline-gray-300 gap-4 rounded-[0.4em] w-full'>
                  {whyMekinVideo ? (
                    <div className='relative w-full flex flex-cols items-center justify-center'>
                      <video
                        src={URL.createObjectURL(whyMekinVideo)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                        className='rounded-lg'
                      />

                      <Trash2Icon
                        onClick={() => {
                          setWhyMekinVideo([]);
                        }}
                        className='absolute rounded-[0.2em] backdrop-blur-3xl  top-2 right-3 stroke-red-500'
                      />
                    </div>
                  ) : (
                    <h2>No video selected. Please select one</h2>
                  )}
                </div>
                <Field className='flex w-full items-center flex-col cursor-pointer gap-1'>
                  <Input
                    className='bg-white cursor-pointer'
                    accept='video/*'
                    type='file'
                    onChange={handleSetWhyMekinVideo}
                  />
                  <FieldDescription>
                    This video will be displayed on the why choose Mekin section
                    on the home page.
                  </FieldDescription>
                </Field>
              </div>
            </div>

            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Why Mekin Section Title
              </label>
              <input
                type='text'
                value={siteSettingsData.whyMekinTitle}
                onChange={(e) =>
                  setSiteSettingsData({
                    ...siteSettingsData,
                    whyMekinTitle: e.target.value,
                  })
                }
                placeholder='e.g Why Mekin is the Trusted Choice for Skilled Home-Based Medical Care in Nairobi.'
                className='w-full px-3 md:px-4 placeholder:italic placeolder:text-gray-300 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>

            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Why Mekin Section Description
              </label>
              <textarea
                placeholder='e.g. From 24/7 skilled nursing to specialized rehabilitation, Mekin delivers hospital-grade medical excellence directly to your doorstep, ensuring safety, dignity, and professional recovery at home.'
                className='w-full px-3 placeholder:italic placholder:text-gray-300  md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
                rows={4}
                value={siteSettingsData.whyMekinDescription}
                onChange={(e) =>
                  setSiteSettingsData({
                    ...siteSettingsData,
                    whyMekinDescription: e.target.value,
                  })
                }
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Trust keywords
              </label>
              <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                <div className='flex flex-wrap gap-2'>
                  {siteSettingsData.trustKeywords.length > 0 ? (
                    siteSettingsData.trustKeywords.map((keyword, index) => (
                      <Badge key={index}>{keyword}</Badge>
                    ))
                  ) : (
                    <h2>No keywords added yet.</h2>
                  )}
                </div>
                <InputGroup className='w-40 h-7 rounded-[0.3em] '>
                  <InputGroupInput
                    type='text'
                    placeholder='New keyword'
                    className='focus:outline-0 placeholder:italic border-none focus:border-0'
                    value={siteInputData.trustKeyword}
                    onChange={(e) =>
                      setSiteInputData({
                        ...siteInputData,
                        trustKeyword: e.target.value,
                      })
                    }
                  />
                  <InputGroupAddon
                    className='cursor-pointer '
                    align='inline-end'
                  >
                    <Button
                      onClick={() => {
                        let cpyKeywords = [...siteSettingsData.trustKeywords];

                        cpyKeywords.push(siteInputData.trustKeyword);
                        setSiteSettingsData({
                          ...siteSettingsData,
                          trustKeywords: cpyKeywords,
                        });
                        setSiteInputData({
                          ...siteInputData,
                          trustKeyword: '',
                        });
                      }}
                      disabled={siteInputData.trustKeyword.length < 4}
                      className='h-6 px-2 disabled:bg-gray-400 bg-blue-700'
                    >
                      Add
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            <Separator className='bg-blue-500' />
            <h2>Home Page FAQs</h2>
            <div className='flex flex-col gap-3'>
              <div className='flex outline-1 outline-gray-200 p-3 rounded-[0.4em] flex-col gap-3'>
                <div className='grid grid-cols-1 gap-2'>
                  {siteSettingsData.homepageFaqs.length > 0 ? (
                    siteSettingsData.homepageFaqs.map((faq) => (
                      <div className='flex flex-col outline-1 outline-blue-400 w-full rounded-[0.4em] px-5 py-2  gap-1'>
                        <h2 className='text-gray-950 font-semibold'>
                          {faq.question}
                        </h2>
                        <Separator />
                        <p className='text-fsm text-justify'>{faq.answer}</p>
                      </div>
                    ))
                  ) : (
                    <h2>No Homepage FAQs added. Please add atleast five</h2>
                  )}
                </div>

                <div className='flex flex-col outline-1 w-3/4 rounded-[0.4em] px-3 outline-gray-200 gap-3'>
                  <Field>
                    <FieldLabel>Question</FieldLabel>
                    <Input
                      type='text'
                      placeholder='What is home based care and how does it work in Nairobi?'
                      value={siteInputData.faq.question}
                      onChange={(e) => {
                        setSiteInputData({
                          ...siteInputData,

                          faq: {
                            ...siteInputData.faq,
                            question: e.target.value,
                          },
                        });
                      }}
                    />

                    <FieldLabel>Answer</FieldLabel>
                    <Textarea
                      className='placeholder:text-justify min-h-25 py-4 placeholder:italic '
                      type='text'
                      placeholder='Home based care involves professional healthcare services delivered in the comfort of your home. In Nairobi, Mekin Homecare provides licensed nurses and certified caregivers who assess your needs, create a personalized care plan, and deliver ongoing medical or supportive care without the need for hospital visits.'
                      value={siteInputData.faq.answer}
                      onChange={(e) => {
                        setSiteInputData({
                          ...siteInputData,

                          faq: {
                            ...siteInputData.faq,
                            answer: e.target.value,
                          },
                        });
                      }}
                    />
                  </Field>
                  <Button
                    disabled={
                      siteInputData.faq.answer.length < 10 ||
                      siteInputData.faq.question.length < 20
                    }
                    onClick={(e) => {
                      let cpyFAQs = [...siteSettingsData.homepageFaqs];
                      cpyFAQs.push(siteInputData.faq);
                      setSiteSettingsData({
                        ...siteSettingsData,
                        homepageFaqs: cpyFAQs,
                      });
                      setSiteInputData({
                        ...siteInputData,
                        faq: {
                          answer: '',
                          question: '',
                        },
                      });
                    }}
                  >
                    Add FAQ
                  </Button>
                </div>
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row justify-end gap-3'>
              <button className='px-4 md:px-6 py-1  border border-gray-300 text-gray-700 rounded-[0.4em] hover:bg-gray-50 text-sm md:text-base'>
                Cancel
              </button>
              <button
                disabled={
                  siteSettingsData.heroTitle.length < 40 ||
                  siteSettingsData.heroDescription.length < 100 ||
                  siteSettingsData.trustSectionTitle.length < 10 ||
                  siteSettingsData.trustSectionDescription.length < 100 ||
                  siteSettingsData.whyMekinTitle.length < 10 ||
                  siteSettingsData.whyMekinDescription.length < 100 ||
                  siteSettingsData.trustKeywords.length < 1 ||
                  siteSettingsData.homepageFaqs.length < 1
                }
                onClick={handleSubmitHomePageData}
                className='px-4 md:px-6 py-1 bg-blue-600 text-white rounded-[0.4em] hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2 text-sm md:text-base'
              >
                <Check className='w-4 h-4' />
                Save Changes
              </button>
              <Toaster />
            </div>
            {isUpdatingSiteSettings !== '' ? (
              <div className='fixed w-full right-4 bottom-2 max-w-xs flex-col gap-4 [--radius:1rem]'>
                <Item
                  className='bg-gray-300 w-full text-gray-800'
                  variant='muted'
                >
                  <ItemMedia>
                    <Spinner className='size-5' />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className='line-clamp-1'>
                      {isUpdatingSiteSettings}
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </div>
            ) : null}
          </div>
        </div>
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>
            Business Information
          </h3>
          <div className='space-y-3 md:space-y-4'>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Business Name
              </label>
              <input
                type='text'
                defaultValue='Mekin Home Care'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Tagline
              </label>
              <input
                type='text'
                defaultValue='Quality Care at Your Doorstep'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Contact Email
              </label>
              <input
                type='email'
                defaultValue='info@mekinhomecare.co.ke'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Phone Number
              </label>
              <input
                type='tel'
                defaultValue='+254 700 000 000'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Address
              </label>
              <textarea
                defaultValue='Nairobi, Kenya'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>
            M-Pesa Configuration
          </h3>
          <div className='space-y-3 md:space-y-4'>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Paybill Number
              </label>
              <input
                type='text'
                placeholder='Enter paybill number'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Account Reference
              </label>
              <input
                type='text'
                placeholder='Enter account reference'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
            <div>
              <label className='block text-xs md:text-sm text-gray-600 mb-2'>
                Till Number (Optional)
              </label>
              <input
                type='text'
                placeholder='Enter till number'
                className='w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base'
              />
            </div>
          </div>
        </div>

        <div className='bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-base md:text-lg mb-3 md:mb-4'>
            Notification Settings
          </h3>
          <div className='space-y-2 md:space-y-3'>
            {[
              'Email notifications for new appointments',
              'SMS alerts for payment confirmations',
              'Daily summary reports',
              'Caregiver assignment notifications',
              'Customer feedback alerts',
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
      </div>

      <div className='flex flex-col-reverse sm:flex-row justify-end gap-3'>
        <button className='px-4 md:px-6 py-1 border border-gray-300 text-gray-700 rounded-[0.4em] hover:bg-gray-50 text-sm md:text-base'>
          Cancel
        </button>
        <button className='px-4 md:px-6 py-1 bg-blue-600 text-white rounded-[0.4em] hover:bg-blue-700 flex items-center justify-center gap-2 text-sm md:text-base'>
          <Check className='w-4 h-4' />
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
      case 'applicants':
        return renderApplicants();
      case 'services':
        return renderServices();
      case 'payments':
        return renderPayments();

      case 'patients':
        return renderPatients();
      case 'reports':
        return renderReports();
      case 'messages':
        return renderMessages();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>
        Mekin Home Care - Admin Dashboard | Nairobi Home Care Services
      </title>
      <meta
        name='description'
        content="Manage appointments, caregivers, services, and M-Pesa payments for Mekin Home Care - Nairobi's leading professional home care service provider."
      />
      <meta
        name='keywords'
        content='home care, Nairobi, elderly care, caregiver, healthcare, admin dashboard, appointment management'
      />
      <meta property='og:title' content='Mekin Home Care - Admin Dashboard' />
      <meta
        property='og:description'
        content='Advanced admin dashboard for managing home care services in Nairobi'
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
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'w-50' : 'w-50 lg:w-18'} 
          bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
        `}
        >
          {/* Logo */}
          <div className='h-14  md:h-16 flex items-center justify-between px-4 outline-1 outline-gray-200 rounded-b-2xl'>
            {(sidebarOpen || mobileSidebarOpen) && (
              <div>
                <h1 className='text-lg animateCon  md:text-xl text-blue-600'>
                  Mekin Care
                </h1>
                <p className='text-xs animateCon text-gray-500'>
                  Admin Dashboard
                </p>
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
              className='p-2 hover:bg-gray-100 rounded-lg lg:block'
            >
              {mobileSidebarOpen ||
                (sidebarOpen && window.innerWidth >= 1024) ? (
                <X className='w-5 h-5 lg:hidden' />
              ) : null}

              <ChevronLeft
                className={` ${sidebarOpen ? 'rotate-0' : 'rotate-180'} w-5 transform duration-1000 ease-in-out h-5 hidden lg:block`}
              />
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
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className='w-5 h-5 shrink-0' />
                  {(sidebarOpen || mobileSidebarOpen) && (
                    <span className='text-sm animateCon'>{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className='p-4 rounded-t-2xl outline-1 outline-gray-200  cursor-pointer flex flex-col items-center gap-3 '>
            <div className='flex items-center gap-3 px-3 py-1 rounded-[0.5em] hover:bg-blue-700/10 '>
              <div className='w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shrink-0'>
                {authRes &&
                  authRes.personalInfo &&
                  authRes.personalInfo.avatar ? (
                  <img
                    src={authRes?.personalInfo?.avatar}
                    loading='lazy'
                    alt='Admin'
                    onClick={() => setOpenAdminQuickSettings(true)}
                    className='rounded-full w-10 h-10'
                  />
                ) : authRes &&
                  authRes.personalInfo &&
                  authRes.personalInfo.fullName !== '' &&
                  !authRes.personalInfo.avatar ? (
                  <h2>
                    {authRes?.personalInfo?.firstName[0].toUpperCase() +
                      authRes?.personalInfo?.firstName[1].toUpperCase()}
                  </h2>
                ) : (
                  <h2>AD</h2>
                )}
              </div>
              {(sidebarOpen || mobileSidebarOpen) && (
                <button
                  onClick={() => setOpenAdminQuickSettings(true)}
                  className='flex-1 flex flex-col items-start min-w-0'
                >
                  <h2 className='text-sm truncate w-25 text-start font-semibold pointer-events-none '>
                    {authRes?.personalInfo?.firstName !== ''
                      ? authRes?.personalInfo?.firstName
                      : 'Admin User'}
                  </h2>
                  <p className='text-xs pointer-events-none truncate w-25 text-gray-500'>
                    {authRes?.personalInfo?.email}
                  </p>
                </button>
              )}
            </div>
            {sidebarOpen || mobileSidebarOpen ? (
              <button
                onClick={handleLogoutUser}
                className='items-center  hover:bg-red-500/40 bg-red-500/20 justify-center gap-4 w-11/12 rounded-[0.2em] flex flex-row py-0.5 '
              >
                <LogOut size={20} className='stroke-red-500' />
                <p className='text-gray-900'>Logout</p>
              </button>
            ) : (
              <LogOut onClick={handleLogoutUser} />
            )}
            <Sheet
              open={openAdminQuickSettings}
              onOpenChange={() =>
                setOpenAdminQuickSettings(!openAdminQuickSettings)
              }
            >
              <SheetContent className='w-1/3 p-2'>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to Admin Dashboard
                  </SheetDescription>
                </SheetHeader>
                <div className=' flex-1 flex flex-col auto-rows-min px-4'>
                  {pending ? (
                    <div className='flex flex-col items-center gap-1'>
                      <Skeleton className='h-30 w-30 rounded-full' />

                      <Skeleton className='h-4 w-50' />
                    </div>
                  ) : (
                    <div className='relative flex w-full items-center  flex-col'>
                      <img
                        src={
                          authRes?.personalInfo?.avatar !== null
                            ? authRes?.personalInfo?.avatar
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStvL8kNVKvJskGpi8do02RNw2bn3sKxTTJ2g&s'
                        }
                        className='w-30 h-30 rounded-full'
                      />

                      <Field className='absolute w-3/5 top-22 rounded-[0.4em] left-[40%] bg-white items-center'>
                        <Input
                          accept='image/*'
                          onChange={handleProfileImageChange}
                          type='file'
                        />
                      </Field>
                    </div>
                  )}

                  <div className='grid gap-3'>
                    <Label htmlFor='sheet-demo-name'>Name</Label>
                    <Input defaultValue='Pedro Duarte' />
                  </div>
                </div>
                <SheetFooter>
                  <Button type='submit'>Save changes</Button>
                  <SheetClose asChild>
                    <Button variant='outline'>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 flex flex-col overflow-hidden w-full'>
          {/* Header */}
          <header className='h-14 md:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-6 shrink-0'>
            <div className='flex items-center gap-2 md:gap-3 min-w-0 flex-1'>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className='lg:hidden p-2 hover:bg-gray-100 rounded-lg shrink-0'
              >
                <Menu className='w-5 h-5' />
              </button>
              <div className='min-w-0'>
                <h2 className='text-base md:text-xl truncate'>
                  {navigationItems.find((item) => item.id === activeTab)?.label}
                </h2>
                <p className='text-xs md:text-sm text-gray-500 hidden sm:block'>
                  Welcome back, Admin
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2 md:gap-4 shrink-0'>
              <button className='relative p-2 hover:bg-gray-100 rounded-lg'>
                <Bell className='w-4 h-4 md:w-5 md:h-5' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
              </button>
              <div className='text-right hidden md:block'>
                <div className='text-sm'>
                  {customFormatter.format(new Date())}
                </div>
                <div className='text-xs text-gray-500'>Nairobi, Kenya</div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className='flex-1 overflow-y-auto p-3 md:p-6'>
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}
