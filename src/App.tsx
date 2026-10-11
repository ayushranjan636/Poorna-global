import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/About/AboutPage';
import ServicePage from './pages/Services/ServicePage';
import SectorsPage from './pages/Sectors/SectorsPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ContactPage from './pages/Contact/ContactPage';
import BlogPage from './pages/Blog/BlogPage';
import BlogPostPage from './pages/Blog/BlogPostPage';
import PrivacyPolicyPage from './pages/Legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/Legal/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Header />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          {/* The previous case-study pages carried unverifiable client names and
              performance figures. The routes are preserved and redirected to the
              real, sourced project record so existing links do not break. */}
          <Route path="/case-studies" element={<Navigate to="/projects" replace />} />
          <Route path="/case-studies/:slug" element={<Navigate to="/projects" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
