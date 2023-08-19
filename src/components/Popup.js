import React, { useEffect } from 'react'
import lose from "../lose.mp3"
import win from "../win.mp3"

export default function Popup(props) {
    // Array of winning messages
    const winningMessages = [
        "Congratulations! You won! 😀",
        "Great job! You are the winner! 😄",
        "You saved the Hangman! Well done! 😋",
        "You're a winner! Amazing! 😉",
        "Winning! Keep up the good work! 😇",
        "You did it! You're the champ! 😊"
    ];

    // Array of losing messages
    const losingMessages = [
        "Oops! You hanged him 🥺",
        "Better luck next time! You lost! 🙁",
        "Oh no! You couldn't save him. 😔",
        "Defeat! Don't give up, try again! 😞",
        "Sorry, you lost. Keep practicing! 😧",
        "You didn't win this round! 🤥"
    ];
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let Rword = props.SelectedWord.toUpperCase()
    let msg = ""
    let wordReveal = ""
    let playable = true;
    const checkWin = () => {
        let status = "win";

        if (props.CorrectLetters.includes(props.SelectedWord.charAt(0)) && props.CorrectLetters.length === 1) {
            status = "";
        }

        props.SelectedWord.split('').map(e => {
            if (!props.CorrectLetters.includes(e)) {
                status = "";
            }
            return 0;
        })

        if
            (props.WrongLetters.length === 6) {
            status = 'lose';
        }

        return status;
    }

    if (checkWin() === "win") {
        msg = winningMessages[getRandomNumber(0, 5)]
        wordReveal = `You guessed `
        playable = false;
        props.playKeySound(win)
    } else if (checkWin() === "lose") {
        msg = losingMessages[getRandomNumber(0, 5)]
        wordReveal = `The word was `
        playable = false;
        props.playKeySound(lose)
    }

    useEffect(() => {
        props.setIsPlayable(playable)
    })

    if (!playable) {

        return (

            <div className={`popup-container text-white d-flex flex-`}>
                <div className={`popup p-3 p-sm-4 p-md-5 p-lg-4  rounded`}>
                    <h1>{msg}</h1>
                    <div className="text d-flex flex-row align-items-center justify-content-center">
                        <h2>{wordReveal}</h2> <span className='fs-1 text-warning mb-1 fw-bolder ps-2'>
                            <a className='link text-warning' target='_' href={`https://www.google.com/search?q=${Rword.toLowerCase()}&rlz=1C1CHWL_enPK1028PK1028&oq=${Rword.toLowerCase()}&aqs=chrome.0.69i59j46i512j0i512l5j5.8799j0j9&sourceid=chrome&ie=UTF-8`}> {Rword}</a>
                        </span>
                    </div>
                    <button onClick={() => {
                        props.PlayAgain()
                    }} className={`button-30 mt-2 `}>
                        {checkWin() === "lose" ? "Try Again" : "Restart"}
                    </button>
                </div>
            </div>

        )
    } else {
        return (
            <></>
        )
    }
}
