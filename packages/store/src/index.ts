import { create } from "zustand";
import { TxnData, AccountData } from "@repo/types/types";

interface AppState {
  p2pTxns: TxnData[];

  setP2P: (txnData: TxnData[]) => void;

  updateP2P: (newTxn: TxnData) => void;

  accountInfo: Partial<AccountData>; // ✅ All properties optional

  setAccountInfo: (accountData: AccountData) => void;

  updateAccount: (updatedInfo: AccountData) => void;
}

const useStore = create<AppState>((set) => ({
  p2pTxns: [],

  setP2P: (txnData) => {
    set({ p2pTxns: txnData });
  },

  updateP2P: (newTxn) => {
    console.log(newTxn);
    set((state) => ({
      p2pTxns: [newTxn, ...state.p2pTxns],
    }));
  },

  accountInfo: {},

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
