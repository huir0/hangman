const Hanging = ({ wrong }) => {
    return (
        <svg height="330" width="400">
            {/** 머리 */}
            {wrong > 2 && (
                <g id="head">
                    <circle cx="200" cy="80" r="20" stroke="black" stroke-width="4" fill="white" />
                    {wrong < 8 && (
                        <g id="rEyes">
                            <circle cx="193" cy="80" r="4" />
                            <circle cx="207" cy="80" r="4" />
                        </g>
                    )}
                    {wrong === 8 && (
                        <g id="xEyes" class="hide">
                            <line x1="190" y1="78" x2="196" y2="84" />
                            <line x1="204" y1="78" x2="210" y2="84" />
                            <line x1="190" y1="84" x2="196" y2="78" />
                            <line x1="204" y1="84" x2="210" y2="78" />
                        </g>
                    )}
                </g>
            )}

            {/** 몸통 */}
            {wrong > 5 && <line id="body" x1="200" y1="100" x2="200" y2="150" />}

            {/** 팔 */}
            {wrong > 3 && (
                <g>
                    <line id="armL" x1="200" y1="120" x2="170" y2="140" />
                    <line id="armR" x1="200" y1="120" x2="230" y2="140" />
                </g>
            )}

            {/** 손 */}
            {wrong > 4 && (
                <g>
                    <line x1="170" y1="140" x2="160" y2="140" />
                    <line x1="230" y1="140" x2="240" y2="140" />
                </g>
            )}

            {/** 다리 */}
            {wrong > 6 && (
                <g>
                    <line id="legL" x1="200" y1="150" x2="180" y2="190" />
                    <line id="legR" x1="200" y1="150" x2="220" y2="190" />
                </g>
            )}

            {/** 발 */}
            {wrong > 7 && (
                <g>
                    <line x1="180" y1="190" x2="170" y2="190" />
                    <line x1="220" y1="190" x2="230" y2="190" />
                </g>
            )}

            {/** 교수대 */}
            {wrong > 0 && (
                <g>
                    <line x1="70" y1="250" x2="300" y2="250" />
                    <line x1="100" y1="250" x2="100" y2="40" />
                    <line x1="100" y1="40" x2="200" y2="40" />
                </g>
            )}
            {/** 밧줄 */}
            {wrong > 1 && <line id="rope" x1="200" y1="40" x2="200" y2="60" />}
        </svg>
    );
};

export default Hanging;
