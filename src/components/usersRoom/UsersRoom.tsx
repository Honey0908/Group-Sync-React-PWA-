import React, { useEffect, useState } from 'react';
import styles from './UserRoom.module.css';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

interface Room {
  _id: string;
  name: string;
  members: { username: string }[];
}

const UserRooms: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        const response = await api.get('/rooms/user/' + user?._id);
        setRooms(response?.data);
      } catch (error) {
        console.error('Error fetching user rooms:', error);
      }
    };

    fetchUserRooms();
  }, [user]);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleSendNotification = async () => {
    if (!selectedRoom || !notificationMessage.trim()) return;

    try {
      const payload = {
        title: `Notification for ${selectedRoom.name}`,
        message: notificationMessage,
      };

      await api.post(`/rooms/send-notification/${selectedRoom._id}`, payload);

      alert(`Notification sent to members of ${selectedRoom.name}`);
      setNotificationMessage('');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  return (
    <div className={styles.userRoomsContainer}>
      <h2>Your Rooms</h2>

      {/* List of rooms - displayed side by side */}
      <ul className={styles.roomList}>
        {rooms?.length > 0 ? (
          rooms.map((room) => (
            <li key={room._id} className={styles.roomItem}>
              <div>
                <strong>Room Name: {room.name}</strong>
                <span>
                  Members: {room.members?.map((m) => m.username).join(', ')}
                </span>
                <span className={styles.roomIdInfo}>
                  Room ID: {room._id} (Share this ID to let others join)
                </span>
              </div>
              <button
                className={styles.enterButton}
                onClick={() => handleRoomSelect(room)}
              >
                Share Notification
              </button>
            </li>
          ))
        ) : (
          <li>No rooms available.</li>
        )}
      </ul>

      {/* Notification form */}
      {selectedRoom && (
        <div className={styles.notificationForm}>
          <h3>Send Notification to {selectedRoom.name}</h3>
          <textarea
            className={styles.notificationInput}
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            placeholder="Enter your notification message"
          />
          <button
            className={styles.sendButton}
            onClick={handleSendNotification}
          >
            Send Notification
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRooms;
