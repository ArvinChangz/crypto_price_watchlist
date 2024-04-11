import { useState, useEffect, useRef } from 'react';

const usePrice = (webSocketUrl: string) => {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const ws = useRef<WebSocket | null>(null);

  // Build Connection
  useEffect(() => {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onclose = () => console.log('WebSocket Disconnected');

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    }
  }, [webSocketUrl]);

  // Update Price
  useEffect(() => {
    if (!ws) return;

    ws.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setPrevPrice(price);
      setPrice(parseFloat(data.p));
    };


  }, [ws, price]);

  return [price, prevPrice];
};

export default usePrice