import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_page from './components/home_page/Home_page';
import Course_page from './components/course_page/Course_page';



function App() {
const [data, setData] = useState([]);
const [course, setCourse] = useState([]);
const [isLoading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    const result = await axios('/list', {
      auth: {
        username: "bigvu",
        password: "interview"
      }
    });
    // console.log(result.data)
    setData(result.data.result);
    setLoading(false)
  };
  fetchData();
  
}, []);



  return (
    <BrowserRouter>
    <Routes>
          <Route path="/"  element={ isLoading?<div className='loader'></div>:<Home_page data={data} course={course}></Home_page>}/>
           
          <Route path="/course/:id" element={ <Course_page />} />
      
    </Routes>
</BrowserRouter>
  );
  
}

export default App;
