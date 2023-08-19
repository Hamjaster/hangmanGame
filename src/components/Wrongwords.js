import React from 'react'

export default function Wrongwords(props) {
  

  return (
    <>
      <div className="col-4 text-center wrong-words ">
        <div className='fs-2 font-monospace fw-lighter  text-center lh-1  fw-bold'> WRONG LETTERS 
        </div>
          {/* <br /> */}
          <div className="key-container m-2 flex-wrap  d-flex flex-row">

          {props.WrongLetters.map((e, i) => {
            return (
          <div className="key-letter m-1 d-flex flex-row">
            <div className="key">
              <span className='fs-3 text-danger' key={i}> {e.toUpperCase()}</span>
            </div>
          </div>
            )
          })}
          </div>
      </div>
    </>
  )
}
