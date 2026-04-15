'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '@/lib/auth';
import { Input } from '@/component/input.component';
import { Button } from '@/component/button.component';
import { Form } from '@/component/form.component'; 
import { setAuthTokens } from '@/lib/localstorage';
import { toast } from 'react-toastify';
import { useState } from 'react';

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error] = useState<string | null>(null)

  const methods = useForm<LoginForm>(
    {
      mode: 'onTouched',
      reValidateMode: 'onChange',
      defaultValues: {
        username: '',
        password: ''
      }
    }
  );
  
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await login(data.username, data.password);
      setAuthTokens(res.access_token, res.refresh_token);
      toast.success('Đăng nhập thành công!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Đăng nhập
        </h1>

        <Form<LoginForm> onSubmit={onSubmit} methods={methods} error={error}>
          <Input
            name="username"
            label="Username"
            placeholder="Nhập username"
            rules={{
              required: 'Vui lòng nhập username',
              minLength: {
                value: 3,
                message: 'Username phải có ít nhất 3 ký tự'
              }
            }}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Nhập password"
            rules={{
              required: 'Vui lòng nhập password',
              minLength: {
                value: 6,
                message: 'Password phải có ít nhất 6 ký tự'
              }
            }}
          />

          <Button type="submit" variant="primary" >Đăng nhập </Button>
        </Form>
      </div>
    </div>
  );
}
