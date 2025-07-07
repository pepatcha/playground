export type TAdminNavItem = {
    name: string;
    icon: string;
    path?: string;
    subItems?: { name: string; path: string; }[];
};

type TAdminMenuItem = {
	name: string;
	navItems: TAdminNavItem[];
};

export const ADMIN_MENU_ITEMS: TAdminMenuItem[] = [
	{
		name: "MENU",
		navItems: [
			{ icon: "home", name: "Dashboard", path: "/dashboard" },
			{ icon: "home", name: "Calendar", path: "/calendar" },
			{ icon: "home", name: "User Profile", path: "/profile" },
			{ icon: "home", name: "Forms", subItems: [{ name: "Form Elements", path: "/form-elements" }] },
			{ icon: "home", name: "Tables", subItems: [{ name: "Basic Tables", path: "/basic-tables" }] },
			{ icon: "home", name: "Pages", subItems: [{ name: "Blank Page", path: "/blank" }, { name: "404 Error", path: "/error-404" }] },
		],
	},
	{
		name: "OTHERS",
		navItems: [
			{ icon: "home", name: "Charts", subItems: [{ name: "Line Chart ", path: "/line-chart" }, { name: "Bar Chart", path: "/bar-chart" }] },
			{ icon: "home", name: "UI Elements", subItems: [{ name: "Alerts", path: "/alerts" }, { name: "Avatar", path: "/avatars" }, { name: "Badge", path: "/badge" }, { name: "Buttons", path: "/buttons" }, { name: "Images", path: "/images" }, { name: "Videos", path: "/videos" }] },
			{ icon: "home", name: "Authentication", subItems: [{ name: "Sign In", path: "/signin" }, { name: "Sign Up", path: "/signup" }] },
		],
	}
];
