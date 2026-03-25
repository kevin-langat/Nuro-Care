import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  CreditCard,
  Settings,
  FileText,
  MessageSquare,
  UserPlus,
  Activity,
} from 'lucide-react';

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'caregivers', label: 'Caregivers', icon: Users },
  { id: 'applicants', label: 'Applicants', icon: UserPlus },
  { id: 'services', label: 'Services', icon: Package },
  { id: 'payments', label: 'M-Pesa Payments', icon: CreditCard },
  { id: 'patients', label: 'Patients', icon: Activity },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Site Settings', icon: Settings },
];

export const INITIAL_SERVICE_STATE = {
  Title: '',
  ServiceHeroTitle: '',
  MetaDescription: '',
  ServiceKeywords: [],
  ServiceHeroDescription: '',
  ServiceOverview: '',
  ServiceBenefits: [],
  ServiceProcess: [],
  TargetAudience: [],
  ServiceInclusion: [],
  ServiceFeatures: [],
  ServiceCoverageAreas: [],
  ServiceFAQs: [],
  PricingNote: '',
  ServiceDuration: '',
  CTATitle: '',
  CTADescription: '',
  Pricing: {
    dailyRate: Number,
    monthlyRate: Number,
  },

  IsActive: false,
  IsFeatured: false,
};

export const SERVICE_INPUT_DATA = {
  keyword: '',
  benefit: {
    title: '',
    description: '',
  },
  process: {
    title: '',
    description: '',
  },
  audient: {
    title: '',
    description: '',
  },
  inclusionItem: '',
  feature: {
    category: '',
    item: '',
  },
  coverageArea: '',
  FAQ: {
    question: '',
    answer: ''
  }
};
