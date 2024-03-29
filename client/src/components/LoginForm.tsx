'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { loginUser } from '@/redux/feature/user/userSlice';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) =>
    dispatch(loginUser({ email: data.email, password: data.password }));

  useEffect(() => {
    if (user.email && !isLoading) {
      state.path
        ? navigate(state.path) // for private route
        : navigate('/');
    }
  }, [user.email, isLoading]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              autoCorrect="off"
              autoComplete="email"
              autoCapitalize="none"
              placeholder="name@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              placeholder="your password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <Button>Login with email</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}
