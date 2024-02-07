import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';


function Header() {
  const navigate=useNavigate();
  return (
    <Navbar style={{display:"flex",justifyContent:"flex-end"}} >
      <Button variant="danger" onClick={()=>{ 
        navigate(`/signout`);
      }
      } style={{paddingRight:"10px"}}>Signout</Button>
    </Navbar>
  );
}

export default Header;