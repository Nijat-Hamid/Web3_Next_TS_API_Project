import { Prices } from "@/pages";
import { NextPage } from "next";

const Asset: NextPage<Prices> = ({coins}) => {
  return (
    <tr>
      <td>Price:</td>
      <td style={{ textAlign: "right" }}>
        {coins["ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"].price +"$"}
      </td>
    </tr>
  );
};

export default Asset;
