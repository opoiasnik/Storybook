import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    children?: MenuItem[];
    disabled?: boolean;
    href?: string;
}

export interface SidebarMenuProps {
    items: MenuItem[];
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
    width?: string;
    showOverlay?: boolean;
    position?: 'left' | 'right';
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
    items,
    isOpen,
    onClose,
    title = 'Menu',
    className = '',
    width = 'w-80',
    showOverlay = true,
    position = 'right',
}) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
        if (item.disabled) {
            e.preventDefault();
            return;
        }

        if (item.children && item.children.length > 0) {
            e.preventDefault();
            toggleExpanded(item.id);
        } else {
            item.onClick?.();
            if (!item.href) {
                onClose();
            }
        }
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.has(item.id);
        const paddingLeft = `${(level * 16) + 16}px`;

        const menuItemContent = (
            <div
                className={`
          flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${level > 0 ? 'border-l-2 border-gray-200 ml-4' : ''}
        `.trim().replace(/\s+/g, ' ')}
                style={{ paddingLeft }}
                onClick={(e) => handleItemClick(item, e)}
            >
                <div className="flex items-center">
                    {item.icon && (
                        <div className="w-5 h-5 mr-3 flex-shrink-0">
                            {item.icon}
                        </div>
                    )}
                    <span className="font-medium">{item.label}</span>
                </div>
                {hasChildren && (
                    <div className="ml-2">
                        {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                        )}
                    </div>
                )}
            </div>
        );

        return (
            <div key={item.id}>
                {item.href && !item.disabled ? (
                    <a href={item.href} className="block">
                        {menuItemContent}
                    </a>
                ) : (
                    menuItemContent
                )}

                {hasChildren && isExpanded && (
                    <div className="overflow-hidden transition-all duration-200">
                        {item.children!.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const slideDirection = position === 'right' ? 'translate-x-full' : '-translate-x-full';
    const positionClasses = position === 'right' ? 'right-0' : 'left-0';
    const animationClass = isOpen
        ? (position === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left')
        : (position === 'right' ? 'animate-slide-out-right' : 'animate-slide-out-left');

    return (
        <>
            {/* Overlay */}
            {showOverlay && isOpen && (
                <div
                    className={`sidebar-overlay ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Panel */}
            <div
                className={`
          sidebar-panel
          ${width}
          ${positionClasses}
          ${isOpen ? 'translate-x-0' : slideDirection}
          ${animationClass}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sidebar-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <h2 id="sidebar-title" className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                        aria-label="Close sidebar"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu Content */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <nav className="py-2">
                        {items.map(item => renderMenuItem(item))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu; 