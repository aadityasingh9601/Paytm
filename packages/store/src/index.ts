import { create } from "zustand";

const useStore = create((set) => ({
  p2pTxns: [],

  setP2P: (txnData: any) => {
    set({ p2pTxns: txnData });
  },

  updateP2P: (newTxn: any) => {
    console.log(newTxn);
    console.log("triggered");
    set((state: any) => ({
      p2pTxns: [newTxn, ...state.p2pTxns],
    }));
  },
}));

export { useStore };
