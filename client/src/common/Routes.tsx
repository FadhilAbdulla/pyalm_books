import Purchases from "../pages/Purchases";
import Inventory from "../pages/Inventory";
import { RedirectionRoutes } from "./RedirectionRoutes";
import { SalesElement } from "./data/sales.routes";
import { CommonElementRoutes } from "./data/common.routes";
import { PublicRouteElement } from "./data/public.routes";

export interface RoutesElement {
  path: string;
  element: React.ReactElement;
}

export const PrivateRoutes: RoutesElement[] = [
  ...SalesElement,
  ...CommonElementRoutes,
  ...PublicRouteElement,
  {
    path: RedirectionRoutes.purchase,
    element: <Purchases />,
  },
  {
    path: RedirectionRoutes.inventory,
    element: <Inventory />,
  },
];
