# Group Sync

This project is a React-based application for creating and managing rooms. User can send web push notifications to room's members. It includes offline support using **IndexedDB** and **Background Sync** to store and sync data when the user is offline.

## Features

- **Create Rooms**: Users can create rooms with a room name.
- **Send Notifications**: Send notifications to all members of a selected room.
- **Offline Support**: If the user is offline, room data is stored in **IndexedDB** and synced to the server when the user comes online again using **Background Sync**.
- **Service Workers**: Service workers handle background sync and offline caching.

## Tech Stack

- **React**
- **IndexedDB** for offline storage
- **Service Worker** and **Background Sync API** for syncing data
- **Axios** for API calls

## Setup

### 1. Install Dependencies
Clone the repository and run:

```bash
npm install
```

```bash
npm run dev
```