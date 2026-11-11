import { LayoutDashboard, Stethoscope, Users, Settings } from "lucide-react";

export const adminRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Doctors",
        url: "/doctor",
        icon: Stethoscope,
      },
      {
        title: "Patients",
        url: "/patient",
        icon: Users,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
