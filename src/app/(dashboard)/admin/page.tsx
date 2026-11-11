
"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Stethoscope,
  UserRound,
  Activity,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  useDashboardOverview,
  usePatientsPerDoctor,
  useDoctorPatientDistribution,
  usePatientStatistics,
  useDoctorStatistics,
} from "@/hooks";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold tracking-tight">
        {value.toLocaleString()}
      </h2>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={Number(index)} className="h-32 rounded-xl" />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Skeleton className="h-[350px] rounded-xl" />
        <Skeleton className="h-[350px] rounded-xl" />
      </div>

      <Skeleton className="h-[350px] rounded-xl" />
    </div>
  );
};

const AdminDashboardPage = () => {
  const [period, setPeriod] = useState<
    "daily" | "monthly" | "yearly"
  >("daily");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const statisticsParams = useMemo(
    () => ({
      period,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    }),
    [period, startDate, endDate],
  );

  // Dashboard API
  const {
    data: overviewResponse,
    isLoading: overviewLoading,
    isError: overviewError,
    refetch,
  } = useDashboardOverview();

  const {
    data: doctorPatientsResponse,
    isLoading: doctorPatientsLoading,
  } = usePatientsPerDoctor();

  const {
    data: distributionResponse,
    isLoading: distributionLoading,
  } = useDoctorPatientDistribution();

  const {
    data: patientStatsResponse,
    isLoading: patientStatsLoading,
  } = usePatientStatistics(statisticsParams);

  const {
    data: doctorStatsResponse,
    isLoading: doctorStatsLoading,
  } = useDoctorStatistics(statisticsParams);

  // Extract API data
  const overview = overviewResponse?.data;
  const doctorPatients = doctorPatientsResponse?.data ?? [];
  const distribution = distributionResponse?.data ?? [];
  const patientStats = patientStatsResponse?.data ?? [];
  const doctorStats = doctorStatsResponse?.data ?? [];

  // Merge doctor and patient statistics
  const statisticsChartData = useMemo(() => {
    const dateMap = new Map<
      string,
      { date: string; totalDoctors: number; totalPatients: number }
    >();

    doctorStats.forEach((item) => {
      dateMap.set(item.date, {
        date: item.date,
        totalDoctors: item.totalDoctors,
        totalPatients: 0,
      });
    });

    patientStats.forEach((item) => {
      const existing = dateMap.get(item.date);

      dateMap.set(item.date, {
        date: item.date,
        totalDoctors: existing?.totalDoctors ?? 0,
        totalPatients: item.totalPatients,
      });
    });

    return Array.from(dateMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  }, [doctorStats, patientStats]);

  const isStatisticsLoading =
    patientStatsLoading || doctorStatsLoading;

  if (overviewLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>

        <DashboardSkeleton />
      </div>
    );
  }

  if (overviewError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-6 text-center">
        <Activity className="h-12 w-12 text-destructive" />

        <h2 className="text-xl font-semibold">
          Failed to load dashboard
        </h2>

        <p className="text-sm text-muted-foreground">
          Something went wrong while fetching dashboard data.
        </p>

        <Button onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor doctors, patients and healthcare statistics.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          className="w-fit"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Doctors"
          value={overview?.totalDoctors ?? 0}
          description="Total registered doctors"
          icon={Stethoscope}
        />

        <StatCard
          title="Total Patients"
          value={overview?.totalPatients ?? 0}
          description="Total registered patients"
          icon={Users}
        />

        <StatCard
          title="Doctors with Patients"
          value={
            doctorPatients.filter((doctor) => doctor.totalPatients > 0)
              .length
          }
          description="Doctors currently managing patients"
          icon={UserRound}
        />

        <StatCard
          title="Unassigned Patients"
          value={doctorPatients.reduce(
            (total, doctor) => total + doctor.totalPatients,
            0,
          ) === 0 ? (overview?.totalPatients ?? 0) : Math.max(
            0,
            (overview?.totalPatients ?? 0) -
              doctorPatients.reduce(
                (total, doctor) => total + doctor.totalPatients,
                0,
              ),
          )}
          description="Patients without an assigned doctor"
          icon={Activity}
        />
      </div>

      {/* Doctor Analytics */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Patients Per Doctor */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Patients Per Doctor
            </h2>

            <p className="text-sm text-muted-foreground">
              Number of patients assigned to each doctor.
            </p>
          </div>

          {doctorPatientsLoading ? (
            <Skeleton className="h-[280px] w-full" />
          ) : doctorPatients.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
              No doctor data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={doctorPatients}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="doctorName"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={55}
                />

                <YAxis allowDecimals={false} />

                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))" }}
                />

                <Bar
                  dataKey="totalPatients"
                  name="Patients"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Doctor Patient Distribution */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Doctor Patient Distribution
            </h2>

            <p className="text-sm text-muted-foreground">
              Patient distribution among doctors.
            </p>
          </div>

          {distributionLoading ? (
            <Skeleton className="h-[280px] w-full" />
          ) : distribution.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
              No distribution data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={95}
                  paddingAngle={3}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {distribution.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Date Based Statistics */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Date-Based Statistics
            </h2>

            <p className="text-sm text-muted-foreground">
              Track doctor and patient registration over time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={period}
              onChange={(e) =>
                setPeriod(e.target.value as typeof period)
              }
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 rounded-md border bg-background pl-9 pr-2 text-sm"
                aria-label="Start date"
              />
            </div>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 rounded-md border bg-background pl-9 pr-2 text-sm"
                aria-label="End date"
              />
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setPeriod("daily");
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="mt-8">
          {isStatisticsLoading ? (
            <Skeleton className="h-[320px] w-full" />
          ) : statisticsChartData.length === 0 ? (
            <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
              No statistics available for this date range.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={statisticsChartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="doctorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2563eb"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="patientGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#16a34a"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#16a34a"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickMargin={10}
                />

                <YAxis allowDecimals={false} />

                <Tooltip />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="totalDoctors"
                  name="Doctors"
                  stroke="#2563eb"
                  fill="url(#doctorGradient)"
                  strokeWidth={2}
                />

                <Area
                  type="monotone"
                  dataKey="totalPatients"
                  name="Patients"
                  stroke="#16a34a"
                  fill="url(#patientGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Doctor Details Table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Doctor Overview
          </h2>

          <p className="text-sm text-muted-foreground">
            Summary of doctors and their assigned patients.
          </p>
        </div>

        {doctorPatientsLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={Number(index)} className="h-10 w-full" />
            ))}
          </div>
        ) : doctorPatients.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No doctors found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="whitespace-nowrap px-5 py-3 font-medium">
                    Doctor Name
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 font-medium">
                    Specialization
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-right font-medium">
                    Total Patients
                  </th>
                </tr>
              </thead>

              <tbody>
                {doctorPatients.map((doctor) => (
                  <tr
                    key={doctor.doctorId}
                    className="border-t transition-colors hover:bg-muted/30"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium">
                      {doctor.doctorName}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {doctor.specialization}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      {doctor.totalPatients}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
