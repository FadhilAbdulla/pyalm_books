import Index from "@/pages/Public/Index";
import SignIn from "@/pages/Public/SignIn";
import SignUp from "@/pages/Public/SignUp";
import { RoutesElement } from "../Routes";

export const PublicRoutes = {
  index: "/",
  signIn: "/signin",
  signUp: "/signup",
};
export const PublicRouteElement: RoutesElement[] = [
  {
    path: PublicRoutes.index,
    element: <Index />,
  },
  {
    path: PublicRoutes.signIn,
    element: <SignIn />,
  },
  {
    path: PublicRoutes.signUp,
    element: <SignUp />,
  },
];
