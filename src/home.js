import { useState, useEffect } from "react";
import Navbar from "./navbar";

const Home = () => {
    const [mangaData, setmangaData] = useState([])

    useEffect(() => {
        fetchMangaData();
    }, []);

    const fetchMangaData = async =>{
        try{

        } catch(error){
            console.log("ERROR FETCHING DATA:", error)
        }
    }
    return ( 
    <div className="home">
        <Navbar />
        <div className="manga">
            <h1>TU BUDU MANGY</h1>
            </div>
    </div> );
}
 
export default Home;