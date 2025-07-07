import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Icon from "../ui/icon";
import { useSidebar } from "@/lib/sidebar";
import { ThemeToggle } from "../common/themeToggle";
import { LanguageSwitcher } from "../common/languageSwitcher";
import { ADMIN_MENU_ITEMS, TAdminNavItem } from "@/config/adminRoute";

const AdminSidebar: React.FC = () => {
    const pathname = usePathname();
    const t = useTranslations("HomePage");
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
    const isActive = useCallback((path: string) => path === pathname, [pathname]);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const [openSubmenu, setOpenSubmenu] = useState<{ type: string; index: number; } | null>(null);

    useEffect(() => {
        // Check if the current path matches any submenu item
        let submenuMatched = false;
        ADMIN_MENU_ITEMS.forEach((menuObj) => {
            menuObj.navItems.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuObj.name.toLowerCase(),
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        })

        // If no submenu item matches, close the open submenu
        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, isActive]);

    useEffect(() => {
        // Set the height of the submenu items when the submenu is opened
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: string) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (navItems: TAdminNavItem[], menuType: string) => (
        <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => {
                const navPath = nav.path;
                const navName = nav.name;
                const navSubItems = nav.subItems;
                const openSubMenuIndexActive = openSubmenu?.index === index;
                const openSubMenuTypeActive = openSubmenu?.type === menuType;
                const isSubmenuActive = openSubMenuTypeActive && openSubMenuIndexActive;

                return (
                    <li key={`${menuType}-${index}`}>
                        {navSubItems ? (
                            <button
                                onClick={() => handleSubmenuToggle(index, menuType)}
                                className={`
                                    menu-item group cursor-pointer 
                                    ${!isExpanded ? "lg:justify-center" : "lg:justify-start"}
                                    ${isSubmenuActive ? "menu-item-active" : "menu-item-inactive"}`
                                }
                            >
                                <span className={`${isSubmenuActive ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                    <Icon icon={nav.icon} />
                                </span>
                                {(isExpanded || isMobileOpen) && (
                                    <span className={`menu-item-text`}>{navName}</span>
                                )}
                                {(isExpanded || isMobileOpen) && (
                                    <div className={`ml-auto transition-transform duration-200 w-5 h-5 ${isSubmenuActive ? "rotate-180 text-brand-500" : ""}`}>
                                        <Icon icon="stat_minus_1" className="w-5 h-5" />
                                    </div>
                                )}
                            </button>
                        ) : (
                            navPath && (
                                <Link href={navPath} className={`menu-item group ${isActive(navPath) ? "menu-item-active" : "menu-item-inactive"}`}>
                                    <span className={`${isActive(navPath) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                        <Icon icon={nav.icon} />
                                    </span>
                                    {(isExpanded || isMobileOpen) && (
                                        <span className={`menu-item-text`}>
                                            {nav.name}
                                        </span>
                                    )}
                                </Link>
                            )
                        )}
                        {navSubItems && (
                            <div
                                className="overflow-hidden transition-all duration-300"
                                ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                                style={{ height: isSubmenuActive ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px" }}
                            >
                                <ul className={`mt-2 space-y-1 ${isExpanded || isMobileOpen ? "ml-9" : "ml-0 text-nowrap text-xs text-center"}`}>
                                    {navSubItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                href={subItem.path}
                                                className={`menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"} ${isExpanded || isMobileOpen ? "" : "flex justify-center"}`}
                                            >
                                                {isExpanded || isMobileOpen ? subItem.name : subItem.name.substring(0, 3).toUpperCase()}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                )
            })}
        </ul>
    );

    return (
        <div>
            <aside
                className={`
                    fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 lg:translate-x-0
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                    ${(isExpanded || isMobileOpen) ? "w-[290px]" : "w-[90px]"}
                `}
            >
                <div className="mt-16 lg:mt-0 lg:hidden text-transparent">
                    offset
                </div>
                <div className={`py-6 lg:py-8 flex ${!isExpanded ? "lg:justify-center" : "justify-start"}`}>
                    <Link href="/">
                        <div className="bg-primary w-8 h-8 rounded-full text-xl font-bold text-secondary text-center">
                            L
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col grow overflow-y-auto duration-300 ease-linear no-scrollbar">
                    <nav className="mb-6">
                        <div className="flex flex-col gap-4">
                            {ADMIN_MENU_ITEMS.map((menuObj, index) => (
                                <div key={`admin-menu-${index}`}>
                                    <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded ? "lg:justify-center" : "justify-start"}`}>
                                        {isExpanded || isMobileOpen ? menuObj?.name : <Icon icon="more_horiz" />}
                                    </h2>
                                    {renderMenuItems(menuObj.navItems, menuObj?.name.toLowerCase())}
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>
                <div className="border-t border-gray-200 py-4 flex flex-col justify-center lg:justify-start">

                    <ThemeToggle />

                    <div>
                        {t("title")}
                    </div>
                    <LanguageSwitcher />
                    <Link href={"/settings"} className={`menu-item group ${isActive("/settings") ? "menu-item-active" : "menu-item-inactive"}`}>
                        <span className={`${isActive("/settings") ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                            <Icon icon="manufacturing" />
                        </span>
                        {(isExpanded || isMobileOpen) && (
                            <span className={`menu-item-text`}>
                                Settings
                            </span>
                        )}
                    </Link>


                </div>
            </aside>
            {isMobileOpen && (
                <div
                    className="fixed inset-0 w-screen h-screen top-0 left-0 z-40 bg-gray-900/50 lg:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}
        </div>
    );
};

export default AdminSidebar;
