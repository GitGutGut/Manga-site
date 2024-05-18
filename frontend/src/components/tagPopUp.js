import Tags from '../tags/tags.js';

const addTag = (name, mangaInformation, setMangaInformation, setActiveButton) => {
    setMangaInformation(prev => ({
        ...prev,
        tags: mangaInformation.tags.includes(name) ? (
            setActiveButton(
                active => ({
                    ...active,
                    [name]: false
                })),
            prev.tags.filter(t => t !== name)
        )
            : (setActiveButton(deactive => ({
                ...deactive,
                [name]: true
            })),
                [...prev.tags, name])
    }));
}

function TagPopUp({ mangaInformation, activeButton, setMangaInformation, setActiveButton }) {
    return (
        <>{
            Object.entries(Tags)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([tag, name]) => (
                    <div key={tag} className='tag'>

                        <button type="button" className='tagButton' onClick={() => {
                            addTag(name,
                                mangaInformation,
                                setMangaInformation,
                                setActiveButton);

                        }}
                            style={{
                                backgroundColor: activeButton[name] ? 'black' : 'grey'
                            }}
                        >{name}</button>
                    </div>)
                )}
        </>
    );
}

export default TagPopUp;