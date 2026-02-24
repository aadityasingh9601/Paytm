import { create } from "zustand";
import { P2pTxnData, AccountData } from "@repo/types/types";

interface AppState {
  p2pTxns: P2pTxnData[];

  setP2P: (txnData: P2pTxnData[]) => void;

  updateP2P: (newTxn: P2pTxnData) => void;

  accountInfo: AccountData; // ✅ All properties optional

  setAccountInfo: (accountData: AccountData) => void;

  updateAccount: (updatedInfo: AccountData) => void;
}

const useStore = create<AppState>((set) => ({
  p2pTxns: [],

  setP2P: (txnData) => {
    set({ p2pTxns: txnData });
  },

  updateP2P: (newTxn) => {
    set((state) => ({
      p2pTxns: [newTxn, ...state.p2pTxns],
    }));
  },

  accountInfo: { email: "", number: "", country: "", tpin: "", name: "" },

  setAccountInfo: (accountData) => {
    set({ accountInfo: accountData });
  },

  updateAccount: (updatedInfo) => {
    set((state) => ({
      accountInfo: { ...state.accountInfo, ...updatedInfo },
    }));
  },
}));

export { useStore };
