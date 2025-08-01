"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import "./NotificationSystem.css";

// Notification types
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  actions?: {
    label: string;
    action: () => void;
    variant?: "primary" | "secondary";
  }[];
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Individual notification component
const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { removeNotification } = useNotifications();
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  return (
    <div
      className={`notification-item notification-${notification.type} ${
        isVisible ? "notification-visible" : ""
      } ${isRemoving ? "notification-removing" : ""}`}
    >
      <div className="notification-content">
        <div className="notification-header">
          <div className="notification-icon">{getIcon()}</div>
          <h4 className="notification-title">{notification.title}</h4>
          <button
            className="notification-close"
            onClick={handleRemove}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
        <p className="notification-message">{notification.message}</p>
        
        {notification.actions && notification.actions.length > 0 && (
          <div className="notification-actions">
            {notification.actions.map((action, index) => (
              <button
                key={index}
                className={`notification-action-btn ${action.variant || "secondary"}`}
                onClick={() => {
                  action.action();
                  handleRemove();
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Notification container
const NotificationContainer: React.FC = () => {
  const { notifications, clearAllNotifications } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      <div className="notification-header-controls">
        {notifications.length > 1 && (
          <button
            className="clear-all-btn"
            onClick={clearAllNotifications}
          >
            Clear All ({notifications.length})
          </button>
        )}
      </div>
      <div className="notification-list">
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

// Helper functions for quick notifications
export const showSuccess = (title: string, message: string, duration?: number) => {
  // This would be used with the context
  return { type: "success" as const, title, message, duration };
};

export const showError = (title: string, message: string, duration?: number) => {
  return { type: "error" as const, title, message, duration };
};

export const showWarning = (title: string, message: string, duration?: number) => {
  return { type: "warning" as const, title, message, duration };
};

export const showInfo = (title: string, message: string, duration?: number) => {
  return { type: "info" as const, title, message, duration };
};

export default NotificationProvider;
