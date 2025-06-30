"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";

function Sidebar({
  isOpen,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  return (
    <aside
      className={`w-72 bg-blue-800 text-white h-screen flex flex-col fixed right-0 top-0 z-50 shadow-2xl transition-all duration-300 ease-in-out
        md:translate-x-0 md:opacity-100 md:scale-100
        ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }`}
    >
      <div className="flex items-center justify-between py-6 px-4 border-b border-blue-700">
        <div className="flex flex-col items-center flex-grow">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
            <span className="text-blue-800 text-2xl font-bold">س</span>
          </div>
          <span className="font-bold text-lg">تبدیل نیرو سایا</span>
          <span className="text-xs mt-1 opacity-70">
            سامانه مدیریت اطلاعات فنی
          </span>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-white absolute top-6 left-4"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto mt-6 px-4">
        <ul className="space-y-2 text-right">
          <li>
            <Link
              href="/"
              className="w-full flex items-center px-3 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => toggleMenu("tanks")}
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              <span className="font-semibold">مدیریت مخازن</span>
              <span
                className="transition-transform"
                style={{
                  transform: openMenus["tanks"]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </button>
            {openMenus["tanks"] && (
              <ul className="pr-6 space-y-1 text-sm mt-1">
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    لیست مخازن
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    افزودن مخزن
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu("mavad")}
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              <span>موارد</span>
              <span
                className="transition-transform"
                style={{
                  transform: openMenus["mavad"]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </button>
            {openMenus["mavad"] && (
              <ul className="pr-6 space-y-1 text-sm mt-1">
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    زیرمورد ۱
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    زیرمورد ۲
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu("voroodkhorooj")}
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              <span>ورود و خروج</span>
              <span
                className="transition-transform"
                style={{
                  transform: openMenus["voroodkhorooj"]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </button>
            {openMenus["voroodkhorooj"] && (
              <ul className="pr-6 space-y-1 text-sm mt-1">
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    زیرورود ۱
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    زیرورود ۲
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu("events")}
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              <span className="font-semibold">رویداد و وقایع</span>
              <span
                className="transition-transform"
                style={{
                  transform: openMenus["events"]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </button>
            {openMenus["events"] && (
              <ul className="pr-6 space-y-1 text-sm mt-1">
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    لیست رویدادها
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu("places")}
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              <span className="font-semibold">محل و موقعیت</span>
              <span
                className="transition-transform"
                style={{
                  transform: openMenus["places"]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </button>
            {openMenus["places"] && (
              <ul className="pr-6 space-y-1 text-sm mt-1">
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    لیست محل‌ها
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu("users")}
              className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              <span className="font-semibold">مدیریت کاربران</span>
              <span
                className="transition-transform"
                style={{
                  transform: openMenus["users"]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </button>
            {openMenus["users"] && (
              <ul className="pr-6 space-y-1 text-sm mt-1">
                <li>
                  <a href="#" className="block py-1 hover:underline">
                    لیست کاربران
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-red-600 transition font-semibold md:hidden"
        >
          <span>خروج از حساب</span>
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
      </div>
      <div className="py-4 px-4 border-t border-blue-700 text-xs text-center opacity-80">
        <div>
          شرکت تبدیل نیرو سایا
          <br />
          نسخه 2.2.1
        </div>
      </div>
    </aside>
  );
}

export default function ClientLayout({
  children,
  onLogout,
}: {
  children: ReactNode;
  onLogout: () => void;
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 md:flex overflow-x-hidden">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        onLogout={onLogout}
      />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      <div className="flex-1 md:mr-72">
        <header className="absolute top-4 right-4 z-10 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 bg-blue-800 text-white rounded-md shadow-lg"
            aria-label="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <main className="flex-1 min-h-screen flex">{children}</main>
      </div>
    </div>
  );
}
