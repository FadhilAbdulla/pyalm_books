import { CommonRoutes } from "./data/common.routes";
import { PublicRoutes } from "./data/public.routes";
import { SalesRoutes } from "./data/sales.routes";

export const RedirectionRoutes = {
  ...PublicRoutes,
  ...SalesRoutes,
  ...CommonRoutes,

  //purchase
  purchase: "/purchases",
  inventory: "inventory",
};
