import { useEffect, useRef, useCallback } from 'react';
import { Medicine } from '@/hooks/useMedicines';
import { useToast } from '@/hooks/use-toast';

export const useReminders = (medicines: Medicine[]) => {
  const { toast } = useToast();
  const permissionGranted = useRef(false);
  const checkedTimes = useRef<Set<string>>(new Set());

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      permissionGranted.current = true;
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      permissionGranted.current = permission === 'granted';
      return permissionGranted.current;
    }

    return false;
  }, []);

  const sendNotification = useCallback((medicine: Medicine, time: string) => {
    if (!permissionGranted.current) return;

    const notification = new Notification('💊 Medicine Reminder', {
      body: `Time to take ${medicine.name} (${medicine.dosage})`,
      icon: '/favicon.ico',
      tag: `${medicine.id}-${time}`,
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Also show in-app toast
    toast({
      title: '💊 Medicine Reminder',
      description: `Time to take ${medicine.name} (${medicine.dosage})`,
    });
  }, [toast]);

  const checkReminders = useCallback(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const today = now.toDateString();

    medicines.forEach(medicine => {
      if (!medicine.reminder_enabled) return;

      medicine.schedule_times.forEach(scheduleTime => {
        const reminderKey = `${medicine.id}-${scheduleTime}-${today}`;
        
        if (scheduleTime === currentTime && !checkedTimes.current.has(reminderKey)) {
          checkedTimes.current.add(reminderKey);
          sendNotification(medicine, scheduleTime);
        }
      });
    });

    // Clean up old entries (from previous days)
    const keysToRemove: string[] = [];
    checkedTimes.current.forEach(key => {
      if (!key.includes(today)) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach(key => checkedTimes.current.delete(key));
  }, [medicines, sendNotification]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    // Check immediately
    checkReminders();

    // Check every minute
    const interval = setInterval(checkReminders, 60000);
    
    return () => clearInterval(interval);
  }, [checkReminders]);

  return { requestPermission };
};
