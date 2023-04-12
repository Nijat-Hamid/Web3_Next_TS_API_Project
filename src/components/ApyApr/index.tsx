import {Pools,YieldsTypes} from "@/pages";
import { NextPage } from "next";
const ApyApr:NextPage<Pools> = ({data}) => {
  const weth = data.filter((filter:YieldsTypes)=> filter.chain ==="Ethereum" && filter.project ==="aave-v2" && filter.symbol ==="WETH")
  const thirtyDayAPY=Number((weth[0].apyMean30d)?.toFixed(2))
  const sevenDayApy = weth[0].apyMean30d !== null ? (Math.pow(1 + weth[0].apyMean30d / 100, 7/30) - 1).toFixed(3) +'%' :'null'
  return (
    <>
      <tr>
        <td>apyBase:</td>
        <td style={{ textAlign: "right" }}>{(weth[0].apyBase).toFixed(2)}%</td>
      </tr>
      <tr>
        <td>apyReward:</td>
        <td style={{ textAlign: "right" }}>{weth[0].apyReward===null? "null" : weth[0].apyReward + "%" }</td>
      </tr>
      <tr>
        <td>apy:</td>
        <td style={{ textAlign: "right" }}>{(weth[0].apy).toFixed(2)}%</td>
      </tr>
      <tr>
        <td>30 Day Average apy:</td>
        <td style={{ textAlign: "right" }}>{(weth[0].apyMean30d)+"%"}</td>
      </tr>
      <tr>
        <td>7 Day Average apy:</td>
        <td style={{ textAlign: "right" }}>{sevenDayApy}</td>
      </tr>
      <tr>
        <td>Current TVL:</td>
        <td style={{ textAlign: "right" }}>{weth[0].tvlUsd + '$'}</td>
      </tr>
    </>
  );
};

export default ApyApr;
