import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import Friends from "./pages/Friends.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

export default function App() {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <LandingPage /> : <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <HomePage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/" : "/onboarding"} />
          )}
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)
          }
        />
        <Route
          path="/history"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HistoryPage />
              </Layout>
            ) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)
          }
        />
        <Route
          path="/profile/:username"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <ProfilePage />
              </Layout>
            ) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Friends />
              </Layout>
            ) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)
          }
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? (<CallPage />) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)}
        />
        <Route
          path="/audio/call/:id"
          element={isAuthenticated && isOnboarded ? (<CallPage />) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)}
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (<Navigate to={!isAuthenticated ? "/" : "/onboarding"} />)
          } />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster reverseOrder={false} />
    </div>
  );
}
