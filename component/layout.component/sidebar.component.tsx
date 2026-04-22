"use client";

import React, { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { menuItems } from "@/constants/menu.data";
import type { MenuItem } from "@/model/menu.model";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

const SidebarContent_: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  
  // FIX: Nếu không có searchName param, set thành null (không phải "")
  const currentSearchName = searchParams.has("searchName") 
    ? searchParams.get("searchName") 
    : null;
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");
  const currentOrderBy = searchParams.get("orderBy") || "ASC";

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    return menuItems.reduce((acc, item) => {
      acc[item.label] = true;
      return acc;
    }, {} as Record<string, boolean>);
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isItemActive = (item: MenuItem) => {
    const hasSearchFilter = item.searchName !== undefined;
    const hasOrderByFilter = item.orderBy !== undefined;
    const hasPriceFilter =
      Object.prototype.hasOwnProperty.call(item, "minPrice") ||
      Object.prototype.hasOwnProperty.call(item, "maxPrice");

    if (!hasSearchFilter && !hasPriceFilter && !hasOrderByFilter) {
      return false;
    }

    const expectedMin = item.minPrice !== undefined ? String(item.minPrice) : null;
    const expectedMax = item.maxPrice !== undefined ? String(item.maxPrice) : null;

    // FIX: Handle searchName với null/""
    const matchesSearch = hasSearchFilter
      ? item.searchName === (currentSearchName ?? "")
      : true;

    const matchesOrderBy = hasOrderByFilter
      ? item.orderBy === currentOrderBy
      : true;

    const matchesPrice = hasPriceFilter
      ? currentMinPrice === expectedMin && currentMaxPrice === expectedMax
      : true;

    return matchesSearch && matchesPrice && matchesOrderBy;
  };

  const getItemHref = (item: MenuItem) => {
    const params = new URLSearchParams(searchParams.toString());
    const hasPriceFilter =
      Object.prototype.hasOwnProperty.call(item, "minPrice") ||
      Object.prototype.hasOwnProperty.call(item, "maxPrice");

    if (item.searchName !== undefined) {
      if (item.searchName) {
        params.set("searchName", item.searchName);
      } else {
        params.delete("searchName");
      }
    }

    if (hasPriceFilter) {
      params.delete("minPrice");
      params.delete("maxPrice");

      if (item.minPrice !== undefined && item.minPrice !== null) {
        params.set("minPrice", String(item.minPrice));
      }

      if (item.maxPrice !== undefined && item.maxPrice !== null) {
        params.set("maxPrice", String(item.maxPrice));
      }
    }

    if (item.orderBy !== undefined) {
      if (item.orderBy === "DESC") {
        params.set("orderBy", item.orderBy);
      } else {
        params.delete("orderBy");
      }
    }

    params.set("page", "1");
    return `/product?${params.toString()}`;
  };

  const handleItemClick = (item: MenuItem) => {
    const href = getItemHref(item);
    router.push(href);
    setOpenMobile(false);
  };

  const renderChildren = (children: MenuItem[], parentKey: string) => {
    return (
      <SidebarMenuSub>
        {children.map((child) => {
          const childKey = `${parentKey}-${child.label}`;
          const childOpen = !!openMenus[childKey];
          const hasChildren = !!child.children?.length;
          const isActive = isItemActive(child);

          if (hasChildren) {
            return (
              <SidebarMenuSubItem key={childKey}>
                <Collapsible open={childOpen} onOpenChange={() => toggleMenu(childKey)}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between">
                      <span>{child.label}</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          childOpen ? "rotate-90" : ""
                        }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {renderChildren(child.children ?? [], childKey)}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuSubItem>
            );
          }

          return (
            <SidebarMenuSubItem key={childKey}>
              <SidebarMenuButton 
                isActive={isActive}
                onClick={() => handleItemClick(child)}
                className="cursor-pointer"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                    isActive
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Check className="h-3 w-3" />
                </span>
                <span>{child.label}</span>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          );
        })}
      </SidebarMenuSub>
    );
  };

  return (
    <SidebarContent className="bg-linear-to-b from-gray-50 to-gray-100">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const itemKey = item.label;
              const itemOpen = !!openMenus[itemKey];
              const isActive = isItemActive(item);

              if (item.children?.length) {
                return (
                  <SidebarMenuItem key={itemKey}>
                    <Collapsible
                      open={itemOpen}
                      onOpenChange={() => toggleMenu(itemKey)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="justify-between font-medium">
                          <span>{item.label}</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              itemOpen ? "rotate-90" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {renderChildren(item.children, itemKey)}
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={itemKey}>
                  <SidebarMenuButton 
                    isActive={isActive}
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer"
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                        isActive
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

const Sidebar: React.FC = () => {
  return (
    <>
      <UISidebar variant="sidebar" collapsible="offcanvas">
        <SidebarContent_/>
      </UISidebar>
    </>
  );
};

export default Sidebar;