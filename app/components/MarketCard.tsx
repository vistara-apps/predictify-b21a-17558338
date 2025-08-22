
"use client";

import { Market } from "../types";
import { useState } from "react";

interface MarketCardProps {
  market: Market;
  variant?: 'active' | 'resolved';
  onBet?: (marketId: string, outcome: string, amount: number) => void;
}

export default function MarketCard({ market, variant = 'active', onBet }: MarketCardProps) {
  const [betAmount, setBetAmount] = useState(10);
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');

  const handleBet = (outcome: string) => {
    if (onBet && betAmount > 0) {
      onBet(market.market_id, outcome, betAmount);
    }
  };

  const isResolved = variant === 'resolved';
  const cardClass = isResolved 
    ? "card opacity-75 border-muted/20" 
    : "card border-primary/20 hover:border-primary/40 transition-all duration-200";

  return (
    <div className={`${cardClass} animate-fade-in`}>
      <div className="flex justify-between items-start mb-md">
        <h3 className="font-display text-lg text-foreground">{market.event_name}</h3>
        <span className={`px-md py-sm rounded-md text-sm font-medium ${
          isResolved 
            ? 'bg-muted/20 text-muted' 
            : 'bg-accent/20 text-accent'
        }`}>
          {market.status.toUpperCase()}
        </span>
      </div>
      
      <div className="text-muted text-sm mb-lg">
        Pool: ${market.total_pool || 0} • Ends: {new Date(market.end_date).toLocaleDateString()}
      </div>

      {!isResolved && (
        <div className="space-y-md">
          <div className="flex gap-md">
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="input-field flex-1"
              placeholder="Bet amount"
              min="1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-md">
            {market.outcomes.map((outcome) => (
              <button
                key={outcome}
                onClick={() => handleBet(outcome)}
                className={`btn-primary ${
                  outcome.toLowerCase() === 'yes' 
                    ? 'bg-accent hover:bg-accent/90' 
                    : 'bg-primary hover:bg-primary/90'
                } transition-all duration-200 hover:scale-105`}
              >
                Bet {outcome} (${betAmount})
              </button>
            ))}
          </div>
        </div>
      )}

      {isResolved && (
        <div className="bg-surface/50 rounded-md p-md">
          <div className="text-sm text-muted">
            Resolved: {market.settlement_data_hash ? 'Verified' : 'Pending verification'}
          </div>
        </div>
      )}
    </div>
  );
}
