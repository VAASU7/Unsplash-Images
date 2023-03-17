import React,{useState,useEffect} from 'react';
import  {Heading}  from './components/Heading';
import  {Loding}  from './components/Loding';
import  {Unsplash}  from './components/Unsplash';
import './App.css'

import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body{
    font-family:sans-serif;
  }
`;

const WrapperImage = styled.section`
  max-width:70rem;
  margin:4rem auto;
  display:grid;
  grid-gap:1rem;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  grid-auto-rows:300px;

`;


function App  ()  {
  const [images, setImages] = useState([]);
  

  useEffect(() =>{
    fetchImages();
    
  },[])

  const fetchImages = () => {
    const accesskey = process.env.REACT_APP_ACCESSKEY;


    axios 
      .get(`https://api.unsplash.com/photos/random?client_id=${accesskey}&count=100`)
      .then(res => setImages([...images, ...res.data]))



  }


  return (
    <div>
      <Heading/>
      
      <GlobalStyle/>
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
          loader={<Loding />}
        >
        <WrapperImage>
        {images.map(image => (
          <Unsplash url={image.urls.thumb} key={image.id} />
        ))}
        </WrapperImage>
      </InfiniteScroll>
      
      
      
    </div>
  );
}

export default App
