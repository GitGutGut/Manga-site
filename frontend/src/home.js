import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useAuth } from './authContext';

const Home = () => {
    const [mangaData, setmangaData] = useState([])
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    useEffect(() => {
        fetchMangaData();
    }, []);

    const fetchMangaData = async => {
        try {
            //TODO: BACKEND SEND DATA
        } catch (error) {
            console.log("ERROR FETCHING DATA:", error)
        }
    }
    return (
        <div className="home">
            <Navbar />
            <div className="manga">
                <h1>TU BUDU MANGY</h1>
            </div>
        </div>);
}

export default Home;