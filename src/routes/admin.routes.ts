
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Settings,
  UserPlus,
  List,
} from "lucide-react";

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
        icon: Stethoscope,
        items: [
          {
            title: "All Doctors",
            url: "/doctor/all-doctor",
            icon: List,
          },
          {
            title: "Create Doctor",
            url: "/doctor/create",
            icon: UserPlus,
          },
        ],
      },
      {
        title: "Patients",
        url: "/patients",
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
