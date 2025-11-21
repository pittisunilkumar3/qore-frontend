import React, { createContext, useContext, useState, type ReactNode } from "react";

export type NotificationType =
  | "assignment"
  | "reassignment"
  | "status_change"
  | "deadline"
  | "priority_change"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  jobId?: string;
  senderId?: string;
  senderName?: string;
  recipientId?: string;
  metadata?: Record<string, unknown>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "assignment",
    title: "New Job Assignment",
    message: 'You have been assigned to "Senior Software Engineer" job',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: "/jobs/JOB-001",
    jobId: "JOB-001",
    senderId: "user-1",
    senderName: "Sarah Chen",
  },
  {
    id: "notif-2",
    type: "status_change",
    title: "Candidate Status Update",
    message: "Alex Johnson has been moved to Interview stage",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    link: "/candidates/candidate-1",
    jobId: "JOB-001",
  },
  {
    id: "notif-3",
    type: "deadline",
    title: "Deadline Approaching",
    message: 'The "Marketing Manager" job posting closes in 2 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    link: "/jobs/JOB-002",
    jobId: "JOB-002",
  },
  {
    id: "notif-4",
    type: "priority_change",
    title: "Job Priority Changed",
    message:
      'The "Senior Recruitment Specialist" job priority has been changed to Urgent',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    read: true,
    link: "/jobs/JOB-001",
    jobId: "JOB-001",
  },
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }

  return context;
};
