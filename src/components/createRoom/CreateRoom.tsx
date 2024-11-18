import React, { useState } from 'react';
import styles from './CreateRoom.module.css';
import { createRoom } from '../../api/roomApis';
import { toastNotify } from '../../utils/lib';

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [maxMembers, setMaxMembers] = useState<number | ''>('');

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!roomName || !maxMembers) {
      toastNotify('error', 'Please provide both room name and max members.');
      return;
    }

    try {
      await createRoom(roomName, maxMembers);
      setRoomName('');
      setMaxMembers('');
      toastNotify('success', 'Room created successfully');
    } catch (error: any) {
      console.error('Error creating room:', error);
      toastNotify(
        'error',
        error?.respose?.data?.error ?? 'Failed to create Room, will sync later'
      );
    }
  };

  return (
    <div className={styles.createRoomContainer}>
      <form className={styles.formContainer} onSubmit={handleCreateRoom}>
        <h2>Create a Room</h2>
        <div className={styles.inputGroup}>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Max Members:</label>
          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            placeholder="Enter number of members"
            required
          />
        </div>

        <button type="submit" className={styles.createButton}>
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
