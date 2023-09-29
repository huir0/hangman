const End = ({status, selectedWord, reset}) => {
    if (!status) return null;

    return (
        <div className="finished">
            <p>{status}했습니다!</p>
            <p>답은 {selectedWord}입니다.</p>
            <button className="playagain" onClick={reset}>
                다시하기
            </button>
        </div>
    )
}

export default End;