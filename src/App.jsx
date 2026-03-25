import { Route, Routes } from 'react-router-dom';
import CommonLayout from './layout/CommonLayout';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import Login from './components/mekinComponents/Login';
import { CaregiverApplicationForm } from './components/mekinComponents/CaregiverApplicationForm';
import AdminDashboard from './Admin/AdminDash';
import EmailVerification from './components/mekinComponents/EmailVerification';
import PatientDashboard from './Patient/PatientDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import BlogPage from './pages/BlogPage';
import CaregiversPage from './pages/CaregiversPage';
import { ServiceDetailPage } from './pages/ServicePage';
import LoaderPage from './Admin/components/LoaderPage';

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />

      <Route path='/' element={<CommonLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route path='services/:serviceSlug' element={<ServiceDetailPage />} />
        <Route path='caregivers' element={<CaregiversPage />} />
        <Route path='caregivers/apply' element={<CaregiverApplicationForm />} />
        <Route path='/blogs/:id' element={<BlogPage />} />
        <Route path='/about-mekin' element={<AboutPage />} />
        <Route path='/contact-us' element={<ContactPage />} />
        <Route path='/book-appointment' element={<BookingPage />} />
      </Route>
      <Route path='/auth/sign-in' element={<Login signUp={false} />} />
      <Route path='/auth/sign-up' element={<Login signUp={true} />} />
      <Route
        path='/auth/verify-account/:cryptography'
        element={<EmailVerification />}
      />
      <Route
        path='/admin-dashboard'
        element={
          <LoaderPage role='admin'>
            <AdminDashboard />
          </LoaderPage>
        }
      />
      <Route
        path='/patient-dashboard'
        element={
          <LoaderPage role='client'>
            <PatientDashboard />
          </LoaderPage>
        }
      />
    </Routes>
  );
}

export default App;
