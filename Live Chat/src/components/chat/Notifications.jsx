import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { unReadNotificationsFunc } from "../../utils/unReadNotifications";
import moment from "moment";
const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);

  const unReadNotifications = unReadNotificationsFunc(notifications);

  const modifieedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        </svg>
        {unReadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unReadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {modifieedNotifications?.length === 0 ? (
              <span>No Notification yet .. </span>
            ) : null}
          </div>
          {modifieedNotifications &&
            modifieedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={() => {
                    markNotificationAsRead(n, userChats, user, notifications);
                    setIsOpen(false)
                  }}
                >
                  <span>{`${n.senderName} sent you a message`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
