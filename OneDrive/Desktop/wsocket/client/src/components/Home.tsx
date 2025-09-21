import React, { useEffect, useState } from 'react';
import { element } from './../../../server/node_modules/effect/dist/esm/Schema';
import Card from './Card';

const Home = () => {
    const [data, setData] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:7000');
    // console.log(ws);
    ws.onopen = () => {
      console.log('CLIENT IS CONNECTED');
      ws.send(
        JSON.stringify({
          type: 'getAll',
        })
      );
    };

    ws.onerror = (error) => {
      console.error(error);
    };
    ws.onmessage = (fdata) => {
      // console.log(fdata.data);
      const football = JSON.parse(fdata.data);
      // console.log(football);
       setData(JSON.parse(football.data))

    };
  }, []);
  console.log(data.data)
  return (<div style={{display:'grid' , rowGap:'1rem'}}>{data && data?.map(item => <Card {...item} />)}</div>);
};

export default Home;
