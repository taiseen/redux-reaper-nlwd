import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser } from '@/redux/feature/user/userSlice';
import { Button } from '../components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import logo from '../assets/images/technet-logo.png';
import Cart from '../components/Cart';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from '../components/ui/dropdown-menu';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link to="/">
              <img className="h-8" src={logo} alt="log" />
            </Link>
          </div>

          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>

              <li>
                <Button variant="link" asChild>
                  <Link to="/products">Products</Link>
                </Button>
              </li>

              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </li>

              <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li>

              <li>
                <Cart />
              </li>

              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer">
                      Billing
                    </DropdownMenuItem>

                    {user.email ? (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>

                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Signup
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
