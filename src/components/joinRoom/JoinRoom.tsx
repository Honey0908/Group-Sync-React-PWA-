import React, { useState } from 'react';
import styles from './JoinRoom.module.css';
import api from '../../api/axios';

const JoinRoom: React.FC = () => {
  const [roomId, setRoomId] = useState('');

  // Function to join the room
  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await api.post(`/rooms/join/${roomId}`);

      console.log(response);
      setRoomId(''); // Clear the room ID field
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.joinRoomContainer}>
      <h2>Join a Room</h2>
      <form className={styles.formContainer} onSubmit={joinRoom}>
        <div className={styles.inputGroup}>
          <label>Room ID:</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID"
          />
        </div>

        <button type="submit" className={styles.joinButton}>
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;
