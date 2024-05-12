import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PopUpWindow = ()  => {
    const [isOpen, setIsOpen] = useState(false);
    const { mangaId } = useParams();
    const navigate = useNavigate();

    const togglePopUp = () => {
        setIsOpen(!isOpen)
    };
    const deleteManga = () => {
        axios.delete("http://localhost:8000/polls/manga-api/", {
            params: {
                id: mangaId
            }
        })
        .then(response => {
            console.log(response)
            navigate('/')
        }
        ).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='DeleteManga'>
            <button className="Delete" type="button" onClick={togglePopUp}>Delete</button>

            {isOpen && (
                <div className="PopUp">
                    <div className='PopUpContent'>
                        <b>Are you sure you want to delete this manga?</b>
                        <div className='ConfirmationButtons'>
                            <button className="Confirm" type="button" onClick={deleteManga}>Yes</button>
                            <button className="Cancel" type="button" onClick={togglePopUp}>No</button>
                        </div>
                    </div>

                </div>
            )}
        </div>

    );
}

export default PopUpWindow