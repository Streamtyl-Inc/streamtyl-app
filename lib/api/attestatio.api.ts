import axios from "axios";
import { decodeAbiParameters } from "viem";

export const getAttestation=async(endpoint: string, options: any) =>{
    try{
        const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
        const res = await axios.request({
            url,
            headers: {
            "Content-Type": "application/json; charset=UTF-8",
            },
            ...options,
        });
        if (res.status !== 200) {
            throw new Error(JSON.stringify(res));
        }
     return res.data;
       }catch(e){

       }
}


function findAttestation(message: string, attestations: any[]) {
    // Iterate through the list of attestations
    for (const att of attestations) {
      if (!att.data) continue;
  
      let parsedData: any = {};
      
      // Parse the data.
      if (att.mode === "onchain") {
        // Looking for nested items in the on-chain schema
        try {
          const data = decodeAbiParameters(
            [att.dataLocation === "onchain" ? { components: att.schema.data, type: "tuple" } : { type: "string" }],
            att.data
          );
          parsedData = data[0];
        } catch (error) {
          // Looking for a regular schema format if the nested parse fails
          try {
            const data = decodeAbiParameters(att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],att.data );
            const obj: any = {};
            data.forEach((item: any, i: number) => {
              obj[att.schema.data[i].name] = item;
            });
            parsedData = obj;
          } catch (error) {
            continue;
          }
        }
      } else {
        // Try parsing as a string (off-chain attestation)
        try {
          parsedData = JSON.parse(att.data);
        } catch (error) {
          console.log(error);
          continue;
        }
      }
      
      // Return the correct attestation and its parsed data.
      if(parsedData?.contractDetails === message) {
        return { parsedData, attestation: att };
      }
    }
    
    // Did not find the attestation we are looking for.
    return undefined;
  }
  