import React, { useEffect,useState } from 'react'


import b from "./hangman/b.png"
import c from "./hangman/c.png"
import d from "./hangman/d.png"
import e from "./hangman/e.png"
import f from "./hangman/f.png"
import g from "./hangman/g.png"

export default function Figure(props) {
  
  let errors = props.WrongLetters.length;
  useEffect(() => {
    if (errors===6) {
      props.setstatus('lose')
    }
    if (errors>0) {
      props.setSource(b)
    }  if(errors>1) {
      console.log('in else if');
      props.setSource(c)
    } if(errors>2){
      props.setSource(d)
    }
     if(errors>3){
      props.setSource(e)
    }
     if(errors>4){
      props.setSource(f)
    }
     if(errors>5){
      props.setSource(g)
    }
    
    console.log(props.status);
    console.log(errors,'these are errors');
  }, [errors])
  // useEffect(() => {
    
  
  //   return () => {
  //     second
  //   }
  // }, [errors])
  
  
  return (
    <div className=' col-8 mt-0 mt-sm-2 mt-md-3 mt-lg-5  '>
      
      {/* <div className="svg"> */}
        {/* <svg height="250" style={{stroke: "white"}} width="200" class="figure-container  text-white"> */}
          {/* <!-- Rod --> */}
          {/* <line x1="60" y1="20" x2="140" y2="20" />
          <line x1="140" y1="20" x2="140" y2="50" />
          <line x1="60" y1="20" x2="60" y2="230" />
          <line x1="20" y1="230" x2="100" y2="230" />
          <svg className="hangman"> */}

          {/* <!-- Head --> */}
          {/* { errors>0 && <circle  className='text-warning ' style={{stroke: "red",fill:'red'}} cx="140" cy="70" r="20"/>} */}
          {/* <!-- Body --> */}
          {/* { errors>1 && <line className='text-warning ' style={{stroke: "red"}} x1="140" y1="90" x2="140" y2="150"/>} */}
          {/* <!-- Arms --> */}
          {/* { errors>2 && <line className='text-warning ' style={{stroke: "red"}} x1="140" y1="120" x2="120" y2="100"/>} */}
          {/* { errors>3 && <line className='text-warning ' style={{stroke: "red"}} x1="140" y1="120" x2="160" y2="100"/>} */}
          {/* <!-- Legs --> */}
          {/* { errors>4 && <line className='text-warning ' style={{stroke: "red"}} x1="140" y1="150" x2="120" y2="180"/>} */}
          {/* { errors>5 && <line className='text-warning ' style={{stroke: "red"}} x1="140" y1="150" x2="160" y2="180"/>} */}
          {/* </svg> */}
        {/* </svg> */}
      {/* </div> */}

      <div className="hangman-rod">
            <img className='hangman-img'  src={props.Source} alt="" srcset="" />
      </div>

    </div>
  )
}
