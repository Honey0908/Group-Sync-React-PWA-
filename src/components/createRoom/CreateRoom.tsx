import React, { useState } from 'react';
import styles from './CreateRoom.module.css';
import { createRoom } from '../../api/roomApis';

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [maxMembers, setMaxMembers] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation (optional)
    if (!roomName || !maxMembers) {
      setError('Please provide both room name and max members.');
      return;
    }

    try {
      const response = await createRoom(roomName, maxMembers);
      console.log(response.data);
      // Reset form and handle success
      setRoomName('');
      setMaxMembers('');
      setError('');
      alert('Room created successfully');
    } catch (error) {
      console.error('Error creating room:', error);
      setError('Failed to create room');
    }
  };

  return (
    <div className={styles.createRoomContainer}>
      <h2>Create a Room</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <form className={styles.formContainer} onSubmit={handleCreateRoom}>
        <div className={styles.inputGroup}>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Max Members:</label>
          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            placeholder="Enter number of members"
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
