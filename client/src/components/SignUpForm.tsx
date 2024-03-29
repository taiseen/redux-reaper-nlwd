'use client';

import * as React from 'react';
import { createUser } from '@/redux/feature/user/userSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/redux/hook';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { cn } from '@/lib/utils';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignUpFormInputs {
  email: string;
  password: string;
}

const SignUpForm = ({ className, ...props }: UserAuthFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit = (data: SignUpFormInputs) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };

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
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <Input
              id="password"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>

          <Button>Create Account</Button>
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
        type="button"
        variant="outline"
        className="flex items-center justify-between"
      >
        <p>Google</p>

        <FcGoogle />
      </Button>
    </div>
  );
};

export default SignUpForm;
