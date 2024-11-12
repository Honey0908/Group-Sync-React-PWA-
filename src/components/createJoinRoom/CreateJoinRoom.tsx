import React from 'react';
import styles from './CreateJoinRoom.module.css';

const CreateJoinRoom: React.FC = () => {
  return (
    <div className={styles.roomSelectionContainer}>
      <h2>Create or Join a Room</h2>
      <div className={styles.roomOptions}>
        <button className={styles.roomButton}>Create Room</button>
        <button className={styles.roomButton}>Join Room</button>
      </div>
    </div>
  );
};

export default CreateJoinRoom;
