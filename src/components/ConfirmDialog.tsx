import { Dialog, DialogActions, DialogContent, Snackbar } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  text: string;
  content: string;
}

export default function ConfirmDialog({ text, content }: Props) {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    setOpenSnackbar(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <button type='button' onClick={handleConfirm} autoFocus>
            예
          </button>
          <button type='button' onClick={handleClose}>
            아니오
          </button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={`${text}되었습니다.`}
      />
    </div>
  );
}
