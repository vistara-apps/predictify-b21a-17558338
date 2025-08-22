
export interface Market {
  market_id: string;
  event_name: string;
  outcomes: string[];
  payout_structure: Record<string, number>;
  status: 'active' | 'resolved' | 'pending';
  creator_address: string;
  created_at: string;
  settlement_data_hash?: string;
  total_pool?: number;
  end_date: string;
}

export interface Bet {
  bet_id: string;
  market_id: string;
  user_address: string;
  predicted_outcome: string;
  amount: number;
  created_at: string;
  tx_hash?: string;
}

export interface User {
  user_address: string;
  username?: string;
  farcaster_id?: string;
}

export type MarketStatus = 'active' | 'resolved' | 'pending';
export type BetOutcome = 'yes' | 'no';
