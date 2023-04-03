import React, { useEffect,useState } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Stroke from '../../images/Stroke 3.png'
import Ellipse from '../../images/Ellipse 19.png'
 import Course from '../home_page/Course_card';

export default function Course_videos({videos,videoUrl,setVideoUrl,videoId,setVideoId,played,setExacTtime}) {
  const[playIndex,setPlayIndex]= useState() 
  const temp=videos.chapters  

  useEffect(()=>{
    localStorage.setItem(videoId,played)
  },[videoId,played])

  useEffect(()=>{
    temp && temp.map((item,index)=>{
        if(item.asset.resource.stream.url==videoUrl){
            setPlayIndex(index)
        }
    })
  },[videoUrl])

// get decimal part
  function getDecimalPart(num) {
    if (Number.isInteger(num)) {
      return 0;
    }
    const decimalStr = num.toString().split('.')[1];
    return Number(decimalStr);
  }
  
  // Changes the seconds format
  function second_format(time){
     return(
        Math.floor(Number(String(getDecimalPart((time/60))).slice(0, 2))*0.6)<10?"0"+Math.floor(Number(String(getDecimalPart((time/60))).slice(0, 2))*0.6):Math.floor(Number(String(getDecimalPart((time/60))).slice(0, 2))*0.6)
     )
  }

  function now_playing(item){
    setExacTtime(localStorage.getItem(item.id))
    setVideoUrl(item.asset.resource.stream.url)
    setVideoId(item.id)
  }

  return (
    <div className='frame1413'>
        {temp && temp.map((item,index)=>{
            return(
              <Row key={index} style={{cursor:'pointer',backgroundColor:index==playIndex? 'rgba(0, 171, 254, 0.08)':""}}>
                <Col xs={1} md={1}><img src={localStorage.getItem(item.id)>10?Stroke:Ellipse} /></Col>
                <Col xs={1} md={1}>{index+1}.</Col>
                <Col xs={8} md={8}><h6  key={item.id} onClick={a=>now_playing(item)}>{item.title}</h6> </Col>
                <Col xs={1} md={1}><h6>{Math.floor(item.asset.resource.duration/60)}:{second_format(item.asset.resource.duration)}</h6></Col>
              </Row>  
            )     
        })}
    </div>

  )
}
