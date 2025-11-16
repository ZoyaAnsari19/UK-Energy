import Header from './components/Header';
import SolarInfoSection from './components/SolarInfoSection';
import SolarVideo from './components/SolarVideo';
import SolarWork from './components/SolarWork';
import EventSection from './components/EventSection';
import RegisterForm from './components/RegisterForm';
import FooterSection from './components/FooterSection';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Estimate from './components/Estimate';

export default function Home() {
  return (
    <>
      <Header />
      <SolarInfoSection />
      <SolarWork />
      <SolarVideo />
      <EventSection />
      <RegisterForm />
      <Services />
      <Testimonials />
      <Estimate />
      <FooterSection />
    </>
  );
}
