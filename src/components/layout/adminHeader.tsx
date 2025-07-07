"use client";
import React, { useEffect,useRef} from "react";
import Icon from "../ui/icon";
import { useSidebar } from "@/lib/sidebar";

const AdminHeader: React.FC = () => {
    const { isMobileOpen, isExpanded, toggleSidebar, toggleMobileSidebar } = useSidebar();

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 border-b">
            <div className="flex items-center justify-between grow flex-row px-6 py-4">
                <div className="flex items-center w-full gap-2">
                    <button
                        onClick={handleToggle}
                        aria-label="Toggle Sidebar"
                        className="items-center justify-center text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 flex dark:text-gray-400 h-11 w-11 border"
                    >
                        { isMobileOpen ? <Icon icon="close" /> : isExpanded ? <Icon icon="collapse_content" /> : <Icon icon="expand_content" /> }
                    </button>
                    <div>
                        <h1>LOGO</h1>
                    </div>
                </div>
                <div className={`flex items-center w-full gap-4 justify-end`}>
                    <div className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center flex">
                        c
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
