import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';


function HeaderHome() {
  const navigate=useNavigate();
  return (
    <Navbar style={{height:"50px",backgroundColor:"blue",paddingRight:"20px"}} >
      <Container style={{display:"flex",justifyContent:"flex-start"}}>
        <Navbar.Brand href="#home" >Tech Amigos</Navbar.Brand>
      </Container>
      <Container style={{display:"flex",justifyContent:"flex-end"}}>
      <Button variant="danger" onClick={()=>{ 
        navigate(`/signout`);
      }
      } style={{paddingRight:"10px"}}>Signout</Button>
      </Container>
    </Navbar>
  );
}

export default HeaderHome;