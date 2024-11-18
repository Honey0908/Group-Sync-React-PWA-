import React, { useState } from 'react';
import styles from './JoinRoom.module.css';
import api from '../../api/axios';
import { toastNotify } from '../../utils/lib';

const JoinRoom: React.FC = () => {
  const [roomId, setRoomId] = useState('');

  // Function to join the room
  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) {
      toastNotify('error', 'Please Provide Room Id');
    }
    try {
      await api.post(`/rooms/join/${roomId}`);
      setRoomId('');
      toastNotify('success', 'Joined Room Successfully');
    } catch (error: any) {
      toastNotify(
        'error',
        error?.response?.data?.error ?? 'Failed to join Room, will sync later'
      );
      console.error(error);
    }
  };

  return (
    <div className={styles.joinRoomContainer}>
      <form className={styles.formContainer} onSubmit={joinRoom}>
        <h2>Join a Room</h2>
        <div className={styles.inputGroup}>
          <label>Room ID:</label>
          <input
            required
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
