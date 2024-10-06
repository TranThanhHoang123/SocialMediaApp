import { DefaultLayout } from "./layouts/DefaultLayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

// layout

const publicRoutes = [
  // auth
  { path: "/login", component: LoginPage },
//   { path: "/password/reset/", component: ResetPassword },
  
];

const privateRoutes = [
  {
    path: "/",
    component: HomePage,
    layout: DefaultLayout,
  },
 
];

export { publicRoutes, privateRoutes };