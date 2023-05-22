import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { LoginToken } from '../../../services/Userservices';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await LoginToken(usuario, contrasenia);
      
      if (response.success === true) {
        navigate('/user', { replace: true });
      } else {
        console.log(response.message);
      }

      
    } catch (error) {
      console.error(error);
    }
  };


  const handleClick = () => {
    // Aquí puedes realizar alguna acción adicional antes de enviar el formulario, si es necesario
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="usuario"
          placeholder='Usuario'
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />

        <TextField
          name="contrasenia"
          placeholder='Contraseña'
          type={showPassword ? 'text' : 'password'}
          value={contrasenia}
          onChange={(event) => setContrasenia(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Ingresar
      </LoadingButton>
      
    </form>
  );
}
