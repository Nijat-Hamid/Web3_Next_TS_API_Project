import { Token,TokensResponse,Prices } from "@/pages";
import { NextPage } from "next";

interface Props{
  liqid: Token[];
  holdersCount:number;
    holders:[{
      adress:string
      share:number
      balance:number
    }]
    topFiveHolder:{
      holders:[{
        adress:string
        share:number
        balance:number
      }]
    }
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

const LiqRate: NextPage<Props> = ({ liqid,coins,holdersCount, holders, topFiveHolder }) =>  {
  const data= liqid.filter((filter:Token)=> filter.symbol ==="WETH")
  const price = coins["ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"].price
  const startDate = new Date("2017-12-12")
  const today = new Date();
  const diffInTime = today.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  // const totalShare=holders?.map((holder) => holder.share).reduce((acc,amount)=> acc+amount);
  // const totalFiveShare=topFiveHolder?.holders.map((holder)=> holder.share).reduce((acc,amount)=>acc+amount);
  return (
    <>
      <tr>
        <td>Deposited Amount(Token):</td>
        <td style={{ textAlign: "right" }}>{Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:3}).format(data?.[0].totalLiquidity) }</td>
      </tr>
      <tr>
        <td>Deposited Amount(USD):</td>
        <td style={{ textAlign: "right" }}>{Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:3}).format(data?.[0].totalLiquidity * price ) }</td>
      </tr>
      <tr>
        <td>Borrowed Amount:</td>
        <td style={{ textAlign: "right" }}>{Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(data?.[0].totalDebt) }</td>
      </tr>
      <tr>
        <td>Borrowed Amount(USD):</td>
        <td style={{ textAlign: "right" }}>{Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(data?.[0].totalDebt * price) }</td>
      </tr>
      <tr>
        <td>Liqudity:</td>
        <td style={{ textAlign: "right" }}>
          {Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(data?.[0].availableLiquidity) }
        </td>
      </tr>
      <tr>
        <td>Liqudity(USD):</td>
        <td style={{ textAlign: "right" }}>
          {Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(data?.[0].availableLiquidity * price) }
        </td>
      </tr>
      <tr>
        <td>Liquidation Threshold:</td>
        <td style={{ textAlign: "right" }}>
          {`${(data?.[0].reserveLiquidationThreshold * 100).toFixed(2)}%`}
        </td>
      </tr>
      <tr>
        <td>Liquidation Bonus:</td>
        <td style={{ textAlign: "right" }}>
          {`${(data?.[0].reserveLiquidationBonus * 100).toFixed(2)}%`}
        </td>
      </tr>
      <tr>
        <td>Utilization Rate:</td>
        <td style={{ textAlign: "right" }}>
          {`${(data?.[0].utilizationRate * 100).toFixed(2)}%`}
        </td>
      </tr>
      <tr>
        <td>Variable Borrow Rate:</td>
        <td style={{ textAlign: "right" }}>
          {`${(data?.[0].variableBorrowRate * 100).toFixed(2)}%`}
        </td>
      </tr>
      <tr>
        <td>Stable Borrow Rate:</td>
        <td style={{ textAlign: "right" }}>
          {`${(data?.[0].stableBorrowRate * 100).toFixed(2)}%`}
        </td>
      </tr>
      <tr>
        <td>Reserve Factor:</td>
        <td style={{ textAlign: "right" }}>{data?.[0].reserveFactor}</td>
      </tr>
      <tr>
        <td>Collateral asset:</td>
        <td style={{ textAlign: "right" }}>
          {(data?.[0].usageAsCollateralEnabled).toString()}
        </td>
      </tr>
      <tr>
        <td>LTV(Max Loan to value):</td>
        <td style={{ textAlign: "right" }}>
          {(data?.[0].baseLTVasCollateral * 100).toFixed(2) + "%"}
        </td>
      </tr>
      <tr>
        <td>Holders Count:</td>
        <td style={{ textAlign: "right" }}>
          Api limitation
        </td>
      </tr>
      <tr>
        <td>Collateral ratio(1/ LTV):</td>
        <td style={{ textAlign: "right" }}>
          {((1 / data?.[0].baseLTVasCollateral) * 100).toFixed(2) + "%"}
        </td>
      </tr>
      <tr>
        <td>Number of Days since the pool:</td>
        <td style={{ textAlign: "right" }}>
          {diffInDays+ " " + "Days"}
        </td>
      </tr>
      <tr>
        <td>Top 10 largest depositors share:</td>
        <td style={{ textAlign: "right" }}>
          Api limitation
        </td>
      </tr>
      <tr>
        <td>Top 0.5% of Total depositors share:</td>
        <td style={{ textAlign: "right" }}>
          Api Limiation
        </td>
      </tr>
    </>
  );
};

export default LiqRate;



 