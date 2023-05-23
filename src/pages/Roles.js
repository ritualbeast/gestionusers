import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  TableRow,
  MenuItem,
  Modal,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Row, Col } from 'react-bootstrap';
import '../styles/roles.css'
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock
import CreateRole from './roles/createRole';
import Editar from './roles/editar';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'canal', label: 'Canal', alignRight: false },
  { id: 'action', label: 'Acciones' },
]

// ----------------------------------------------------------------------

export default function RolesPage() {
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);
  const [datosRole, setDatosRole] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const searchRoles = () => {
    const keyword = searchValue.toLowerCase();
  
    const filteredRoles = datosRole.filter((role) => {
      return (
        role.name.toLowerCase().includes(keyword) ||
        role.username.toLowerCase().includes(keyword) ||
        role.email.toLowerCase().includes(keyword) ||
        role.phone.toLowerCase().includes(keyword)
      );
    });
  
    return filteredRoles;
  };  
  
  const handleOpenMenu = (event, userId) => {
    setOpen(event.currentTarget);
    setSelectedUserId(userId);
  };
  
  const handleDeleteRole = () => {
    const updatedRoles = datosRole.filter((role) => role.id !== selectedUserId);
    setDatosRole(updatedRoles);
    setOpen(null);
  };  

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenEliminar = () => {
    setOpenEliminar(true);
  };

  const handleCloseEliminar = () => {
    setOpenEliminar(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await Roleservices();
    //   console.log(response.data);
    //   setDatosRole(response.data);
    // };
    // fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Role | Minimal UI </title>
      </Helmet>
      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <CreateRole />
        </Box>
      </Modal>

      <Modal
        open={openModal2}
        onClose={() => setOpenModal2(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center',
        }}
        >
        <Box sx={{width:'50%'}}>
          <Editar />
        </Box>
      </Modal>


      <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Roles de Usuario
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
            >
              Nuevo Rol
            </Button>
          </Stack>

          <Card>
              <Scrollbar>
                  <div className="inputField">
                    <span className="search-icon">
                      <SearchIcon />
                    </span>
                    <input
                      id=""
                      placeholder="Search user..."
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                    />
                  </div>

                  <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                          <UserListHead
                            headLabel={TABLE_HEAD}
                          />
                          <TableBody>
                              {datosRole.map(user => (
                                  <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell align="center">
                                      <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, user.id)}>
                                        <Iconify icon={'eva:more-vertical-fill'} />
                                      </IconButton>
                                    </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Scrollbar>
          </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => setOpenModal2(true)}> 
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenEliminar}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>

      <Modal
        open={openEliminar}
        onClose={handleCloseEliminar}
        sx={{width: '60%',height: '60%', display: 'flex',alignItems: 'center',justifyContent: 'center',margin: 'auto', marginTop: '5%',
        }}
      >
        <Box sx={{ width: '50%' }}>
        <Container>
          <Row>
            <Col>
              Desea eliminar el usuario?
            </Col>
            <Col>
              <Button className='buttondeleteuser' variant="contained" color="primary" onClick={handleDeleteRole}>
                Eliminar
              </Button>
              <Button className='buttondeleteuser' variant="contained" color="primary" onClick={handleCloseEliminar}>
                Cancelar
              </Button>
            </Col>
          </Row>  
        </Container>
        </Box>
      </Modal>
    </>
  );
}
