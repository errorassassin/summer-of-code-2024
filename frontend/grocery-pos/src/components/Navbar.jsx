import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from '../'
import axios from 'axios'

const links = {
  'cashier': [
    { title: <><i class="bi bi-house-door-fill"></i> Home</>, path: '/cashier/' },
    { title: <><i class="bi bi-people-fill"></i> Customers</>, path: '/cashier/customers' },
  ],
  'admin': [
    { title: <><i class="bi bi-house-door-fill"></i> Home</>, path: '/admin/' },
    { title: <><i class="bi bi-people-fill"></i> Customers</>, path: '/admin/customers' },
    { title: <><i class="bi bi-bar-chart-fill"></i> Analytics</>, path: '/admin/analytics' },
  ]
};

function NavbarCustom({ role }) {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-[#FFF6E9]" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to={`/${role}/`} className='font-medium pe-2'>
          Grocery PoS - {role.charAt(0).toUpperCase() + role.slice(1)}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            {
              links[role].map((link, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={link.path}
                  className={`${location.pathname === link.path ? 'active' : ''} mx-1`}
                >
                  {link.title}
                </Nav.Link>
              ))
            }
          </Nav>
          <Nav className="d-flex">
            <Nav.Link
              as={Link}
              to={`/${role}/profile`}
              className={`${location.pathname === `/${role}/profile` ? 'active' : ''} mx-1 !flex items-center gap-[4px]`}
            >
              <i class="bi bi-person-fill"></i>
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLogout}
              className={`mx-1 !flex items-center gap-[4px]`}
            >
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="currentColor"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const handleLogout = () => {
  const toastId = toast.loading("Logging out...");
  axios.get(`/staff/logout`, {
  }).then((response) => {
    toast.success('Logged out!', { id: toastId });
  }).catch((error) => {
    if (error?.response?.data?.error?.length > 0)
      toast.error(error.response.data.error, { id: toastId })
    else
      toast.error('An error occurred', { id: toastId })
  })
}

export default NavbarCustom;
