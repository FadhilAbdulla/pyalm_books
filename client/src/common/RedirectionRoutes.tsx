import { CommonRoutes } from "./data/common.routes";
import { PublicRoutes } from "./data/public.routes";
import { SalesRoutes } from "./data/sales.routes";
import { PurchaseRoutes } from "./data/purchase.routes";

export const RedirectionRoutes = {
  ...PublicRoutes,
  ...SalesRoutes,
  ...CommonRoutes,
  ...PurchaseRoutes,

  //purchase (kept for backward-compatibility)
  purchase: "/purchases",
  inventory: "inventory",
};
