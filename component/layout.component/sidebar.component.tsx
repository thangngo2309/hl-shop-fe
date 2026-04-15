/* eslint-disable react-hooks/static-components */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { menuItems } from "@/lib/menu.data";
import type { MenuItem } from "@/model/menu.model";

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeMobile = () => setMobileOpen(false);

  const renderChildren = (
    children: MenuItem[],
    parentKey: string,
    depth: number,
    isMobile: boolean
  ) => {
    return (
      <ul className="mt-1 flex flex-col gap-0.5 ">
        {children.map((child) => {
          const childKey = `${parentKey}-${child.label}`;
          const childOpen = !!openMenus[childKey];
          const hasChildren = !!child.children?.length;
          const depthPadding = depth > 0 ? `pl-${depth * 4}` : "";

          return (
            <li key={childKey} className="relative">
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all
                      ${
                        depth === 0
                          ? "font-medium text-gray-700 hover:bg-white hover:shadow-sm"
                          : "font-normal text-gray-600 hover:bg-white hover:text-gray-900"
                      }
                      ${depthPadding}`}
                    onClick={() => toggleMenu(childKey)}
                  >
                    <span>{child.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                        childOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {childOpen &&
                    renderChildren(
                      child.children ?? [],
                      childKey,
                      depth + 1,
                      isMobile
                    )}
                </>
              ) : (
                <Link
                  href={child.href || "#"}
                  className={`block rounded-lg px-3 py-2 text-sm text-gray-600 transition-all hover:bg-white hover:text-gray-900 hover:shadow-sm ${depthPadding}`}
                  onClick={isMobile ? closeMobile : undefined}
                >
                  {child.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const NavContent = ({ isMobile }: { isMobile: boolean }) => (
    <>
      <div className="flex items-center border-b border-gray-200/60 px-4">
        {isMobile && (
          <button
            type="button"
            className="ml-auto rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-0.5 px-4 py-3">
        {menuItems.map((item) => {
          const prefix = isMobile ? "mobile" : "desktop";
          const itemKey = `${prefix}-${item.label}`;
          const itemOpen = !!openMenus[itemKey];

          return (
            <li key={itemKey} className="relative">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 px-3 py-2.5 text-left text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
                    onClick={() => toggleMenu(itemKey)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        itemOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {itemOpen &&
                    renderChildren(item.children, itemKey, 0, isMobile)}
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all hover:bg-white hover:shadow-sm"
                  onClick={isMobile ? closeMobile : undefined}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <>
      {!mobileOpen && (
        <button
          type="button"
          className="fixed left-4 top-20 z-60 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg transition-colors hover:bg-indigo-700 md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      )}

      <nav
        className="hidden h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 bg-linear-to-b from-gray-50 to-gray-100 md:sticky md:top-16 md:block"
        aria-label="Desktop navigation"
      >
        <NavContent isMobile={false} />
      </nav>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-label="Close navigation"
            onClick={closeMobile}
          />

          <nav
            className="fixed inset-y-0 left-0 z-50 w-65 overflow-y-auto border-r border-gray-200 bg-linear-to-b from-gray-50 to-gray-100 shadow-xl"
            aria-label="Mobile navigation"
          >
            <NavContent isMobile={true} />
          </nav>
        </>
      )}
    </>
  );
};

export default Sidebar;