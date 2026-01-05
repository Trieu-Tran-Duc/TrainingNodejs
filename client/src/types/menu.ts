export const menuItems = [
   {
    title: "Scanner",
    icon: "mdi-camera",
    to: "/scanner",
    roles: ["admin", "user"],
  },
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard",
    to: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    title: "Users",
    icon: "mdi-account-group",
    to: "/admin/users",
    roles: ["admin"],
  },
  {
    title: "Profile",
    icon: "mdi-account",
    to: "/profile",
    roles: ["admin", "user"],
  },
  {
    title: "Settings",
    icon: "mdi-cog",
    to: "/settings",
    roles: ["admin"],
  },
];
