import React, { useState, useEffect } from "react";

import "./App.css"
import Figure from "./components/Figure";
import Wrongwords from "./components/Wrongwords";
import Words from "./components/Words";
import Popup from "./components/Popup";
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import audio from "./click.mp3"
import warn from "./warn.mp3"
import Keyboard from "./components/Keyboard";
import wrong from "./wrong.mp3"
import a from "./components/hangman/a.png"

function App() {
  const [SelectedWord, setSelectedWord] = useState(" ")
  const [CorrectLetters, setCorrectLetters] = useState([])
  const [WrongLetters, setWrongLetters] = useState([])
  const [IsPlayable, setIsPlayable] = useState(true)
  const [status, setstatus] = useState()
  const [Image, setImage] = useState("")
  const [progress, setProgress] = useState(0)
  const [Source, setSource] = useState(a)


  const genRandomWord = async () => {
    // const url = `https://random-words5.p.rapidapi.com/getRandom?wordLength=${Math.floor(Math.random() * 7) + 8}`;
    const url = `https://random-word-form.herokuapp.com/random/noun`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'af6992f95emshb3f53ef1d1e16a2p1a8fc9jsn362b1697f297',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    };
    setProgress(progress + 5)
    try {
      const response = await fetch(url, options);
      setProgress(progress + 10)
      const result = await response.text();

      setProgress(progress + 20)
      setSelectedWord(JSON.parse(result)[0])
      // setSelectedWord("monotheism")
    } catch (error) {
      console.error(error);
    }

  }
  const playKeySound = (audioe) => {
    const audioo = new Audio(audioe);
    audioo.play();
  };

  const getPhto = async () => {
    let url = SelectedWord !== " " ? `https://pixabay.com/api/?key=23680532-f8681162eb71c8ddf5afe8d36&q=${SelectedWord}&image_type=photo&pretty=true` : ""
    try {
      setProgress(progress + 10)
      const response = await fetch(url);
      const result = await response.text();
      setProgress(progress + 20)
      let img;

      img = JSON.parse(result).hits[0]
      if (img !== undefined) {
        img = JSON.parse(result).hits[0].webformatURL

      }
      else if (img === undefined) {

        genRandomWord()
      }
      setImage(img)
      setProgress(100)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPhto()
    // eslint-disable-next-line
  }, [SelectedWord])

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (IsPlayable && (keyCode >= 65 && keyCode <= 90)) {
        const letter = key.toLowerCase();

        if (SelectedWord.includes(letter)) {
          if (!CorrectLetters.includes(letter)) {
            playKeySound(audio)
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            toast.warn(' Key already entered ', {
              position: "top-center",
              autoClose: 1398,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            playKeySound(warn)
          }
        } else {
          if (!WrongLetters.includes(letter)) {

            playKeySound(wrong)
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            toast.warn(' Key already entered ', {
              position: "top-center",
              autoClose: 1398,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            playKeySound(warn)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
    // eslint-disable-next-line
  }, [CorrectLetters, WrongLetters, IsPlayable]);

  const PlayAgain = () => {
    setSource(a)
    genRandomWord()
    setIsPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])
  }

  useEffect(() => {

    genRandomWord()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <LoadingBar
        progress={progress}
        height={6}
        color={"#FF0000"}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-center"
        autoClose={1398}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${Image})`,
        backgroundPosition: "center", backgroundSize: 'cover', height: '100vh', backgroundRepeat: "no-repeat"
      }}
        className="App text-white ">


        <div className="container-fluid h-100  d-flex flex-column pt-0 pt-sm-2 pt-md-5 pt-lg-5    justify-content-center align-items-center">



          <div className="heading d-flex flex-row align-items-center">
            <span className="fw-bold  ">HANG</span>
            <span style={{ color: 'red' }} className="fw-bold ">MAN</span>
          </div>
          <p className="desc d-flex flex-column justify-content-center align-items-center">
            <p style={{ marginBottom: '-5px' }} className=" font-monospace  fst-italic">Guess the correct word by pressing letters
            </p>
            <span className=" font-monospace fst-italic">
              (use background as hint)
            </span>

          </p>
          <div className="container row">
            <Figure Source={Source} setSource={setSource} status={status} setstatus={setstatus} WrongLetters={WrongLetters} />
            {WrongLetters.length !== 0 ? <Wrongwords className="col-4" WrongLetters={WrongLetters} /> : ""}
          </div>
          <Words setCorrectLetters={setCorrectLetters} SelectedWord={SelectedWord} CorrectLetters={CorrectLetters}
            WrongLetters={WrongLetters}
          />

          <Popup playKeySound={playKeySound} WrongLetters={WrongLetters} PlayAgain={PlayAgain} IsPlayable={IsPlayable} setIsPlayable={setIsPlayable} status={status} SelectedWord={SelectedWord} CorrectLetters={CorrectLetters} />
          <Keyboard playKeySound={playKeySound} setCorrectLetters={setCorrectLetters} setWrongLetters={setWrongLetters} IsPlayable={IsPlayable} SelectedWord={SelectedWord} CorrectLetters={CorrectLetters} WrongLetters={WrongLetters} />
        </div>
      </div>


    </div>

  );
}


export default App;