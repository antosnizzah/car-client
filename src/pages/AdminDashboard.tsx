import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from '../components/AdminSidebar';
import Metrics from './metrics';
import { addNotification, deleteNotification, Notification } from '../action';
import { useAppDispatch, useAppSelector } from '../store/usersAPI.reducer';
import { selectNotifications } from '../selectornotifiction'; // Ensure this path is correct

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    let messages: Notification[] = [];

    if (storedMessages) {
      try {
        messages = JSON.parse(storedMessages);
        if (!Array.isArray(messages)) {
          console.error('Stored messages is not an array:', messages);
          messages = [];
        }
        messages.forEach((message) => {
          dispatch(addNotification(message));
        });
      } catch (error) {
        console.error('Error parsing messages from localStorage:', error);
      }
    }

    localStorage.removeItem('messages');
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(notifications)) {
      notifications.forEach((notification) => {
        toast(`New message from ${notification.name}: ${notification.message}`);
      });
    } else {
      console.error('Notifications is not an array:', notifications);
    }
  }, [notifications]);

  useEffect(() => {
    if (Array.isArray(notifications)) {
      localStorage.setItem('messages', JSON.stringify(notifications));
    }
  }, [notifications]);

  const handleDelete = (index: number) => {
    dispatch(deleteNotification(index));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-grow p-6 overflow-y-auto bg-gray-100 ml-64">
        <ToastContainer />
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <Metrics/>
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul>
            {Array.isArray(notifications) && notifications.map((notification, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <p><strong>Name:</strong> {notification.name}</p>
                <p><strong>Email:</strong> {notification.email}</p>
                <p><strong>Message:</strong> {notification.message}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
