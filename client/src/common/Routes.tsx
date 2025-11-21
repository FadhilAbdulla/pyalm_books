import Purchases from "../pages/Purchases";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import { RedirectionRoutes } from "./RedirectionRoutes";
import { SalesElement } from "./data/sales.routes";
import { PurchaseElement } from "./data/purchase.routes";
import { CommonElementRoutes } from "./data/common.routes";
import { PublicRouteElement } from "./data/public.routes";

export interface RoutesElement {
  path: string;
  element: React.ReactElement;
}

export const PrivateRoutes: RoutesElement[] = [
  ...PurchaseElement,
  ...SalesElement,
  ...CommonElementRoutes,
  ...PublicRouteElement,
  {
    path: RedirectionRoutes.purchase,
    element: <Purchases />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: RedirectionRoutes.inventory,
    element: <Inventory />,
  },
];
