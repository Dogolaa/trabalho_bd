import { Navbar, Container, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img src="../src/assets/logo.svg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/home">Pagina Inicial</Nav.Link>
              <Nav.Link href="/vendas">Vendas</Nav.Link>

              <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                <NavDropdown.Item href="/produtos">Produtos</NavDropdown.Item>
                <NavDropdown.Item href="/servicos">Servicos</NavDropdown.Item>
                <NavDropdown.Item href="/clientes">Clientes</NavDropdown.Item>
                <NavDropdown.Item href="/atendimentos">
                  Atendimentos
                </NavDropdown.Item>
                <NavDropdown.Item href="/fornecedor">
                  Fornecedor
                </NavDropdown.Item>
                <NavDropdown.Item href="/profissional">
                  Profissional
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
