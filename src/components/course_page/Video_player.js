import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import ReactPlayer from 'react-player'
import { useState, useEffect,useRef } from 'react';
import PlayBtn from '../../images/play btn.png'

export default function Video_player({videos,videoUrl,setPlayed,nextVideo,exacTtime}) {
  const playerRef = React.useRef();
  const[ifPause,setIfPause]=useState(false)

  function onStart(){
    const timeToStart = exacTtime;
    playerRef.current.seekTo(timeToStart, 'seconds');
  }
  
  function onPause(){
    setIfPause(true)
  }
  
  function onPlay(){
    setIfPause(false)
  }

  return (  
    <div className='player'>
        {ifPause&&<img className='playBtn' src={PlayBtn} />}
        <ReactPlayer  ref={playerRef} url={videoUrl} playing={true} controls={true} onEnded={nextVideo}
        onStart={onStart} width={'100%'} height={'100%'} onPause={onPause} onPlay={onPlay}
        playIcon={PlayBtn}

        onProgress={(progress)  => {
         setPlayed(progress.playedSeconds);
        }} />
    </div>
    
  )
}
