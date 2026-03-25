import Blogs from '@/components/mekinComponents/Blogs';

import FAQS from '@/components/mekinComponents/FAQs';
import Footer from '@/components/mekinComponents/Footer';
import Hero from '@/components/mekinComponents/Hero';
import Services from '@/components/mekinComponents/Services';
import Subscription from '@/components/mekinComponents/Subscription';
import Testimonials from '@/components/mekinComponents/Testimonials';
import Trust from '@/components/mekinComponents/Trust';
import WhyMekin from '@/components/mekinComponents/WhyMekin';
import CTA from '@/components/mekinComponents/CTA';

function HomePage() {
  return (
    <div className=' w-full flex flex-col items-center'>
      <Hero />
      <Trust />
      <Services />
      <WhyMekin />
      <Subscription />
      <Testimonials />
      <FAQS />
      <Blogs />
      <CTA
        body={
          'Reliable care that brings comfort, dignity, and peace of mind at home'
        }
      />
      <Footer />
    </div>
  );
}
export default HomePage;
