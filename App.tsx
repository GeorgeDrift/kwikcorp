
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionVision from './components/MissionVision';
import Story from './components/Story';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from './components/AdminDashboard';
import { SERVICES, IMAGES } from './constants';
import { SiteContent } from './types';
import { ApiService } from './services/api';

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState<SiteContent>({
    mission: "To enhance agricultural efficiency through innovative digital solutions.",
    vision: "To become a leading agritech solution provider.",
    story: "AgriKwik aims to bridge the gap between tradition and technology.",
    images: {
      hero: IMAGES.hero,
      about: IMAGES.about,
      logo: IMAGES.logo,
      sectionBg: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"
    },
    services: SERVICES,
    gallery: [
      {
        id: '1',
        url: 'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/599941363_25317666681234294_7807654653635817820_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEFYiaICKJgke4AfPFZKJ-oe_OfHr9oi3N7858ev2iLc8TVNSnyyMD3hrra3pJIJz66Hx1aINY_lNpejyloHmh5&_nc_ohc=uPzXVWyMdycQ7kNvwFjunsj&_nc_oc=AdnbxOrfcbnmJMwHeKD5NW-LAmGA_dQ8E-0TTiknw0YjhsIeYYAQ-MYz29C8kELOqTg&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=UtrmwabOAwcguHohPXTSWA&oh=00_AfrdE80Xolkr4qlNo0j0fP_4mcs54gmYxBs3dAioWiYMyw&oe=69632ABE',
        title: 'Field Agent Network',
        category: 'Field Agents',
        description: 'Our dedicated field agents provide hands-on training and support to farmers, ensuring technology adoption and maximizing crop yields.'
      },
      {
        id: '2',
        url: 'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/598581670_1300691878761669_8165048595316856216_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGEB-azX497qK29DCBjQrORm8Ngcal-8hybw2BxqX7yHKsEY0FFz-EWuMKl18f4SwgL6b7z-bvSlb-xZFa2EQOx&_nc_ohc=xDIdpLkH0zAQ7kNvwFi8xEs&_nc_oc=Adlb99anDjrcViIuGSneU-kuwvFAzZKtWYbbDek_qs3A8ME8VEO7T06HKJCCGeev5BA&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=vBBdAbbNPPjikfXKSLzdKA&oh=00_AfobGND-Apl7HArFD0HByEw9JrzFqnsUgjCAX3FYn5lnmA&oe=69632792',
        title: 'Sustainable Growth',
        category: 'Field Agents',
        description: 'Empowering rural communities through decentralized knowledge sharing and sustainable agricultural practices monitored by our field teams.'
      },
      {
        id: '3',
        url: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/601818029_122112188031110076_2947405286352830443_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFHnxr8NpYwZfIpMHHwJ3fcXavLmijDSf5dq8uaKMNJ_g6nn3Ipnh-rYasJyHRHRWskry41zNyH1NdvV8D4vheT&_nc_ohc=MNY9D-pTYOUQ7kNvwG3wiCR&_nc_oc=AdkVtTixzrYgdQBo8ANcDFpUA3CqDWXWglnAhGZM_YljsniocYs_zHa_PVgvLZdrZYw&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=KYzzKij8AzmyvotYbcdtpA&oh=00_Afp5x8VUIctUDmCJw6LvfFvxEn8BT1sfgY58oKMhiSDW8A&oe=696312CB",
        title: "Tech Integration",
        category: "App",
        description: "Launching our latest mobile platform that connects farmers directly with markets."
      },
      {
        id: '4',
        url: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/605126390_122112187221110076_1581533830335102423_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGDaDRlH8S74zNFLcyj2IHlKq38m-XSNBQqrfyb5dI0FJ31_XfQtOfzyjnOKfuQbGrOovWjmvTxPcFYoiKu3ZT5&_nc_ohc=V6uCISatOJsQ7kNvwFq7QhX&_nc_oc=Adl6Rqwja1XKPKvrCA5dFdCHWfp_o7_5erIf4-dzvzKQxTatBjyNyhdJx7-JtQtxCBE&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=o8diduZ4ssfRqiAWRoh_Cg&oh=00_AfpRsRTYfIiLuuqAL25-rLyorekf_jnDiIlBfrJkgE4Vvw&oe=69631F69",
        title: "Smart Farming",
        category: "Innovation",
        description: "Deploying IOT sensors that monitor soil health in real-time."
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await ApiService.getContent();
      if (data) setContent(data);
      setLoading(false);
    };

    const handleHashChange = () => {
      if (window.location.hash === '#manage' || window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    fetchData();

    if (view === 'public') {
      ApiService.logVisit(navigator.userAgent);
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [view]);

  // Fix: Removed call to non-existent ApiService.updateContent on line 73.
  // The backend uses granular updates via AdminDashboard, and the main site re-fetches content on view change.
  const updateContent = async (newContent: SiteContent, password?: string) => {
    setContent(newContent);
  };

  const [clickCount, setClickCount] = useState(0);
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 3) {
      window.location.hash = '#manage';
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 1000);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50 text-green-600 font-bold">Loading KwikCorp Profile...</div>;

  if (view === 'admin') {
    return <AdminDashboard onExit={() => { window.location.hash = ''; setView('public'); }} content={content} onUpdate={updateContent} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-jakarta">
      <Navbar isScrolled={isScrolled} logoUrl={content.images.logo} onLogoClick={handleLogoClick} />

      <main className="flex-grow">
        <section id="home">
          <Hero heroImages={[
            '/hero/hero-1.jpg',
            '/hero/hero-2.jpg',
            '/hero/hero-3.jpg'
          ]} />
        </section>

        <div className="relative">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 overflow-hidden">
            <img src={content.images.sectionBg} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="relative z-10">
            <section id="mission">
              <MissionVision mission={content.mission} vision={content.vision} />
            </section>

            <section id="about" className="bg-white/80 backdrop-blur-sm">
              <Story storyText={content.story} aboutImage={content.images.about} />
            </section>

            <section id="services">
              <Services services={content.services} />
            </section>

            <section id="gallery" className="bg-white/80 backdrop-blur-sm">
              <Gallery items={content.gallery} />
            </section>

            <section id="contact">
              <Contact bgImage={content.images.sectionBg} />
            </section>
          </div>
        </div>
      </main>

      <Footer logoUrl={content.images.logo} />
      <WhatsAppButton />
    </div>
  );
};

export default App;
