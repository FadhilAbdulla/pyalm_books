import Banking from "@/pages/Common/Banking";
import Dashboard from "@/pages/Common/Dashboard";
import Organization from "@/pages/Common/Organization";
import UIComponents from "@/pages/Common/UIComponents";
import Reports from "@/pages/Common/Reports";
import Settings from "@/pages/Common/Settings";
import Subscription from "@/pages/Common/Subscription";

import { RoutesElement } from "../Routes";

export const CommonRoutes = {
  banking: "/banking",
  dashboard: "/dashboard",
  organization: "/organization",
  // placholder: "/placeholder",
  uiComponents: "/ui-components",
  reports: "/reports",
  settings: "/settings",
  subscription: "/subscription",
};

export const CommonElementRoutes: RoutesElement[] = [
  {
    path: CommonRoutes.banking,
    element: <Banking />,
  },
  {
    path: CommonRoutes.dashboard,
    element: <Dashboard />,
  },
  {
    path: CommonRoutes.organization,
    element: <Organization />,
  },
  {
    path: CommonRoutes.uiComponents,
    element: <UIComponents />,
  },
  {
    path: CommonRoutes.reports,
    element: <Reports />,
  },
  {
    path: CommonRoutes.settings,
    element: <Settings />,
  },

  {
    path: CommonRoutes.subscription,
    element: <Subscription />,
  },
];
