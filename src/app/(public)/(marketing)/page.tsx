import DashboardAnalytics from "@/components/layout/home/dashboardAnalytics";
import DoctorManagement from "@/components/layout/home/doctorManagement";
import HeroSection from "@/components/layout/home/heroSection";
import HowItWorks from "@/components/layout/home/howItWork";
import PatientManagement from "@/components/layout/home/patientManagement";
import PlatOverview from "@/components/layout/home/platformOverview";
import WhyChooseUs from "@/components/layout/home/whyChooseUs";

export default function Home() {
  return (
    <div>
     <HeroSection/>
     <PlatOverview/>
    <DoctorManagement />
    <PatientManagement />
    <DashboardAnalytics />
    <HowItWorks />
    <WhyChooseUs />
    </div>
  );
}
  