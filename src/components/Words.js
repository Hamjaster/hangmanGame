import React, { useEffect } from 'react'

export default function Words(props) {
  
  useEffect(() => {
    props.SelectedWord.split("").map((letter) => {
      if (letter === props.SelectedWord.charAt(0)) {
        props.setCorrectLetters([letter])
      }
    })
  }, [props.SelectedWord])

  return (
    <div className='mb-1 mt-1   mb-sm-2 mt-sm-2 mb-md-3 mt-md-3 mb-lg-5 mt-lg-5'>
      {props.SelectedWord.split("").map((letter) => {
        return (
          <span style={{ fontSize: '64px' }} className='me-sm-3 me-xs-2 me-md-4 me-lg-4'>
            {props.CorrectLetters.includes(letter) || props.SelectedWord.charAt(0) === letter ? letter : "-"}
            {/* {props.SelectedWord.charAt(0)===letter?props.setCorrectLetters([letter]):""} */}
          </span>
        )
      })}
    </div>
  )
}
