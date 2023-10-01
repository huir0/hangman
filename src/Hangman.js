import React, { useEffect, useState } from 'react';
import Hanging from './Hanging';
import Result from './Result';
import './App.css';

export default function Hangman() {
    const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const categories = ['동물','과일','영화','게임','음악'];
    const animals = ['hedgehog','elephant','jaguar','alligator','armadillo','donkey','dolphin','hummingbird','kangaroo','pelican','penguin','panther','wallaby'];
    const fruits = ['orange','grape','strawberry','watermelon','melon','apple','cherry','blueberry','coconut','durian','peach','guava','lemon','mango','mandarin','pineapple','plum'];
    const movies = ['gataka','iron man','the mask','hulk','truman show','dune','contact','frequency','alien','the host','harry potter','eternals','casablanca'];
    const games = ['pokemon','starfield','unturned','minecraft','rust','warframe','dont starve','terraria','payday','dayz','the sims','elden ring','biohazard','overwatch','rimworld','new world','stellaris','super mario','valheim','factorio','fallout','titanfall','brawlhalla'];
    const songs = ['lady gaga','all my life','september','unholy','shape of you','vampire','memories','flowers','uptown funk','youth','im yours','stronger','abcdefu','strings','bad guy','blank space','smoke','umbrella','ditto','unforgiven','summer','underwater','new jeans'];
    
    const [wordlist, setWordlist] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const [status, setStatus] = useState('');
    const [corrects, setCorrects] = useState([]);
    const [wrong, setWrong] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const underBar = 
        selectedWord
            .split('')
            .map(letter => corrects.includes(letter) ? letter : '_')
            .join(" ");

    const onGuess = letter => {
        if (wrong.length > 7 || status) return;
        if (selectedWord.includes(letter)) setCorrects([...corrects, letter]);
        else setWrong([...wrong, letter]);
    }

    const listWord = () => {
        if (selectedCategory !== '') {
            const indices = new Set();
            while (indices.size < 3) {
                indices.add(Math.floor(Math.random() * selectedCategory.length));
            }
            setWordlist([...indices].map(index => selectedCategory[index].toUpperCase()));
        }
    }
    

    const handleWord = word => {
        setSelectedWord(word);
    }

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

    const reset = () => {
        setSelectedWord('');
        listWord();
        setCorrects([]);
        setWrong([]);
        setStatus('');
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

    useEffect(() => {
        if (corrects.length && selectedWord.split('').every(letter => corrects.includes(letter))) setStatus('성공');
    },[corrects]);

    useEffect(() => {
        if (wrong.length === 8) setStatus('실패');
    },[wrong]);

    return (
        <div>
            <p> 주제를 고르세요 </p>
            <div>
                {categories.map(category => (
                    <button onClick={() => handleCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div>
                {wordlist.length > 0 && selectedWord === '' && wordlist.map(word => (
                    <button onClick={() => handleWord(word)}>
                        {word}
                    </button>
                ))}
            </div>
            <p className='underbar'>{underBar}</p>
            <div>
                {alphabets.map((letter, index) => 
                {
                    if (corrects.includes(letter)) return null;
                    return (
                        <button 
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
            <Hanging wrong = {wrong.length} />
            <Result status={status} selectedWord={selectedWord} reset={reset} />
        </div>
    )

}