import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { PrivateRoute } from "../components/PrivateRoute";
import { lazy } from "react";

const Characters = lazy(() => import('../pages/Characters'));
const HeroInfo = lazy(() => import('../pages/HeroInfo'));
const Locations = lazy(() => import('../pages/Locations'));
const LocationInfo = lazy(() => import('../pages/LocationInfo'));
const Episodes = lazy(() => import('../pages/Episodes'));
const EpisodeInfo = lazy(() => import('../pages/EpisodeInfo'));
const Login = lazy(() => import('../pages/Login'));
const Main = lazy(() => import('../pages/Main'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const Layout = lazy(() => import('../layouts/Layout'));


export function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route
            path="/character"
            element={
              <PrivateRoute>
                <Characters />
              </PrivateRoute>
            }
          />
          <Route
            path="/character/:id"
            element={
              <PrivateRoute>
                <HeroInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/location"
            element={
              <PrivateRoute>
                <Locations />
              </PrivateRoute>
            }
          />
          <Route
            path="/location/:id"
            element={
              <PrivateRoute>
                <LocationInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/episode"
            element={
              <PrivateRoute>
                <Episodes />
              </PrivateRoute>
            }
          />
          <Route
            path="/episode/:id"
            element={
              <PrivateRoute>
                <EpisodeInfo />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
