import Header from './components/Header';
import SolarInfoSection from './components/SolarInfoSection';
import SolarVideo from './components/SolarVideo';
import SolarWork from './components/SolarWork';
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
      <Services />
      <Testimonials />
      <Estimate />
      <FooterSection />
    </>
  );
}
