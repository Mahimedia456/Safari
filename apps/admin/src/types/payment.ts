export type AdminWallet = {
  user_id: string;
  currency_code: string;
  available_balance: number | string;
  pending_balance: number | string;
  status: string;
  updated_at: string;
};

export type AdminWalletTransaction = {
  id: string;
  wallet_user_id: string;
  transaction_type: string;
  source_type: string | null;
  amount: number | string;
  currency_code: string;
  status: string;
  description: string | null;
  created_at: string;
};
