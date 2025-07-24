import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components';
import {
  MagnifyingGlassIcon,
  UserIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import React from 'react';

const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with password toggle, clearable functionality, and multiple variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    error: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const PasswordWithValue: Story = {
  args: {
    label: 'Password',
    type: 'password',
    defaultValue: 'supersecret123',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    clearable: true,
    defaultValue: 'React components',
    size: 'md',
    errorMessage: 'Yes',
    type: 'number',
  },
};

export const WithStartIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search users...',
    clearable: true,
  },
  render: args => <Input {...args} startIcon={<MagnifyingGlassIcon />} />,
};

export const WithEndIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  render: args => <Input {...args} endIcon={<UserIcon />} />,
};

export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    clearable: true,
  },
  render: args => <Input {...args} startIcon={<AtSymbolIcon />} />,
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size (default)',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    error: true,
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Username must be 3-20 characters long',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only',
    defaultValue: 'This is read-only content',
    readOnly: true,
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
    min: 0,
    max: 120,
    size: 'lg',
    helperText: 'Please enter a number between 0 and 120',
  },
};

export const PasswordClearable: Story = {
  args: {
    label: 'Password with Clear',
    type: 'password',
    placeholder: 'Enter password',
    clearable: true,
    defaultValue: 'password123',
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    interface FormData {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }

    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    };

    const watchedFields = watch();

    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">React Hook Form Demo</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            error={!!errors.firstName}
            errorMessage={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'First name must be at least 2 characters' }
            })}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            error={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Last name must be at least 2 characters' }
            })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            clearable
            startIcon={<AtSymbolIcon />}
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            clearable
            error={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Form
          </button>
        </form>

        <div className="mt-6 p-3 bg-gray-100 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Live Form Data:</h4>
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify(watchedFields, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
