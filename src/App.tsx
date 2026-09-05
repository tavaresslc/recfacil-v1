import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Route>,
  ),
  {
    basename: "/recfacil-prototipo",
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
