import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RunHQPage from './pages/RunHQPage';
import WidgetPage from './pages/WidgetPage';
import ProjectPage from './pages/ProjectPage';
import ProjectTaskPage from './pages/ProjectTaskPage';
import ProjectsPage from './pages/ProjectsPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import Navbar from './components/Navbar';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const heroPaths = ['/', '/agent-automation'];
  const isHero = heroPaths.includes(pathname);

  if (isHero) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent-automation" element={<HomePage heroVariant="automate" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <Routes>
        <Route path="/runhq" element={<RunHQPage />} />
        <Route path="/widget" element={<WidgetPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/project/:slug/proposals/:ticketId" element={<ProjectTaskPage />} />
        <Route path="/project/:slug/task/:ticketId" element={<ProjectTaskPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
