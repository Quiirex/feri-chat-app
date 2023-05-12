import './Home.scss';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import { Layout } from '../layout/Layout';

import React, { useRef, useEffect, useState } from 'react';

const Home = () => {
  const homeRef = useRef(null);
  const containerRef = useRef(null);
  const [widthDifference, setWidthDifference] = useState(0);

  useEffect(() => {
    containerRef.current.style.width = '100%'; // Set the container ref to 100% when the component mounts
  }, []);

  useEffect(() => {
    const homeWidth = homeRef.current.getBoundingClientRect().width;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const difference = homeWidth - containerWidth;
    setWidthDifference(difference);

    const handleResize = () => {
      const homeWidth = homeRef.current.getBoundingClientRect().width;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const newDifference = homeWidth - containerWidth;
      setWidthDifference(newDifference);

      const newContainerWidth = containerWidth + newDifference;
      containerRef.current.style.width = `${newContainerWidth}px`;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <div className="home" ref={homeRef}>
        <div className="container1" ref={containerRef}>
          <Sidebar />
          <Chat />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
