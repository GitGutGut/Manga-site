import { useAuth } from './authContext';

const Navbar = () => {
    const { authData, updateAuthData } = useAuth();

    const handleLogout = (e) => {
        updateAuthData({ isLoggedIn: false, isAdministrator: false })
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
            </div>
            <div className="main_menu">
                <input></input>
                <a href="/">Manga_site.eu</a>
            </div>

        </nav>);
}

export default Navbar;