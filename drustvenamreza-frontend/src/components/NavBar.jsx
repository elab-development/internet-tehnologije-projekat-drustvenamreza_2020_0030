import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { IoPersonCircleOutline } from "react-icons/io5";
import { CgFeed } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import '../CSS/NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar({ loggedInUser, handleLogout, pretrazi }) {

    const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

    return (
      <div>
        <nav className="nav">
          <div className="nav__title">
            <h1>Be Social</h1>
          </div>
          <ul className="nav__list">
            {loggedInUser ? (
              <>
                <li className="nav__item">
                  {loggedInUser}{' '}
                  <button className="logout-button" onClick={handleLogoutClick}>
                Logout
              </button>
                </li>
                <li className="nav__item">
                  <Link to='/profile'>My Profile <IoPersonCircleOutline /></Link>
                </li>
                <li className="nav__item">
                  <Link to='/feed'>Feed <CgFeed /></Link>
                </li>
                <li className="nav__item">
                  <Link to='/followers'>Followers <IoIosPeople /></Link>
                </li>
                <li className="nav__item">
                <input type="text" id="kriterijum" placeholder="Pretrazi" 
                        name="search" onChange={()=>pretrazi(document.getElementById('kriterijum').value)}/>
                    <button type="submit" className='dugmePretraga'  ><BsSearch></BsSearch></button>
                </li>
              </>
            ) : (
              <li className="nav__item">
                <Link to="/">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;