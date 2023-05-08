import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

const DeleteUser = () => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Aquí se puede agregar la lógica para eliminar el usuario
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Eliminar usuario</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro de que desea eliminar al usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al eliminar al usuario, se perderán todos sus datos y no se podrán recuperar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;



    