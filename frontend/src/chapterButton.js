const ChapterButton = ({mangaId, nextPrevChapter, index}) => {
    return (
        <div className="ChapterMover">
            
            {nextPrevChapter.prevChapter && <a href={`/manga/${mangaId}/${nextPrevChapter.prevChapter}/${parseInt(index) - 1}`}>
                <button type="button" className="PrevChapter" >{" < Prev"}</button>
            </a>}
            {nextPrevChapter.nextChapter && <a href={`/manga/${mangaId}/${nextPrevChapter.nextChapter}/${parseInt(index) + 1}`}>
                <button type="button" className="NextChapter" >{"Next  > "}</button>
            </a>}
        </div>);
}

export default ChapterButton;