import { lazy } from "react";


export const OtpForm = lazy(() => import("./components/OtpForm"));
export const LoginRegisterForm = lazy(() => import("./components/LoginRegisterForm"));
export const Searchbar = lazy(() => import("./components/searchbar"));
export const Sidebar = lazy(() => import("./components/Sidebar"));
export const Books = lazy(() => import("./components/Books"));
export const Card = lazy(() => import("./components/Card"));
export const BookDetails = lazy(() => import("./components/BookDetails"));
export const ExploreBooks = lazy(() => import("./components/exploreBooks"));

export const Content = lazy(() => import("./pages/Content"));
export const Library = lazy(() => import("./pages/Library"));
export const Category = lazy(() => import("./pages/Category"));
export const Logout = lazy(() => import("./pages/Logout"));
export const NotFound = lazy(() => import("./pages/NotFound"));
export const Settings = lazy(() => import("./pages/Settings"));
export const Support = lazy(() => import("./pages/Support"));
export const User = lazy(() => import("./pages/User"));

// import BookDetails from "./components/BookDetails";
// import Books from "./components/Books";
// import Card from "./components/Card";
// import ExploreBooks from "./components/exploreBooks";
// import LoginRegisterForm from "./components/LoginRegisterForm";
// import OtpForm from "./components/OtpForm";
// import Searchbar from "./components/searchbar";
// import Sidebar from "./components/Sidebar";
// import Category from "./pages/Category";
// import Content from "./pages/Content";
// import Library from "./pages/Library";
// import Logout from "./pages/Logout";
// import NotFound from "./pages/NotFound";
// import Settings from "./pages/Settings";
// import Support from "./pages/Support";
// import User from "./pages/User";

// export { 
//   OtpForm, 
//   LoginRegisterForm, 
//   Searchbar, 
//   Sidebar, 
//   Books, 
//   Card, 
//   Content, 
//   Library, 
//   Category, 
//   Logout, 
//   BookDetails, 
//   User,
//   ExploreBooks,
//   Settings,
//   Support,
//   NotFound
// }