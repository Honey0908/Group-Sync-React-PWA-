import React from 'react';
import styles from './Room.module.css';

interface Room {
  _id: string;
  name: string;
  members: number;
}
const Room: React.FC = () => {
  return (
    <div className={styles.roomContainer}>
      <div className={styles.roomHeader}>
        <h2>Room: Group Communication</h2>
        <p>Members: 5</p>
      </div>
      <div className={styles.chatSection}>
        <div className={styles.chatBox}>
          <p>
            <strong>John:</strong> Let's have a meeting at 4 PM!
          </p>
          <p>
            <strong>Jane:</strong> Works for me!
          </p>
        </div>
        <div className={styles.messageInput}>
          <input type="text" placeholder="Enter your message..." />
          <button className={styles.sendButton}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Room;
