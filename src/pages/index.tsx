import Head from "next/head";
import { Container, Table } from "@mantine/core";
import { HeroText } from "@/components/Hero";
import ApyApr from "@/components/ApyApr";
import LiqRate from "@/components/Lrate";
import Asset from "@/components/TokenAsset";
import Daily from "@/components/TokenDaily";
import { GetServerSideProps } from "next";
import Htvl from "@/components/Htvl";
import Hapy from "@/components/Hapy";
export interface YieldsTypes {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number | null;
  apy: number;
  rewardTokens: string[] | null;
  pool: string;
  apyPct1D: number | null;
  apyPct7D: number | null;
  apyPct30D: number | null;
  stablecoin: boolean;
  ilRisk: string;
  exposure: string;
  predictions: {
    predictedClass: string;
    predictedProbability: number;
    binnedConfidence: number;
  };
  poolMeta: string | null;
  mu: number;
  sigma: number;
  count: number;
  outlier: boolean;
  underlyingTokens: string[];
  il7d: number | null;
  apyBase7d: number | null;
  apyMean30d: number | null;
  volumeUsd1d: number | null;
  volumeUsd7d: number | null;
  apyBaseInception: number | null;
}
export interface Pools{
  data: YieldsTypes[];
}
export interface Prices {
  coins: {
    [key: string]: {
      decimals: number;
      symbol: string;
      price: number;
      timestamp: number;
      confidence: number;
    };
  };
}
export interface Token {
  id: string;
  symbol: string;
  decimals: number;
  totalLiquidity: number;
  liquidityRate: string;
  variableBorrowRate: number;
  stableBorrowRate: number;
  stableBorrowRateEnabled: boolean;
  availableLiquidity: number;
  lastUpdateTimestamp: number;
  liquidityIndex: string;
  variableBorrowIndex: string;
  lifetimeFlashLoans: string;
  lifetimeLiquidated: string;
  underlyingAsset: string;
  isActive: boolean;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  baseLTVasCollateral: number;
  name: string;
  reserveLiquidationThreshold: number;
  reserveLiquidationBonus: number;
  utilizationRate: number;
  optimalUtilisationRate: string;
  reserveInterestRateStrategy: string;
  baseVariableBorrowRate: string;
  stableRateSlope1: string;
  stableRateSlope2: string;
  variableRateSlope1: string;
  variableRateSlope2: string;
  isFrozen: boolean;
  reserveFactor: string;
  stableDebtLastUpdateTimestamp: number;
  averageStableRate: string;
  totalPrincipalStableDebt: string;
  totalScaledVariableDebt: string;
  lifetimeFlashLoanPremium: string;
  lifetimeReserveFactorAccrued: string;
  lifetimeDepositorsInterestEarned: string;
  aToken: {
    id: string;
  };
  vToken: {
    id: string;
  };
  sToken: {
    id: string;
  };
  price: {
    id: string;
    priceInEth: string;
  };
  pool: {
    id: string;
  };
  aEmissionPerSecond: string;
  vEmissionPerSecond: string;
  sEmissionPerSecond: string;
  aTokenIncentivesIndex: string;
  vTokenIncentivesIndex: string;
  sTokenIncentivesIndex: string;
  aIncentivesLastUpdateTimestamp: number;
  vIncentivesLastUpdateTimestamp: number;
  sIncentivesLastUpdateTimestamp: number;
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
  totalVariableDebt: string;
  totalStableDebt: string;
  aIncentivesAPY: string;
  vIncentivesAPY: string;
  sIncentivesAPY: string;
  totalDebt: number;
  avg30DaysVariableBorrowRate: string;
}
export interface TokensResponse {
  liqid: Token[];
}
export interface InnerTvl{
  timestamp:string;
  tvlUsd:number;
  apy:number;
  apyBase:number;
  apyReward:null | number
}
export interface hTvl{
  data:InnerTvl[]
}
interface holdCount{
  holdersCount:number
}
export interface topTenHolder{
    holders:[{
      adress:string
      share:number
      balance:number
    }]
}
interface topFiveHolders{
    holders:[{
      adress:string
      share:number
      balance:number
    }]
}
interface Props {
  pools: Pools;
  price: Prices;
  liqid: Token[];
  hTvl: hTvl;
  holdCount:holdCount;
  topTenHolder:topTenHolder;
  topFiveHolder:topFiveHolders;
  
}
const Home = ({ price, pools, liqid, hTvl,holdCount,topTenHolder,topFiveHolder }: Props) => {
  return (
    <>
      <Head>
        <title>Remox Task</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="xl">
        <HeroText />
        <Table maw={800} mb={60} striped withBorder m="0 auto">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ textAlign: "right" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <Asset coins={price.coins} />
            <Daily />
            <LiqRate holders={topTenHolder.holders} topFiveHolder={topFiveHolder}  holdersCount={holdCount.holdersCount} coins={price.coins} liqid={liqid}/>
            <ApyApr data={pools.data}/>
          </tbody>
        </Table>
        <Htvl data={hTvl.data}/>
        <Hapy data={hTvl.data}/>
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [poolRes, priceRes, liqidRes, hTvlRes,holdCountRes,topTenHolderRes,topFiveHolderRes] = await Promise.all([
    fetch("https://yields.llama.fi/pools"),
    fetch(
      "https://coins.llama.fi/prices/current/ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2?searchWidth=4h"
    ),
    fetch(
      "https://aave-api-v2.aave.com/data/liquidity/v2?poolId=0xb53c1a33016b2dc2ff3653530bff1848a515c8c5"
    ),
    fetch("https://yields.llama.fi/chart/f2726d05-1f8d-4b9c-80e3-43d03d85d117"),
    fetch("https://api.ethplorer.io/getTokenInfo/0x030bA81f1c18d280636F32af80b9AAd02Cf0854e?apiKey=freekey"),
    fetch("https://api.ethplorer.io/getTopTokenHolders/0x030bA81f1c18d280636F32af80b9AAd02Cf0854e?apiKey=freekey"),
    fetch("https://api.ethplorer.io/getTopTokenHolders/0x030bA81f1c18d280636F32af80b9AAd02Cf0854e?apiKey=freekey&limit=30")
  ]);
  const [pools, price, liqid, hTvl,holdCount,topTenHolder,topFiveHolder] = await Promise.all([
    poolRes.json(),
    priceRes.json(),
    liqidRes.json(),
    hTvlRes.json(),
    holdCountRes.json(),
    topTenHolderRes.json(),
    topFiveHolderRes.json()
  ]);

  return { props: { pools, price, liqid, hTvl, holdCount,topTenHolder,topFiveHolder } };
};
export default Home;
