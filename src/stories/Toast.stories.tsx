import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from '../components';

const meta = {
    title: 'Feedback/Toast',
    component: Toast,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A notification toast component with auto-dismiss, multiple types, and smooth animations. Appears at bottom-right by default.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info'],
        },
        position: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
        },
        duration: {
            control: 'number',
        },
        showCloseButton: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        message: 'Your changes have been saved successfully!',
        type: 'success',
        duration: 0,
    },
};

export const Error: Story = {
    args: {
        message: 'An error occurred while processing your request.',
        type: 'error',
        duration: 0,
    },
};

export const Warning: Story = {
    args: {
        message: 'Please review your changes before submitting.',
        type: 'warning',
        duration: 0,
    },
};

export const Info: Story = {
    args: {
        message: 'New updates are available for download.',
        type: 'info',
        duration: 0,
    },
};

export const AutoDismiss: Story = {
    args: {
        message: 'This toast will disappear in 3 seconds',
        type: 'info',
        duration: 3000,
    },
};

export const NoCloseButton: Story = {
    args: {
        message: 'This toast has no close button',
        type: 'success',
        showCloseButton: false,
        duration: 0,
    },
};

export const LongMessage: Story = {
    args: {
        message: 'This is a very long toast message that demonstrates how the component handles longer text content. It should wrap nicely and maintain good readability.',
        type: 'warning',
        duration: 0,
    },
};

export const TopLeft: Story = {
    args: {
        message: 'Toast positioned at top left',
        type: 'success',
        position: 'top-left',
        duration: 0,
    },
};

export const TopCenter: Story = {
    args: {
        message: 'Toast positioned at top center',
        type: 'info',
        position: 'top-center',
        duration: 0,
    },
};

export const BottomCenter: Story = {
    args: {
        message: 'Toast positioned at bottom center',
        type: 'warning',
        position: 'bottom-center',
        duration: 0,
    },
};

export const FastAutoDismiss: Story = {
    args: {
        message: 'Quick toast - dismisses in 1 second',
        type: 'info',
        duration: 1000,
    },
};

export const SlowAutoDismiss: Story = {
    args: {
        message: 'Slow toast - dismisses in 10 seconds',
        type: 'success',
        duration: 10000,
    },
}; 