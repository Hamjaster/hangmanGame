import React from 'react'
import audio from "../click.mp3"
import warn from "../warn.mp3"
import wrong from "../wrong.mp3"
export default function Keyboard(props) {
  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  var qwertyAlphabet = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
  ];
  var isMobile = (navigator.userAgentData && navigator.userAgentData.mobile) || /Mobile|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  console.log(isMobile);

  const handleKeydown = event => {
    const key  = event;
    console.log('hyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    // if (props.IsPlayable && (keyCode >= 65 && keyCode <= 90)) {
      const letter = key.toLowerCase();
      console.log(props.SelectedWord, 'wordtoguess', letter);
      if (props.SelectedWord.includes(letter)) {
        if (!props.CorrectLetters.includes(letter)) {
          props.playKeySound(audio)
          props.setCorrectLetters(currentLetters => [...currentLetters, letter]);
        } else {
          alert('key already pressed')
        }
      } else {
        if (!props.WrongLetters.includes(letter)) {
          console.log(letter, props.WrongLetters, !props.WrongLetters.includes(letter));
          props.playKeySound(wrong) 
          props.setWrongLetters(currentLetters => [...currentLetters, letter]);
        } else {
          alert('key already pressed')
        }
      }
    // }
  }



  return (
    <div style={{
      fontSize:'12px',
      display:`${isMobile?"flex":"none"}`
    }} className='key-container   w-100   align-items-center justify-content-center flex-row flex-wrap '>

     {qwertyAlphabet.map(e=>{
      return(
        <span style={{width:'34px',height:'34px'}}  className="ky-letter cursor-pointer m-1">
          <span onClick={()=>{
              handleKeydown(e)
          }} style={{fontSize:'22px',width:'35px',height:'35px'}} className="ky cursor-pointer">
            {e}
          </span>
        </span>
      )
     })}
      
    </div>
  )
}
