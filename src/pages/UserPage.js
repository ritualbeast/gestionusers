
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import {  useState, useEffect } from 'react';
// @mui
import {Card,Table,  Stack,  Paper, Avatar,  Button,
  Popover,  Checkbox,  TableRow,  MenuItem,
  Modal,  TableBody,  TableCell,  Container,
  Typography,  IconButton, TableContainer, TablePagination, Box, Menu
} from '@mui/material';

import { Row, Col } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import {Userservices} from '../services/Userservices';
// mock
import USERLIST from '../_mock/user';
import CreateUser from './userPages/createUser';
import ModificarUser from './userPages/ModificarUser';

// ----------------------------------------------------------------------

import '../styles/deleteuser.css';

const TABLE_HEAD = [
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'apellido', label: 'Apellido', alignRight: false },
  { id: 'correo', label: 'Correo', alignRight: false },
  { id: 'estado', label: 'Estado', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);
  const [datosUser, setDatosUser] = useState([]);
  const [datosaEliminar, setDatosaEliminar] = useState([]);

  // funcion para eliminar usuario por id
  const eliminarUsuario = async (id) => {
    const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
    window.location.reload();
  };

  // capturar un id especifico para eliminar
  const capturarId = (id) => {
    setDatosaEliminar(id);
    console.log(id);
  };
  
  
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModificar = () => {
    setOpenModificar(true);
  };

  const handleCloseModificar = () => {
    setOpenModificar(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Userservices();
      console.log(response.data);
      setDatosUser(response.data);
    };
    fetchData();
  }, []);

  


  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Usuario
          </Typography>
          
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}
          >
            Nuevo Usuario
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {Array.isArray(datosUser) && datosUser.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="center">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Sin resultados
                          </Typography>

                          <Typography variant="body2">
                            No existen resultados para  &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Intenta verificar errores tipográficos o buscar por otra palabra.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={datosUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Menu
        open={Boolean(open)}
        onClose={handleCloseMenu}
        anchorEl={open}
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
        <MenuItem onClick={handleOpenModificar}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenEliminar}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Menu>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          p: '1rem',
          bgcolor: '#f7f7f7',
          borderRadius: '4px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          
        }}>
          <IconButton onClick={handleCloseModal} style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}>
          <CloseIcon />
        </IconButton>
            <CreateUser />
        </Box>
      </Modal>

      <Modal
        open={openModificar}
        onClose={handleCloseModificar}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          p: '1rem',
          bgcolor: '#f7f7f7',
          borderRadius: '4px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
        }}>
          <IconButton onClick={handleCloseModificar} style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}>
            <CloseIcon />
          </IconButton>
          <ModificarUser />
        </Box>
      </Modal>
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
              <Button className='buttondeleteuser' variant="contained" color="primary" 
              onClick={capturarId}>
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
