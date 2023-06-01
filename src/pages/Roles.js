import { Helmet } from 'react-helmet-async';
import { filter, set } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  Paper,
  TableRow,
  MenuItem,
  InputLabel,
  Checkbox,
  Modal,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  Select,
  FormControl,
  TableContainer,
  TablePagination,
  Box
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import { Row, Col } from 'react-bootstrap';
import '../styles/roles.css'
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import CreateRole from './roles/createRole';
import Editar from './roles/editar';
import { ConsultarRoles } from '../services/ServicesRol';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'nemonico', label: 'Nemonico', alignLeft: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Acciones' },
]

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
    return filter(stabilizedThis.map((el) => el[0]), (_user) =>
      _user.nombres.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [datosRole, setDatosRole] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isSelectUsed, setIsSelectUsed] = useState(false);
  const isButtonDisabled = !(isSelectUsed && isToolbarUsed);
  const [datosUser, setDatosUser] = useState([]);
  const [isToolbarUsed, setIsToolbarUsed] = useState(false);
  const [filterName, setFilterName] = useState('A');
  const [valorcheck, setValorcheck] = useState([]);
  const [valorcheck2, setValorcheck2] = useState('N');

  const [checkedItems, setCheckedItems] = useState({
    nombres: '',
    correo: '',
    estado: '',
  });

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

  const filteredUsers = applySortFilter(datosUser, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
    setIsToolbarUsed(true);
    if (!event.target.value) {
      setIsToolbarUsed(false);
    }
  };

  useEffect(() => {
    // verificarLocalStorage();
    fetchData();

  }, []);
  
  // const verificarLocalStorage = () => {
  //   const isAdmin = localStorage.getItem("nombreUsuario");
  //   if (isAdmin === null) {
  //     window.location.href = "/login";
  //   }
  // }
  const fetchData = async () => {
    console.log('ok')
    try {
      // clear checkitems
      setCheckedItems({
        nombres: '',
        correo: '',
        estado: '',
      });
      setFilterName('');
      const response = await ConsultarRoles();
      console.log(response.data.listRoles)
      setDatosUser(response.data.listRoles);
    } catch (error) {
      console.error(error);
    }
  };

const handleFiltrar = async () => {
  try {
    const response = await ConsultarRoles(filterName, valorcheck2);
    if (response.success === true) {
      console.log(response);
      setDatosUser(response.data.row);
      
    } else {
      toast.error(`${response.message}`
        , {
          position: "bottom-right",
          autoClose: 2000,

        });
    }

    
  } catch (error) {
    console.error(error);
  }
};

// const handleEliminar = async () => {
//   try {
//     const response = await EliminarUsuario(idUsuario);
//     console.log(response);
//     if (response.success === true) {
//       fetchData();
//       handleCloseEliminar();
      
//     }
//     else if (response.success === false) {
//       toast.error(`${response.message}`
//         , {
//           position: "top-right",
//           autoClose: 2000,
//         });
//     }

//   } catch (error) {
//     console.error(error);
//     toast.error( `${error}` , {
//       position: "top-right",
//       autoClose: 2000,
//     });

//   }
// };

const handleRefresh = async () => {
  await fetchData();
};

const handleCheckboxChange = (event) => {
  if (event.target.checked) {
    setIsSelectUsed(true);
  }
  else {
    setIsSelectUsed(false);
  }

  const { name, checked } = event.target;
  if (checked) {
    setCheckedItems({ ...checkedItems, [name]: true });
    setValorcheck2(event.target.value);
  } else {
    const { [name]: _, ...updatedCheckedItems } = checkedItems;
    setCheckedItems(updatedCheckedItems);
  }
  const selectedValues = Object.keys(checkedItems).filter((item) => checkedItems[item]);
  setValorcheck(selectedValues);
  
  
};
  const paginatedData = datosUser.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
              <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
              
              <FormControl variant="outlined"  style={{ width: '20%' }}>
                <InputLabel id="select-label">Filtrar por</InputLabel>
                <Select
                  labelId="select-label"
                  multiple = {false}
                  value={Object.keys(checkedItems).filter((item) => checkedItems[item])}
                  onChange={handleCheckboxChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem >
                    <Checkbox checked={checkedItems.nombres} onChange={handleCheckboxChange} name="nombres" value='N' />
                    <InputLabel>Nombres</InputLabel>
                  </MenuItem>
                  <MenuItem >
                    <Checkbox checked={checkedItems.correo} onChange={handleCheckboxChange} name="correo" value='C' />
                    <InputLabel>Correo</InputLabel>
                  </MenuItem>
                  <MenuItem >
                    <Checkbox checked={checkedItems.estado} onChange={handleCheckboxChange} name="estado" value='E' />
                    <InputLabel>Estado</InputLabel>
                  </MenuItem>
                </Select>
              </FormControl>
              
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

              <Button style={{ margin : '0 0 0 1rem' }}
                variant="contained"  onClick={handleFiltrar} disabled={isButtonDisabled}>
                Filtrar
              </Button>
              <Button style={{ margin : '0 0 0 1rem' }}
                variant="contained"  onClick={fetchData}>
                Limpiar
              </Button>
              
              </div>

              <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                          <UserListHead
                            headLabel={TABLE_HEAD}
                          />
                          <TableBody>
                            {Array.isArray(paginatedData) && paginatedData.map((user, index) => (
                              <TableRow key={user.idRol}>
                                <TableCell> 
                                  {index + 1}
                                </TableCell>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>{user.descripcion}</TableCell>
                                <TableCell>{user.nemonico}</TableCell>
                                <TableCell>{user.estado}</TableCell>
                                <TableCell align="center">
                                  <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, user.idUsuario)}>
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
