import Link from "next/link";
import {
  FaArrowRight,
  FaUserDoctor,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Background Decorations */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-100/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100/70 px-4 py-2 text-sm font-semibold text-green-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
            Smart Healthcare Management
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Healthcare
            <br />
            Management
            <br />
            Made <span className="text-green-600">Simpler.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Manage doctors and patients effortlessly with DoctorTracker.
            Organize healthcare information, track patient records, and simplify
            your daily management workflow in one place.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-green-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:-translate-y-1 hover:bg-green-700"
            >
              Get Started
              <FaArrowRight />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-4 text-sm font-bold text-gray-700 transition-all hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Points */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-7">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FaCheckCircle className="text-green-600" />
              Easy Management
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FaCheckCircle className="text-green-600" />
              Secure Records
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FaCheckCircle className="text-green-600" />
              Simple Workflow
            </div>
          </div>
        </div>

        {/* Right Dashboard Preview */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* Main Card */}
          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-2xl shadow-green-900/10 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Dashboard Overview
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Welcome Back!
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <FaCalendarCheck size={20} />
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-green-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <FaUserDoctor size={19} />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-500">
                  Total Doctors
                </p>
                <h3 className="mt-1 text-3xl font-bold text-gray-900">120+</h3>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <FaUsers size={19} />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-500">
                  Total Patients
                </p>
                <h3 className="mt-1 text-3xl font-bold text-gray-900">850+</h3>
              </div>
            </div>

            {/* Activity */}
            <div className="mt-6 rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Recent Activity</h3>
                <span className="text-xs font-semibold text-green-600">
                  Overview
                </span>
              </div>

              <div className="mt-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <FaUserDoctor />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Doctor Management
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Manage doctor information
                    </p>
                  </div>
                  <FaCheckCircle className="text-green-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <FaUsers />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Patient Management
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Organize patient records
                    </p>
                  </div>
                  <FaCheckCircle className="text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -right-3 top-16 hidden items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-xl sm:flex lg:-right-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
              <FaCheckCircle size={19} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Organized & Secure
              </p>
              <p className="text-xs text-gray-500">Healthcare management</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
