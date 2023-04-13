import {Pools,YieldsTypes,hTvl,InnerTvl} from "@/pages";
import { NextPage } from "next";
interface Props{
  data:YieldsTypes[];
  dataO:hTvl
}
const ApyApr:NextPage<Props> = ({data,dataO}) => {
  const weth = data.filter((filter:YieldsTypes)=> filter.chain ==="Ethereum" && filter.project ==="aave-v2" && filter.symbol ==="WETH")
  const sevenDaysApy=(dataO.data.slice(dataO.data.length - 7, dataO.data.length).map((item)=> item.apy).reduce((acc,amount) =>acc+amount)/7).toFixed(2)+"%"
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
        <td style={{ textAlign: "right" }}>{(weth[0].apyMean30d)?.toFixed(2)+"%"}</td>
      </tr>
      <tr>
        <td>7 Day Average apy:</td>
        <td style={{ textAlign: "right" }}>{sevenDaysApy}</td>
      </tr>
      <tr>
        <td>Current TVL:</td>
        <td style={{ textAlign: "right" }}>{Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(weth[0].tvlUsd)}</td>
      </tr>
    </>
  );
};

export default ApyApr;
