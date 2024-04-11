import styled from 'styled-components';
import usePrice from './hooks/usePrice';

const Container = styled.div`
height: 100vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: #E8EDFA;

@media (max-width: 1000px) {
  flex-direction: column;
}
`;

const ItemContainer = styled.div`
width: 360px;
height: 200px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media (max-width: 1000px) {
  margin-top: 100px;
}
`;

const ItemTitle = styled.h2`
font-size: 48px;
`;

const PriceText = styled.p`
font-size: 48px;
`;

function App() {
  const [btcPrice, btcPrevPrice] = usePrice('wss://stream.binance.com:9443/ws/btcusdt@trade');
  const [ethPrice, ethPrevPrice] = usePrice('wss://stream.binance.com:9443/ws/ethusdt@trade');

  const getColor = (currentPrice, prevPrice) => {
    if (!prevPrice || currentPrice === prevPrice) return 'black'; // Initial or No changes
    return currentPrice > prevPrice ? 'green' : 'red';
  };

  return (
    <Container>
      <ItemContainer>
        <ItemTitle>{`BTC / USDT`}</ItemTitle>
        <PriceText style={{ color: getColor(btcPrice, btcPrevPrice) }}>{btcPrice}</PriceText>
      </ItemContainer>
      <ItemContainer>
        <ItemTitle>{`ETH / USDT`}</ItemTitle>
        <PriceText style={{ color: getColor(ethPrice, ethPrevPrice) }}>{ethPrice}</PriceText>
      </ItemContainer>
    </Container>
  );
}

export default App;
