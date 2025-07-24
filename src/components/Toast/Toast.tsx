import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    showCloseButton?: boolean;
    onDismiss?: () => void;
    className?: string;
    id?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 5000,
    showCloseButton = true,
    onDismiss,
    className = '',
    position = 'bottom-right',
}) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration > 0 && !isExiting) {
            const timer = setTimeout(() => {
                handleDismiss();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, isExiting]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            onDismiss?.();
        }, 300);
    };

    const icons = {
        success: CheckCircleIcon,
        error: XCircleIcon,
        warning: ExclamationTriangleIcon,
        info: InformationCircleIcon,
    };

    const colors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const iconColors = {
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400',
        info: 'text-blue-400',
    };

    const positions = {
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6',
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'top-center': 'top-6 left-1/2 transform -translate-x-1/2',
        'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
    };

    const Icon = icons[type];

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ x: 300, opacity: 0, scale: 0.95 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 300, opacity: 0, scale: 0.95 }}
                    transition={{
                        type: "tween",
                        duration: 0.25,
                        ease: "linear"
                    }}
                    className={`
            toast-base
            ${colors[type]}
            ${positions[position]}
            border
            max-w-sm
            ${className}
          `.trim().replace(/\s+/g, ' ')}
                    role="alert"
                    aria-live="polite"
                >
                    <div className="flex items-start">
                        <div className={`flex-shrink-0 ${iconColors[type]}`}>
                            <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                        {showCloseButton && (
                            <div className="ml-3 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={handleDismiss}
                                    className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                                    aria-label="Close notification"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast; 