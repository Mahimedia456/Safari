import { supabaseAdmin } from "../../lib/supabase.js";

export async function getWallet(userId: string) {
  const [walletResult, transactionsResult] = await Promise.all([
    supabaseAdmin
      .from("wallet_accounts")
      .select("*")
      .eq("user_id", userId)
      .single(),

    supabaseAdmin
      .from("wallet_transactions")
      .select("*")
      .eq("wallet_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (walletResult.error)
    throw new Error(walletResult.error.message);

  if (transactionsResult.error)
    throw new Error(transactionsResult.error.message);

  return {
    wallet: walletResult.data,
    transactions: transactionsResult.data,
  };
}

export async function topupDemoWallet(
  userId: string,
  amount: number,
) {
  const { data: wallet, error: walletError } = await supabaseAdmin
    .from("wallet_accounts")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (walletError)
    throw new Error(walletError.message);

  const newBalance =
    Number(wallet.available_balance) + amount;

  const now = new Date().toISOString();

  const { data: updatedWallet, error: updateError } =
    await supabaseAdmin
      .from("wallet_accounts")
      .update({
        available_balance: newBalance,
        updated_at: now,
      })
      .eq("user_id", userId)
      .select("*")
      .single();

  if (updateError)
    throw new Error(updateError.message);

  const { data: transaction, error: transactionError } =
    await supabaseAdmin
      .from("wallet_transactions")
      .insert({
        wallet_user_id: userId,
        transaction_type: "credit",
        source_type: "topup",
        amount,
        currency_code: wallet.currency_code,
        status: "completed",
        description: "Safari demo wallet top-up.",
        balance_after: newBalance,
      })
      .select("*")
      .single();

  if (transactionError)
    throw new Error(transactionError.message);

  return {
    wallet: updatedWallet,
    transaction,
  };
}
