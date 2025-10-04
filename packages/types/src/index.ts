export interface P2pTxnData {
  id: number;
  amount: number;
  timeStamp: Date;
  fromUserId: number;
  toUserId: number;
  fromUser: {
    id: number;
    name: string;
  };
  toUser: {
    id: number;
    name: string;
  };
}

export interface OnrampTxnData {
  time: Date;
  amount: number;
  status: "Failed" | "Processing" | "Success";
  provider: string;
}

export interface AccountData {
  email: string;
  phone: string;
  country?: string;
  name?: string;
  tpin?: string;
}
