function Location() {
  return (
    <div className='w-full mt-4 flex flex-col items-center justify-center'>
      <h1 className='text-sky-600  text-fmd tmd:text-fxl tmd:font-semibold'>
        Visit Us Today
      </h1>
      <p className='text-fxl sm:text-2xl tmd:text-4xl transform duration-500 ease-in-out lg:text-3xl font-semibold text-center'>
        Where we are Located
      </p>
      <div className='bsm:w-3/4 w-11/12 bsm:h-80 h-100 outline-1 outline-gray-300 mt-6 rounded-[0.3em]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63819.33365885752!2d36.880682038964835!3d-1.3515312970532762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f0d67c9df2699%3A0x9fbc01f4a714094f!2sPili%20Trade%20Center!5e0!3m2!1sen!2ske!4v1766986547815!5m2!1sen!2ske'
          title='Our Location'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy' // Optimized for performance
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
}
export default Location;
