import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Radio } from "@mantine/core";
import { NextPage } from "next";
import { hTvl } from "@/pages";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const Hapy: NextPage<hTvl> = ({ data }) => {
  const [value, setValue] = useState("365");
  const series = [
    {
      name: "APY",
      data:
        value === "365"
          ? data.map((tvl) => tvl.apy)
          : value === "180"
          ? data.slice(data.length - 180, data.length).map((tvl) => tvl.apy)
          : value === "90"
          ? data.slice(data.length - 90, data.length).map((tvl) => tvl.apy)
          : value === "30"
          ? data.slice(data.length - 30, data.length).map((tvl) => tvl.apy)
          : value === "7"
          ? data.slice(data.length - 7, data.length).map((tvl) => tvl.apy)
          : [],
    },
  ];

  const options = {
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return value.toFixed(1) + "%";
        },
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      type: "category" as "category",
    },
    dataLabels: {
      enabled: false,
    },
    labels: value === "365"
    ? data.map((tvl) => tvl.timestamp)
    : value === "180"
    ? data.slice(data.length - 180, data.length).map((tvl) => tvl.timestamp)
    : value === "90"
    ? data.slice(data.length - 90, data.length).map((tvl) => tvl.timestamp)
    : value === "30"
    ? data.slice(data.length - 30, data.length).map((tvl) => tvl.timestamp)
    : value === "7"
    ? data.slice(data.length - 7, data.length).map((tvl) => tvl.timestamp)
    : [],
    title: {
      text: "Historical APY of pool",
      align: "center" as "center",
    },
    chart: {
      background: "#343E59",
      foreColor: "#fff",
      fontFamily: "Roboto",
      toolbar: {
        show: true,
      },
      theme: {
        mode: "dark",
        palette: "palette4",
      },
    },
  };
  return (
    <div style={{ margin: "20px auto", width: "800px", background: "#343E59" }}>
      <Radio.Group
        value={value}
        onChange={setValue}
        name="favoriteFramework"
        display="flex"
        size="xs"
        sx={{ padding: " 20px 10px" }}
      >
        <Radio
          value="365"
          sx={{ label: { color: "#fff", paddingRight: "10px" } }}
          label="365 Days"
        />
        <Radio
          value="180"
          sx={{ label: { color: "#fff", paddingRight: "10px" } }}
          label="180 Days"
        />
        <Radio
          value="90"
          sx={{ label: { color: "#fff", paddingRight: "10px" } }}
          label="90 Days"
        />
        <Radio
          value="30"
          sx={{ label: { color: "#fff", paddingRight: "10px" } }}
          label="30 days"
        />
        <Radio
          value="7"
          sx={{ label: { color: "#fff", paddingRight: "10px" } }}
          label="7 days"
        />
      </Radio.Group>
      <Chart options={options} series={series} type="area" width="100%" />
    </div>
  );
};

export default Hapy;
