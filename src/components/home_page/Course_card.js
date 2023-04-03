import React from 'react'
import { Col, Container, Row,Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Orange_vector from '../../images/Vector 12.png'
import Blue_vector from '../../images/Vector 13.png'
import Green_vector from '../../images/Vector 14.png'
import Green_ellipse from '../../images/Ellipse 16.png'
import Orange_ellipse from '../../images/Ellipse 17.png'
import Blue_ellipse from '../../images/Ellipse 18.png'
import Arrow from '../../images/Group 64.png'
import Video_logo from '../../images/video Filled.png'
import Stroke from '../../images/Stroke 3.png'

export default function Course_card({course,color,courseIndex}) {
    const[videos,setVideos]=useState()
    const[completedVideo,setCompletedVideo]=useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios('/'+course.id, {
            auth: {
              username: "bigvu",
              password: "interview"
            }
          });
          setVideos(result.data);
          setLoading(false)
        };
        fetchData()
      }, []);   

      useEffect(()=>{
        setCompletedVideo(completedChapters())
      },[videos])

// get the number of all the finish chapters 
      function completedChapters(){
        var counter=0
        var courseVideoCounter=(videos && videos.chapters.length)
        const videosWatched=allStorage()
        for (var i=0 ; i<(courseVideoCounter) ;i++){
            for(var j=0;j<videosWatched[0].length;j++){
                if (videos.chapters[i].id==videosWatched[0][j]){
                    if((localStorage.getItem(videos.chapters[i].id))>=10){
                        counter=counter+1
                    }
                }
            }
        }
        return counter
    }

    // get user local storage keys
    function allStorage() { 
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
            values.push(keys);
        return values;
    }

  return (
    <div  > 
    <h2 className={color=="green"?'green_headline':color=="blue"?'blue_headline':'orange_headline'}>{course.headline}</h2>
    <Link className='linkCourseCard' to={`/course/${course.id}`}>
      <div className='course_card'>
    <img className='img_vector' src={color=="green"?Green_vector:color=="blue"?Blue_vector:Orange_vector}/>
    <div className='card_content'>
    <div className='total_videos'>
    {isLoading?<div className='loader' style={{width:'20px',height:'20px',marginTop:'0px'}}></div>:<></>} 
        <img src={Video_logo} />
        <h5 className='total_videos_text'>{videos && videos['chapters'].length+" videos"}</h5>
        
    </div>   
    <img className='total_videos_sign' src={videos && completedVideo==videos['chapters'].length?Stroke:""} />
    <h5 className='description'>{course.description}</h5>
    <Row>
        <Col md={9}>
         <Row>
             {course.summary.map((point,index)=>{
                return(
                    <Col className='summary' key={index} md={6}>
                        <img className='point' src={color=="green"?Green_ellipse:color=="blue"?Blue_ellipse:Orange_ellipse}/>
                        {point}
                        </Col>
                )
            })}
        </Row>
        </Col>
         <Col md={3}>
            <Link className='courseCardArrow'  to={`/course/${course.id}`}><img src={Arrow} /></Link>
         </Col>  
        </Row>    
       </div>
      </div>
     </Link>
    </div>
  )
}
