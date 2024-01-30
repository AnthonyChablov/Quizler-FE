import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNotificationStore } from '@/store/useNotificationStore';

const Notification = () => {
  const { isNotificationOpen, toggleIsNotificationOpen, notificationMode } =
    useNotificationStore();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    toggleIsNotificationOpen(false);
  };

  const getAlertSeverity = () => {
    switch (notificationMode) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'characterCount':
        return 'error';
      default:
        return 'info'; // Default to "info" if notificationMode is undefined
    }
  };

  const getMessageText = () => {
    switch (notificationMode) {
      case 'error':
        return 'An error occurred, Please Try Again !';
      case 'warning':
        return 'Warning: Something might be wrong!';
      case 'info':
        return 'Information: This is just for your knowledge.';
      case 'success':
        return 'Success: Successfully created quiz!';
      case 'characterCount':
        return 'Error: Character Count Exceeds Limit.';
      default:
        return 'Default message';
    }
  };

  return (
    <>
      <Snackbar
        open={isNotificationOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={getAlertSeverity()} // Set the severity based on notificationMode
          sx={{ width: '100%' }}
        >
          {getMessageText()} {/* Set the message based on notificationMode */}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
