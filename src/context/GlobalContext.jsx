import { fetchPatientAppointments } from '@/APIs/Appointments';
import { fetchPublicServices } from '@/APIs/User';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const globalState = createContext(null);

function GlobalContext({ children }) {
  const [theme, setTheme] = useState(null);
  const [authRes, setAuthRes] = useState(null);
  const [patientAppointments, setPatientAppointments] = useState(null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const navigateTo = useNavigate();
  const [serviceRes, setServiceRes] = useState([]);
  const [currentSiteSettings, setCurrentSiteSettings] = useState(null);

  async function fetchUserData() {
    await axios
      .post(
        '/api/auth/authenticate-user',
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setAuthRes(res.data.user);

        if (res.data.success) {
          if (res.data.user.role === 'admin') {
            navigateTo('/admin-dashboard');
          } else if (res.data.user.role === 'client') {
            // fetch appointments
            fetchPatientAppointments()
              .then((res) => {
                setPatientAppointments(res.data.userAppointments);
              })
              .catch((e) => {
                toast.error('Some error occurred');
              });
            navigateTo('/patient-dashboard');
          } else {
            navigateTo('/home');
          }
        }
      })
      .catch((err) => {
        setAuthRes(err.response.data);
        console.log(err);
        if (
          (err.response && err.response.status === 401) ||
          err.response.request.status === 500 ||
          err.response.request.status === 404
        ) {
          if (
            location.pathname === '/patient-dashboard' ||
            location.pathname === '/admin-dashboard' ||
            location.pathname === '/auth/verify-account'
          ) {
            navigateTo('/home');
          }
        }
      });
  }

  // auth  user to prevent unauthorised access
  useEffect(() => {
    fetchUserData();
    fetchPublicServices()
      .then((res) => {
        setServiceRes(res.data.requiredInfo);

        setCurrentSiteSettings(res.data.currentSiteSettings);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  }, [location.pathname]);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('savedTheme', JSON.stringify(theme));
    }

    document.documentElement.classList[0].replace(theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('savedTheme'));
    if (!savedTheme) {
      if (prefersDark) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    } else {
      setTheme(savedTheme);
    }
  }, []);
  return (
    <globalState.Provider
      value={{
        patientAppointments,
        authRes: authRes,
        fetchUserData,
        serviceRes,
        currentSiteSettings,
      }}
    >
      {children}
    </globalState.Provider>
  );
}
export default GlobalContext;
