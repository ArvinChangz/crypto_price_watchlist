import { render, screen } from '@testing-library/react';
import App from './App';

test('render Title', () => {
  render(<App />);
  // 查找包含"BTC / USDT"的元素
  const btcUsdtAnchorNode = screen.getByText(/BTC \/ USDT/i);
  // 查找包含"ETH / USDT"的元素
  const ethUsdtAnchorNode = screen.getByText(/ETH \/ USDT/i);
  expect(btcUsdtAnchorNode).toBeInTheDocument();
  expect(ethUsdtAnchorNode).toBeInTheDocument();
});
