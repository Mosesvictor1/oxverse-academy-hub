import { Navigate, Route, Routes } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "@/admin/lib/auth";
import { canAccess, type NavKey } from "@/admin/lib/roles";
import { AdminShell } from "@/admin/components/AdminShell";
import AdminLoginPage from "@/admin/pages/Login";
import AdminDashboardPage from "@/admin/pages/Dashboard";
import AdminStudentsPage from "@/admin/pages/Students";
import AdminStudentDetailPage from "@/admin/pages/StudentDetail";
import AdminPaymentsPage from "@/admin/pages/Payments";
import AdminReportsPage from "@/admin/pages/Reports";
import AdminCoursesPage from "@/admin/pages/Courses";
import AdminAdminsPage from "@/admin/pages/Admins";
import AdminSettingsPage from "@/admin/pages/Settings";

function Protected() {
  const { admin, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Checking your session…
      </div>
    );
  }
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <AdminShell />;
}

function Guard({ nav, children }: { nav: NavKey; children: React.ReactNode }) {
  const { admin } = useAdminAuth();
  if (!canAccess(admin?.role, nav)) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<Protected />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="students" element={<Guard nav="students"><AdminStudentsPage /></Guard>} />
          <Route path="students/:studentId" element={<Guard nav="students"><AdminStudentDetailPage /></Guard>} />
          <Route path="payments" element={<Guard nav="payments"><AdminPaymentsPage /></Guard>} />
          <Route path="reports" element={<Guard nav="reports"><AdminReportsPage /></Guard>} />
          <Route path="registrations" element={<Guard nav="registrations"><AdminReportsPage /></Guard>} />
          <Route path="courses" element={<Guard nav="courses"><AdminCoursesPage /></Guard>} />
          <Route path="admins" element={<Guard nav="admins"><AdminAdminsPage /></Guard>} />
          <Route path="settings" element={<Guard nav="settings"><AdminSettingsPage /></Guard>} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}