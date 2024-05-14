import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegistrationForm from "./components/Forms/UserRegistrationForm/UserRegistrationForm";
import NotFound from "./pages/404/404";
import LoginForm from "./components/Forms/LoginForm/LoginForm";
import PostsList from "./features/posts/PostsList/PostsList";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/HomeLayout/Layout";
import DashboardLayout from "./components/Layout/DashboardLayout/DashboardLayout";
import DashWelcome from "./components/DashWelcome/DashWelcome";
import Home from "./components/Home/Home";
import UsersList from "./features/users/UsersList/UsersList";
import NewPostForm from "./components/Forms/NewPostForm/NewPostForm";
import EditPostForm from "./components/Forms/EditPostForm/EditPostForm";
import EditUserForm from "./components/Forms/EditUserForm/EditUserForm";
import AdminLayout from "./components/Layout/AdminLayout/AdminLayout";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProtectedLayout from "./components/Layout/ProtectedLayout/ProtectedLayout";
import StayLogin from "./components/Layout/StayLogin/StayLogin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
          <Route element={<StayLogin />}>
            <Route element={<ProtectedLayout />}>
              <Route path="dash" element={<DashboardLayout />}>
                <Route index element={<DashWelcome />} />
                <Route path="posts">
                  <Route index element={<PostsList />} />
                  <Route path="new" element={<NewPostForm />} />
                  <Route path=":id" element={<EditPostForm />} />
                </Route>
                <Route path="authors" element={<AdminLayout />}>
                  <Route index element={<UsersList />} />
                  <Route path="new" element={<UserRegistrationForm />} />
                  <Route path=":id" element={<EditUserForm />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
