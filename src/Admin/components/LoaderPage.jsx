import { globalState } from '@/context/GlobalContext';
import { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';

function LoaderPage({ children, role }) {
  const { authRes } = useContext(globalState);

  return authRes && authRes.role === role ? (
    <div>{children}</div>
  ) : (
    <div className='w-full h-100 flex mt-10 flex-col items-center justify-center'>
      <TailSpin
        visible={true}
        height='80'
        width='80'
        color='#155dfc'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
export default LoaderPage;
