import { setLoading, setUser } from './redux/feature/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import { useAppDispatch } from './redux/hook';
import { auth } from './lib/firebase';
import { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    // for login user data persistence...
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
};

export default App;
