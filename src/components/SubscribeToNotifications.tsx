import React, { useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const SubscribeToNotifications: React.FC = () => {
  const { user } = useAuth();
  useEffect(() => {
    const subscribeUser = async () => {
      console.log('hello');
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('has service worker');
        try {
          // Register service worker
          const serviceWorker = await navigator.serviceWorker.ready;
          const subscription =
            await serviceWorker.pushManager.getSubscription();

          if (subscription === null) {
            if (!import.meta.env.VITE_VAPID_PUB_KEY) {
              alert('No vapid key found');
              return;
            }

            // no subscription key found, create new
            const vapidPublicKey = import.meta.env.VITE_VAPID_PUB_KEY;
            const newSubscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
            });

            // Send subscription to backend
            const response = await api.post('/users/subscribe', {
              subscription: newSubscription,
            });
            if (response.status === 200) {
              displayConfirmNotification();
            }
            console.log('User is subscribed:', newSubscription);
          }
        } catch (error) {
          console.error('Failed to subscribe to push notifications', error);
        }
      }
    };
    if (user) {
      subscribeUser();
    }
  }, [user]);

  return <></>;
};

export default SubscribeToNotifications;

// function to display notification message of confirmation
export const displayConfirmNotification = async () => {
  if ('serviceWorker' in navigator) {
    const options: NotificationOptions = {
      body: 'You have successfully subscribed the notification services',
      icon: '/favicon.svg',
      dir: 'ltr',
      lang: 'en-US',
      badge: '/favicon.svg',
      tag: 'confirm-notification',
    };

    const swreg = await navigator.serviceWorker.ready;
    swreg.showNotification('Successfully subscribed', options);
  }
};
