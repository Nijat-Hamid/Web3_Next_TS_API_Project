import useSWR from 'swr';

interface Coins {
  [key: string]: number;
}

interface CoinData {
  coins: Coins;
}

const fetcher = async (url: string): Promise<CoinData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

const Daily = () => {
  const { data, error } = useSWR<CoinData>(
    'https://coins.llama.fi/percentage/ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    fetcher
  );

  if (error) {
    return null;
  }
  if (!data) {
    return null;
  }
  
  return (
    <tr>
      <td>Daily Perchantage:</td>
      <td style={{ textAlign: "right" }}>
        {data?.coins["ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"].toFixed(4)}%
      </td>
    </tr>
  );
};

export default Daily;
