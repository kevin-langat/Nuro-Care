import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';

function CommonLayout() {
  const navigateTo = useNavigate();
  useEffect(() => {
    if (window.location.pathname === '/') {
      navigateTo('/home');
    }
  }, [location.pathname]);
  return (
    <div className='w-full flex flex-col items-center gap-2'>
      <NavBar />
      <main className='w-full mt-13'>
        <Outlet />
      </main>
    </div>
  );
}
export default CommonLayout;
