import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenu } from '../components';
import type { MenuItem } from '../components';
import {
    HomeIcon,
    UserIcon,
    CogIcon,
    DocumentTextIcon,
    FolderIcon,
    ChartBarIcon,
    UsersIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const meta = {
    title: 'Navigation/SidebarMenu',
    component: SidebarMenu,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A sliding sidebar menu with nested navigation, accordion-style submenus, and smooth animations. Supports left/right positioning.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMenuItems: MenuItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <HomeIcon />,
        onClick: () => console.log('Dashboard clicked'),
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: <UserIcon />,
        onClick: () => console.log('Profile clicked'),
    },
    {
        id: 'documents',
        label: 'Documents',
        icon: <DocumentTextIcon />,
        children: [
            {
                id: 'recent',
                label: 'Recent Documents',
                onClick: () => console.log('Recent Documents clicked'),
            },
            {
                id: 'shared',
                label: 'Shared Documents',
                onClick: () => console.log('Shared Documents clicked'),
            },
            {
                id: 'archived',
                label: 'Archived',
                disabled: true,
            },
        ],
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: <FolderIcon />,
        children: [
            {
                id: 'active',
                label: 'Active Projects',
                children: [
                    {
                        id: 'project1',
                        label: 'React Component Library',
                        onClick: () => console.log('Project 1 clicked'),
                    },
                    {
                        id: 'project2',
                        label: 'Dashboard Redesign',
                        onClick: () => console.log('Project 2 clicked'),
                    },
                ],
            },
            {
                id: 'completed',
                label: 'Completed Projects',
                children: [
                    {
                        id: 'project3',
                        label: 'Mobile App',
                        onClick: () => console.log('Project 3 clicked'),
                    },
                ],
            },
        ],
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: <ChartBarIcon />,
        href: '/analytics',
    },
    {
        id: 'team',
        label: 'Team Management',
        icon: <UsersIcon />,
        children: [
            {
                id: 'members',
                label: 'Team Members',
                onClick: () => console.log('Team Members clicked'),
            },
            {
                id: 'permissions',
                label: 'Permissions',
                icon: <ShieldCheckIcon />,
                onClick: () => console.log('Permissions clicked'),
            },
        ],
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <CogIcon />,
        onClick: () => console.log('Settings clicked'),
    },
];

const simpleMenuItems: MenuItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: <HomeIcon />,
        onClick: () => console.log('Home clicked'),
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: <UserIcon />,
        onClick: () => console.log('Profile clicked'),
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <CogIcon />,
        onClick: () => console.log('Settings clicked'),
    },
];

export const Default: Story = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: {} as any,
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div className="h-screen relative bg-gray-50">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Default Sidebar Menu</h3>
                    <p className="text-gray-600 text-sm mb-4">Full-featured menu with nested items</p>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {isOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
                <SidebarMenu
                    items={sampleMenuItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Navigation Menu"
                />
            </div>
        );
    },
};

export const SimpleMenu: Story = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: {} as any,
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div className="h-screen relative bg-gray-50">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Simple Menu</h3>
                    <p className="text-gray-600 text-sm mb-4">Basic menu without nested items</p>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        {isOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
                <SidebarMenu
                    items={simpleMenuItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Simple Menu"
                />
            </div>
        );
    },
};

export const LeftPosition: Story = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: {} as any,
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div className="h-screen relative bg-gray-50">
                <div className="p-6 text-right">
                    <h3 className="text-lg font-semibold mb-2">Left Positioned</h3>
                    <p className="text-gray-600 text-sm mb-4">Menu slides from the left side</p>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        {isOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
                <SidebarMenu
                    items={sampleMenuItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Left Sidebar"
                    position="left"
                />
            </div>
        );
    },
};

export const CustomWidth: Story = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: {} as any,
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="h-screen relative bg-gray-50">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Custom Width</h3>
                    <p className="text-gray-600 text-sm mb-4">Narrow sidebar (w-64)</p>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        {isOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
                <SidebarMenu
                    items={simpleMenuItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Narrow Menu"
                    width="w-64"
                />
            </div>
        );
    },
};

export const NoOverlay: Story = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: {} as any,
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div className="h-screen relative bg-gray-50">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">No Overlay</h3>
                    <p className="text-gray-600 text-sm mb-4">Sidebar without backdrop overlay</p>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        {isOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
                <SidebarMenu
                    items={sampleMenuItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="No Overlay"
                    showOverlay={false}
                />
            </div>
        );
    },
}; 