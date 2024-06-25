import { useState } from "react";

// interface Account {
//   bech32Address: string;
// }

interface ExecuteResult {
  // Define properties of the expected response from execute
  transactionHash?: string;
  // ... other properties
}
type BuyProductOptions = {
  accountData: any;
  seatContractAddress: string;
  client?: any; // Replace with the actual client type
};

const useBuyFunction = (options: BuyProductOptions) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  const [executeResult, setExecuteResult] = useState<ExecuteResult | undefined>(
    undefined
  );

  function getTimestampInSeconds(date: Date | null) {
    if (!date) return 0;
    const d = new Date(date);
    return Math.floor(d.getTime() / 1000);
  }

  const now = new Date();
  now.setSeconds(now.getSeconds() + 15);
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const blockExplorerUrl = `https://explorer.burnt.com/xion-testnet-1/tx/${executeResult?.transactionHash}`;

  const buyProduct = async () => {
    setLoading(true);
    const msg = {
      sales: {
        buy_item: {
          token_id: String(getTimestampInSeconds(now)),
          owner: options.accountData,
          token_uri: "",
          extension: {},
        },
      },
    };

    try {
      const buyRes = await options.client?.execute(
        options.accountData,
        options.seatContractAddress,
        msg,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
        },
        "",
        []
      );

      setExecuteResult(buyRes);
    } catch (error) {
      // eslint-disable-next-line no-console -- No UI exists yet to display errors
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, executeResult, buyProduct, errors, blockExplorerUrl };
};

export default useBuyFunction;
