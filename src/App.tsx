import { useEffect, useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { CurrentlyLearning } from '@/components/CurrentlyLearning';
import { GitHubActivity } from '@/components/GitHubActivity';
import { DeveloperConsole } from '@/components/DeveloperConsole';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

function App() {
  const path = useRoute();

  if (path === '/admin') {
    return (
      <AuthProvider>
        <AdminPanel />
      </AuthProvider>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <CurrentlyLearning />
        <GitHubActivity />
        <section className="section-pad">
          <div className="section-shell">
            <DeveloperConsole />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
