"use client";
import { useEffect, useState } from "react";

function Sidebar() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  return (
    <aside className="w-72 bg-blue-800 text-white h-screen flex flex-col fixed right-0 top-0 z-50 shadow-lg">
      <div className="flex flex-col items-center py-8 border-b border-blue-700">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
          <span className="text-blue-800 text-2xl font-bold">س</span>
        </div>
        <span className="font-bold text-lg">تبدیل نیرو سایا</span>
        <span className="text-xs mt-1 opacity-70">
          سامانه مدیریت اطلاعات فنی
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto mt-6 px-4">
        <ul className="space-y-2 text-right">
          <li>
            <a
              href="/"
              className="w-full flex items-center px-3 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              <span>صفحه اصلی</span>
            </a>
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
      <div className="mt-auto py-6 px-4 border-t border-blue-700 text-xs text-center opacity-80">
        <div className="flex justify-center gap-3 mb-2">
          <a href="#" className="hover:text-blue-300">
            <svg width="18" height="18" fill="currentColor">
              <circle cx="9" cy="9" r="8" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-300">
            <svg width="18" height="18" fill="currentColor">
              <rect x="3" y="3" width="12" height="12" rx="3" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-300">
            <svg width="18" height="18" fill="currentColor">
              <ellipse cx="9" cy="9" rx="8" ry="5" />
            </svg>
          </a>
        </div>
        <div>
          شرکت تبدیل نیرو سایا
          <br />
          نسخه 2.2.1
        </div>
        <div className="mt-1">طراحی و توسعه تیم فناوری اطلاعات شرکت سایا</div>
      </div>
    </aside>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6 mr-72 min-h-screen">{children}</main>
    </>
  );
}
