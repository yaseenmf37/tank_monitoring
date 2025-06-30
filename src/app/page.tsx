"use client";
import { useState, useEffect } from "react";
import ClientLayout from "./ClientLayout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { TooltipItem } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialTanks = [
  { id: 1, name: "مخزن ۱", capacity: 1170, fill: 800 },
  { id: 2, name: "مخزن ۲", capacity: 603, fill: 450 },
  { id: 3, name: "مخزن ۳", capacity: 384, fill: 200 },
  { id: 4, name: "مخزن ۴", capacity: 339, fill: 0 },
];

function LoadingTank() {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-md h-screen w-screen`}
    >
      <div className="flex flex-col items-center">
        <svg width="120" height="180" viewBox="0 0 120 180">
          <rect
            x="20"
            y="20"
            width="80"
            height="140"
            rx="40"
            fill="#e0e7ef"
            stroke="#2563eb"
            strokeWidth="4"
          />
          <rect x="20" y="40" width="80" height="120" rx="40" fill="#2563eb">
            <animate
              attributeName="y"
              values="160;40;160"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              values="0;120;0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        <div className="mt-6 text-blue-800 font-bold text-lg animate-pulse">
          در حال ورود...
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialAuthCheck, setInitialAuthCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tanks, setTanks] = useState(initialTanks);
  const [newTank, setNewTank] = useState({ name: "", capacity: "", fill: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [editTank, setEditTank] = useState({
    name: "",
    capacity: "",
    fill: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  type Tank = { id: number; name: string; capacity: number; fill: number };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
    setInitialAuthCheck(true);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "admin132") {
      setIsLoginLoading(true);
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoginLoading(false);
      }, 1500);
      setError("");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const maxFill = Math.max(...tanks.map((t) => t.fill), 0);
  const yStep = Math.pow(10, Math.floor(Math.log10(maxFill || 1)));
  const yMax = Math.ceil((maxFill || 1) / yStep) * yStep;

  const handleAddTank = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    if (!newTank.name || !newTank.capacity) return;
    const capacity = Number(newTank.capacity);
    const fill = Number(newTank.fill) || 0;
    if (capacity <= 0) {
      setFormError("ظرفیت مخزن باید بیشتر از صفر باشد.");
      return;
    }
    if (fill > capacity) {
      setFormError("مقدار فعلی نمی‌تواند بیشتر از ظرفیت باشد.");
      return;
    }
    setTanks([
      ...tanks,
      { id: Date.now(), name: newTank.name, capacity, fill },
    ]);
    setNewTank({ name: "", capacity: "", fill: "" });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setTanks(tanks.filter((t) => t.id !== id));
  };

  const handleEdit = (tank: Tank) => {
    setEditId(tank.id);
    setEditTank({
      name: tank.name,
      capacity: tank.capacity + "",
      fill: tank.fill + "",
    });
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    const capacity = Number(editTank.capacity);
    const fill = Number(editTank.fill) || 0;
    if (capacity <= 0) {
      setFormError("ظرفیت مخزن باید بیشتر از صفر باشد.");
      return;
    }
    if (fill > capacity) {
      setFormError("مقدار فعلی نمی‌تواند بیشتر از ظرفیت باشد.");
      return;
    }
    setTanks(
      tanks.map((t) =>
        t.id === editId ? { ...t, name: editTank.name, capacity, fill } : t
      )
    );
    setEditId(null);
    setEditTank({ name: "", capacity: "", fill: "" });
  };

  const chartData = {
    labels: tanks.map((t) => t.name),
    datasets: [
      {
        label: "مقدار فعلی",
        data: tanks.map((t) => t.fill),
        backgroundColor: ["#6366f1", "#10b981", "#a78bfa", "#6b7280"],
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "نمودار وضعیت مخازن",
        color: "#1e293b",
        font: { size: 18, family: "inherit" },
        padding: { top: 10, bottom: 30 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) =>
            `${ctx.dataset.label}: ${ctx.parsed.y} لیتر`,
        },
        bodyFont: { family: "inherit" },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#334155",
          font: { size: 13, family: "inherit" },
          maxRotation: 40,
          minRotation: 40,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb", drawBorder: false },
        ticks: {
          color: "#64748b",
          font: { size: 12, family: "inherit" },
          stepSize: yStep,
        },
        max: yMax,
      },
    },
    layout: { padding: 0 },
    animation: { duration: 800, easing: "easeOutQuart" as const },
    maintainAspectRatio: false,
  };

  if (!initialAuthCheck || isLoginLoading) {
    return <LoadingTank />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            ورود به سامانه
          </h2>
          <div className="mb-4">
            <label className="block mb-1 text-right">نام کاربری</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-right">رمز عبور</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ورود
          </button>
        </form>
      </div>
    );
  }

  return (
    <ClientLayout onLogout={handleLogout}>
      <div className="w-full space-y-12 p-4 max-md:p-4">
        <div className="md:flex items-center justify-between mb-8">
          <div className="flex-1 max-md:flex max-md:flex-col max-md:items-end">
            <h1 className="text-2xl font-bold text-gray-800">وضعیت مخازن</h1>
            <p className="text-sm text-gray-500 mt-1">آخرین بروزرسانی: امروز</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition hidden md:flex items-center gap-2"
          >
            <span>خروج</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="w-10 h-10 md:hidden"></div>
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition font-bold"
          >
            افزودن مخزن جدید
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tanks.map((tank) => (
            <div
              key={tank.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
            >
              <div className="w-full flex justify-between mb-2">
                <span className="font-bold text-blue-700">{tank.name}</span>
                <span className="text-xs text-gray-400">
                  ظرفیت: {tank.capacity} لیتر
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded mb-2 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${(tank.fill / tank.capacity) * 100}%` }}
                ></div>
              </div>
              <div className="w-full flex justify-between text-xs">
                <span>مقدار فعلی: {tank.fill} لیتر</span>
                <span>{Math.round((tank.fill / tank.capacity) * 100)}%</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(tank)}
                  className="text-xs bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(tank.id)}
                  className="text-xs bg-red-400 px-2 py-1 rounded hover:bg-red-500 text-white"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <form onSubmit={handleAddTank} className="space-y-4">
                <h2 className="font-bold text-lg mb-2">افزودن مخزن جدید</h2>
                <input
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="نام مخزن"
                  value={newTank.name}
                  onChange={(e) =>
                    setNewTank({ ...newTank, name: e.target.value })
                  }
                />
                <input
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="ظرفیت (لیتر)"
                  type="number"
                  value={newTank.capacity}
                  onChange={(e) =>
                    setNewTank({ ...newTank, capacity: e.target.value })
                  }
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="مقدار فعلی (لیتر)"
                  type="number"
                  value={newTank.fill}
                  onChange={(e) =>
                    setNewTank({ ...newTank, fill: e.target.value })
                  }
                />
                {formError && (
                  <div className="text-red-600 text-sm text-right">
                    {formError}
                  </div>
                )}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    افزودن
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {editId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                onClick={() => setEditId(null)}
                className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <h2 className="font-bold text-lg mb-2">ویرایش مخزن</h2>
                <input
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="نام مخزن"
                  value={editTank.name}
                  onChange={(e) =>
                    setEditTank({ ...editTank, name: e.target.value })
                  }
                />
                <input
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="ظرفیت (لیتر)"
                  type="number"
                  value={editTank.capacity}
                  onChange={(e) =>
                    setEditTank({ ...editTank, capacity: e.target.value })
                  }
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="مقدار فعلی (لیتر)"
                  type="number"
                  value={editTank.fill}
                  onChange={(e) =>
                    setEditTank({ ...editTank, fill: e.target.value })
                  }
                />
                {formError && (
                  <div className="text-red-600 text-sm text-right">
                    {formError}
                  </div>
                )}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    ثبت
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="bg-white rounded-lg shadow p-6 mt-24 mb-16">
          <div className="w-full" style={{ minHeight: 340, height: 340 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
