import { useAuth } from './authContext';
import { useState } from 'react';

const Navbar = ({ filterFunc }) => {
    const { authData, updateAuthData } = useAuth();
    const [filter, setFilter] = useState('');

    const handleLogout = () => {
        updateAuthData({ isLoggedIn: false, isAdministrator: false,  username: ""})
    }
    const sendFilter = (event) => {
        setFilter(event.target.value);
        filterFunc(event.target.value);
    }

    return (
        <nav className="navbar">
            <div className="links">
                <a href="/"> Main menu</a>
                {authData.isAdministrator && (<a href="/addManga">AddManga</a>)}
                {authData.isLoggedIn ? (
                    <>
                        <button type='button'
                            onClick={handleLogout}>LOGOUT</button>
                    </>
                ) : (
                    <>
                        <a href="/register"> Register</a>
                        <a href="/login"> Login</a>
                    </>
                )}
                {authData.username !== "" && <b>Logged in as {authData.username}.</b>}
            </div>
            <div className="main_menu">
                {filterFunc && <input className="SearchBar"
                    placeholder='Search'
                    onChange={sendFilter}></input>}
                <a href="/">Manga_site.eu</a>
            </div>

        </nav>);
}

export default Navbar;