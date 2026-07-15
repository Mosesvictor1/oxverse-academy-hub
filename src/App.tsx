import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetail";
import CourseRoadmapPage from "./pages/CourseRoadmap";
import TracksPage from "./pages/Tracks";
import TrackDetailPage from "./pages/TrackDetail";
import TrackPathPage from "./pages/TrackPath";
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
import RegisterPage from "./pages/Register";
import ITRegistrationPage from "./pages/ITRegistration";
import { Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/Applications";
import AmbassadorPage from "./pages/Ambassador";
import AmbassadorOnboardPage from "./pages/AmbassadorOnboard";
import DashboardPage from "./pages/Dashboard";
import ConnectPage from "./pages/Connect";
import CareersPage from "./pages/Careers";
import FacultyPage from "./pages/Faculty";
import SummerBootcampPage from "./pages/SummerBootcamp";
import NotFoundPage from "./pages/NotFound";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/courses/:slug/roadmap" element={<CourseRoadmapPage />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/tracks/:slug" element={<TrackDetailPage />} />
      <Route path="/tracks/:slug/:pathSlug" element={<TrackPathPage />} />
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
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/:ref" element={<RegisterPage />} />
      <Route path="/it-registration" element={<ITRegistrationPage />} />
      <Route path="/free-class" element={<Navigate to="/register" replace />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/ambassador" element={<AmbassadorPage />} />
      <Route path="/ambassador/onboard" element={<AmbassadorOnboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/summer-tech-bootcamp" element={<SummerBootcampPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
