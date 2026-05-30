import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetail";
import EnrollPage from "./pages/Enroll";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import FAQPage from "./pages/FAQ";
import TestimonialsPage from "./pages/Testimonials";
import WaitlistPage from "./pages/Waitlist";
import ApplicationsPage from "./pages/Applications";
import DashboardPage from "./pages/Dashboard";
import ConnectPage from "./pages/Connect";
import CareersPage from "./pages/Careers";
import NotFoundPage from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/enroll/:slug" element={<EnrollPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:slug" element={<EventDetailPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
