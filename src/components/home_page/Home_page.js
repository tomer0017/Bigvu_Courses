import React, { useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Course_card from './Course_card';
import { useParams } from "react-router-dom";
export default function Home_page({data}) {

  return (
   <Container>
        <Row>
        <Col md={5}>
          <h1 className='pages'>BIGVU 101  Crash Course</h1>
          <p className='preface'>Zero editing experience to pro — your  journey starts here. 
         Watch step-by-step video lessons how to make videos with impact.</p>
          </Col>  
        
        </Row>
        
        <Row>
        {  data.map((item,index)=>{
          const color=5%(index+1)==2?"blue":5%(index+1)==1?"green":"orange"
          return( 
          <Col key={item.id} lg={4} md={6} sm={10} xs={10} >
            <Course_card courseIndex={index} color={color} course={item} />
          </Col>
         
          )
          })}
      </Row>
      </Container>
  )
}
