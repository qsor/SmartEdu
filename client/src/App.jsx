import { cloneElement, useState } from 'react';
import { ButtonPrimary, InputText } from './components/Components';

const initialForm = {
  email: '',
  password: '',
};

function LoginInput({ id, type = 'text', placeholder, value, error, onChange }) {
  const baseInput = InputText({ placeholder });

  return cloneElement(baseInput, {
    id,
    name: id,
    type,
    value,
    onChange,
    'aria-invalid': error ? 'true' : 'false',
    className: [
      baseInput.props.className,
      'h-9 w-full text-xs text-gray-900 transition-colors',
      'border-gray-300 placeholder:text-gray-300',
      'focus:outline-2 focus:outline-offset-0',
      error ? 'border-red-400 focus:outline-red-400' : 'focus:outline-orange-400',
    ].join(' '),
  });
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const changeField = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nextErrors.email = 'Введите email';
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = 'Введите корректный email';
    }

    if (!form.password) {
      nextErrors.password = 'Введите пароль';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Минимум 6 символов';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    console.log('Форма входа прошла валидацию', form);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-5 py-8">
      <section className="w-full max-w-[302px] rounded-lg bg-white px-9 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
        <h1 className="mb-5 text-[28px] font-bold leading-none text-gray-900">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-950" htmlFor="email">
              Email
            </label>
            <LoginInput
              id="email"
              type="email"
              placeholder="username@gmail.com"
              value={form.email}
              error={errors.email}
              onChange={changeField}
            />
            {errors.email && (
              <span className="text-xs font-medium text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-950" htmlFor="password">
              Password
            </label>
            <LoginInput
              id="password"
              type="password"
              placeholder="Password"
              value={form.password}
              error={errors.password}
              onChange={changeField}
            />
            {errors.password && (
              <span className="text-xs font-medium text-red-500">{errors.password}</span>
            )}
          </div>

          <button
            className="w-fit text-xs font-medium text-orange-500 transition-colors hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="button"
          >
            Забыли пароль?  
          </button>

          <div className="mt-1 [&_button]:h-9 [&_button]:w-full [&_button]:rounded-sm [&_button]:border-orange-500 [&_button]:bg-orange-500 [&_button]:p-0 [&_button]:text-sm [&_button]:font-medium [&_button]:hover:bg-orange-600">
            <ButtonPrimary title="Войти" />
          </div>
        </form>

        <p className="mt-5 text-xs font-medium text-gray-500">
          Нет аккаунта?{' '}
          <button
            className="text-orange-500 transition-colors hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="button"
          >
            Зарегистрироваться
          </button>
        </p>
      </section>
    </main>
  );
}
