import dynamic from "next/dynamic";
import { NextPage } from "next";
import { hTvl} from "@/pages";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const Htvl:NextPage<hTvl> = ({data}) => {
    const series = [ 
     {
        name: "TVL (USD)",
        data: data.map((tvl)=> tvl.tvlUsd),
      },
    ]
    
  const options = { 
    yaxis:{
        labels:{
            formatter:function(value: any){
                return Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(value) 
            }
        }
    },
    xaxis:{
        labels:{show:false},
        axisTicks:{show:false},
        axisBorder:{show:false},
        type:"category" as "category"
      },
    dataLabels:{
        enabled:false
    },  
    labels:data.map((tvl)=> tvl.timestamp) ,
    title: {
        text: 'Historical TVL of pool',
        align: 'center' as "center"
      },
    chart:{
        background:"#343E59",
        foreColor:"#fff",
        fontFamily:"Roboto",
        toolbar:{
            show:true
        },
        theme:{
            mode:"dark",
            palette:"palette4"
        }
    }
  };
  return (
    <div  style={{margin:"20px auto",width:"800px"}}>
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
      />
    </div>
  );
};

export default Htvl;

