"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";

type BurntWrapperProps = {};

export default function BurntWrapper({
  children,
}: React.PropsWithChildren<BurntWrapperProps>) {
  const seatContractAddress =
    "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";
  const mintyplexContractAddress = "xion1h6hrq6wlfrt53aafpt27uvvrmwqeqwrcuqdy4uzcdn4jqz2sqdcq8egzfu";

  return (
    <AbstraxionProvider config={{ contracts: [mintyplexContractAddress] }}>
      {children}
    </AbstraxionProvider>
  );
}


// xiond tx wasm store artifacts / mintyplex - contract.wasm--from mintyplex--gas - prices 0.1uxion--gas auto--gas - adjustment 1.3 - y--output json - b block