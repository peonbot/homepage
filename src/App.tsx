import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RunHQPage from './pages/RunHQPage';
import WidgetPage from './pages/WidgetPage';
import ProjectPage from './pages/ProjectPage';
import ProjectTaskPage from './pages/ProjectTaskPage';
import ProjectsPage from './pages/ProjectsPage';
import ProductsPage from './pages/ProductsPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import VisualPage from './pages/VisualPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent-automation" element={<HomePage />} />
        <Route path="/runhq" element={<RunHQPage />} />
        <Route path="/widget" element={<WidgetPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs/*" element={<DocsPage />} />
        <Route path="/visual" element={<VisualPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/project/:slug/proposals/:ticketId" element={<ProjectTaskPage />} />
        <Route path="/project/:slug/task/:ticketId" element={<ProjectTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
