import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Course_videos from './Course_videos';
import Video_player from './Video_player';
import Medal from '../../images/medal.png'
import Stroke from '../../images/Stroke 3.png'

export default function Course_page() {
  const {id} = useParams(); 
  const [videos, setVideos] = useState([]);
  const [videoUrl,setVideoUrl] = useState('');
  const [played, setPlayed] = useState(0);
  const [videoId,setVideoId] = useState();
  const [video_counter,setVideo_counter] = useState();
  const [isLoading, setLoading] = useState(true)
  const [exacTtime,setExacTtime] = useState('0')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/'+id, {
        auth: {
          username: "bigvu",
          password: "interview"
        }
      });
      setVideos(result.data);
      setLoading(false)
    };
    fetchData();
    nextVideo();
  }, []);
 
  useEffect(()=>{
    completedChapters()
    nextVideo()
  },[videos])

  useEffect(()=>{
    completedChapters()
  },[played])

// get the next video for playing
function nextVideo(){
    const videosWatched=allStorage()
    var flag=0
    for (var i=0 ; i<(videos.chapters && videos.chapters.length) ;i++){
       flag=0
       for(var j=0;j<videosWatched[0].length;j++){

           if (videos.chapters[i].id==videosWatched[0][j]){
               if((localStorage.getItem(videos.chapters[i].id))<10){
                   setVideoId(videos.chapters[i].id)
                   setExacTtime(localStorage.getItem(videos.chapters[i].id))
                   setVideoUrl(videos.chapters[i].asset.resource.stream.url)
                   flag=2
               }
               else{
                flag=1
               }
           } 
       }
       if ((flag==0) && (i<=videos.chapters.length) && (videosWatched[0][j]!=undefined || j== videosWatched[0].length)){
               setVideoId(videos.chapters[i].id)
               setVideoUrl(videos.chapters[i].asset.resource.stream.url)
               console.log("this is i:"+i) 
           }
           if(flag==0 || flag==2){
            break
           }
   }

}

// give me the number of the videos viewed
function completedChapters(){
    var counter=0
    const videosWatched=allStorage()
    for (var i=0 ; i<(videos.chapters && videos.chapters.length) ;i++){
        for(var j=0;j<videosWatched[0].length;j++){
            if (videos.chapters[i].id==videosWatched[0][j]){
                if((localStorage.getItem(videos.chapters[i].id))>=10){
                    counter=counter+1
                }
            }
        }
    }
    setVideo_counter(counter)
}

// get my local storage keys
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        values.push(keys);
    return values;
}

  return (
    <div className='course_page'>
        <Container>
        <Row>  
            <Col md={7} xs={10} sm={10}>
              {
              videoUrl?<></>:<div>
                <h2 className='congratulations'>Congratulations</h2>
                <h4>You have finished this part</h4>
                </div>
                }
                <Video_player exacTtime={exacTtime} nextVideo={nextVideo} setPlayed={setPlayed} videos={videos} videoUrl={videoUrl}></Video_player>
            </Col>
            <Col md={5} xs={10} sm={10}> 
            <Row>
                <Col md={8}>
                <h2 className='headline'>{videos['headline']}</h2>
                </Col>
                <Col md={4}>
                    <div className='medal_box'>
                            <img src={Medal}/>  
                            <h5 className='video_counter'>{video_counter+"/"+(videos.chapters && videos.chapters.length)}</h5>                
                    </div>
                    <img className='total_videos_sign' src={video_counter==(videos.chapters && videos.chapters.length)?Stroke:""} />
                </Col>
            </Row>
            {isLoading?<div className='loader' style={{width:'20px',height:'20px',marginTop:'0px'}}></div>: 
            <Course_videos played={played} setVideoId={setVideoId} setExacTtime={setExacTtime} videoId={videoId} videos={videos} videoUrl={videoUrl} setVideoUrl={setVideoUrl}/>}
            </Col>
        </Row>
        </Container>
    </div>
  )
}
