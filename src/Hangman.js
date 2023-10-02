import React, { useEffect, useState } from 'react';
import Hanging from './Hanging';
import Result from './Result';
import './App.css';

export default function Hangman() {
    const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    /** 주제와 그 주제에 해당하는 영어 단어들 */
    const categories = ['동물','과일','영화','게임','음악'];
    const animals = ['hedgehog','elephant','jaguar','alligator','armadillo','donkey','dolphin','hummingbird','kangaroo','pelican','penguin','panther','wallaby'];
    const fruits = ['orange','grape','strawberry','watermelon','melon','apple','cherry','blueberry','coconut','durian','peach','guava','lemon','mango','mandarin','pineapple','plum'];
    const movies = ['gataka','godfather','hulk','dune','contact','frequency','alien','inception','interstellar','eternals','casablanca','seven','psycho','pianist','gladiator','oppenheimer'];
    const games = ['pokemon','starfield','unturned','minecraft','rust','warframe','dont starve','terraria','payday','dayz','sims','biohazard','overwatch','rimworld','stellaris','grounded','valheim','factorio','fallout','titanfall','brawlhalla'];
    const songs = ['hallelujah','rush','september','unholy','wonderwall','vampire','memories','flowers','bloom','youth','wild','stronger','abcdefu','strings','lover','anyone','smoke','umbrella','ditto','unforgiven','summer','underwater','infinity'];
    
    const [wordlist, setWordlist] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const [status, setStatus] = useState('');
    const [corrects, setCorrects] = useState([]);
    const [wrong, setWrong] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    /** 선택된 영어 단어를 _로 변환 */
    const underBar = 
        selectedWord
            .split('')
            .map(letter => corrects.includes(letter)? letter : '_')
            .join(" ");

    /** 알파벳을 골라, 결과에 따라 Corrects, Wrong에 추가 */
    const onGuess = letter => {
        if (wrong.length > 7 || status) return;
        if (selectedWord.includes(letter)) setCorrects([...corrects, letter]);
        else setWrong([...wrong, letter]);
    }

    /** 선택된 카테고리에서 영어 단어 3개를 랜덤으로 뽑기 */
    const listWord = () => {
        if (selectedCategory !== '') {
            const indices = new Set();
            while (indices.size < 3) {
                indices.add(Math.floor(Math.random() * selectedCategory.length));
            }
            setWordlist([...indices].map(index => selectedCategory[index].toUpperCase()));
        }
    }
    
    /** 단어 고르기 */
    const handleWord = word => {
        setSelectedWord(word);
    }

    /** 선택된 카테고리를 selectedCategory로 설정 */
    const handleCategory = category => {
        switch(category) {
            case '동물':
                setSelectedCategory(animals);
                break;
            case '과일':
                setSelectedCategory(fruits);
                break;
            case '영화':
                setSelectedCategory(movies);
                break;
            case '게임':
                setSelectedCategory(games);
                break;
            case '음악':
                setSelectedCategory(songs);
                break;
            default:
                setSelectedCategory('');
        }
        reset();
    }

    /** 다시하기, 카테고리 고를 경우 상태 초기화 및 단어 3개 뽑기 */
    const reset = () => {
        setSelectedWord('');
        listWord();
        setCorrects([]);
        setWrong([]);
        setStatus('');
        /** 카테고리가 비어 있을 경우엔 단어 리스트 초기화 */
        if (selectedCategory ==='') setWordlist([]);
    }

    useEffect(reset, []);

    useEffect(() => {
        if (selectedCategory) {
            reset();
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedWord) setSelectedCategory('');
    },[selectedWord]);

    /** 다 맞혔을 경우 status '성공'으로 설정 */
    useEffect(() => {
        if (corrects.length && selectedWord.split('').every(letter => corrects.includes(letter))) setStatus('성공');
    },[corrects]);

    /** 8번 틀릴 경우 status '실패'로 설정 */
    useEffect(() => {
        if (wrong.length === 8) setStatus('실패');
    },[wrong]);

    return (
        <div className='game'>
            <p> 주제를 고르세요 </p>
            <div className='category'>
                {categories.map(category => (
                    <button onClick={() => handleCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div className='word'>
                {wordlist.length > 0 && selectedWord === '' && wordlist.map(word => (
                    <button onClick={() => handleWord(word)}>
                        {word}
                    </button>
                ))}
            </div>

            <div className='hanging'>
                <Hanging wrong = {wrong.length} />
            </div>

            <p className='underbar'>{underBar}</p>
            <div>
                {alphabets.map((letter, index) => 
                {
                    /** 맞힐 경우 알파벳 삭제 */
                    if (corrects.includes(letter)) return null;
                    /** 틀릴 경우 버튼 비활성화 및 빨간색 설정*/
                    return (
                        <button 
                            className='letterButton'
                            key={index} 
                            disabled={selectedWord==='' || wrong.includes(letter)} 
                            onClick={() => onGuess(letter)}
                            style={{
                                backgroundColor: wrong.includes(letter) ? 'red' : '',
                                color: wrong.includes(letter) ? 'white' : 'black',
                            }}>
                            {letter}
                        </button>
                        )
                    }
                )}
            </div>
            <Result status={status} selectedWord={selectedWord} reset={reset} />
        </div>
    )

}