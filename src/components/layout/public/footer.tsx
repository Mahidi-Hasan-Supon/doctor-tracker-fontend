
import Link from "next/link";
import {
  HeartPulse,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";


import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function FooterPage() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand Section */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                <HeartPulse size={25} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Doctor<span className="text-green-500">Tracker</span>
                </h2>
                <p className="text-[10px] tracking-wider text-gray-400">
                  YOUR HEALTH, OUR PRIORITY
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Making healthcare management easier and more organized.
              Track doctors, manage patient information, and keep everything
              connected in one place.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition-all hover:border-green-600 hover:bg-green-600 hover:text-white"
                >
                  <Icon size={17} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-green-500"
                  >
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-base font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>Doctor Management</li>
              <li>Patient Management</li>
              <li>Appointment Tracking</li>
              <li>Healthcare Dashboard</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-base font-semibold text-white">
              Get In Touch
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-green-500" />
                <span className="text-sm leading-6 text-gray-400">
                  Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={19} className="shrink-0 text-green-500" />
                <a
                  href="mailto:contact@doctortracker.com"
                  className="text-sm text-gray-400 transition-colors hover:text-green-500"
                >
                  contact@doctortracker.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={19} className="shrink-0 text-green-500" />
                <span className="text-sm text-gray-400">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DoctorTracker. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link
              href="/privacy"
              className="transition-colors hover:text-green-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-green-500"
            >
              Terms of Service
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            Made with <span className="text-green-500">♥</span> for better
            healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
