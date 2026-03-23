import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Models from '../components/Models';
import Innovation from '../components/Innovation';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <Navbar />
      <Hero />
      <StatsBar />
      <Models />
      <Innovation />
      <Testimonials />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Home;