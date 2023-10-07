import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

// Higher Order Component...
const PrivateRoute = ({ children }: TProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation(); // user click on that private route path name...

  if (isLoading) {
    return <p>🟢🟢🟢 Loading... 🟢🟢🟢 </p>;
  }

  if (!user.email && !isLoading) {
    // if user is not logIn or user click logOut... 
    // then redirect or send the user at Login page...
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
