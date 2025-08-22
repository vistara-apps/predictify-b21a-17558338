
"use client";

import { useState } from "react";
import { Market } from "../types";

interface CreateMarketFormProps {
  onCreateMarket: (market: Omit<Market, 'market_id' | 'created_at' | 'status'>) => void;
  onCancel: () => void;
}

export default function CreateMarketForm({ onCreateMarket, onCancel }: CreateMarketFormProps) {
  const [eventName, setEventName] = useState('');
  const [outcomes, setOutcomes] = useState(['Yes', 'No']);
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !endDate) return;

    setIsLoading(true);
    
    try {
      const marketData = {
        event_name: eventName,
        outcomes,
        payout_structure: outcomes.reduce((acc, outcome) => ({ ...acc, [outcome]: 1 }), {}),
        creator_address: '0x123...', // This would come from wallet connection
        end_date: endDate,
        total_pool: 0,
      };

      onCreateMarket(marketData);
    } catch (error) {
      console.error('Error creating market:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-lg">
        <div>
          <h2 className="font-display text-xl mb-md">Create Prediction Market</h2>
          <p className="text-muted text-sm">Define your event and let others predict the outcome</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-sm">Event Question</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="input-field w-full"
            placeholder="e.g., Will BTC reach $100k by end of 2024?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-sm">End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-sm">Outcomes</label>
          <div className="grid grid-cols-2 gap-md">
            {outcomes.map((outcome, index) => (
              <input
                key={index}
                type="text"
                value={outcome}
                onChange={(e) => {
                  const newOutcomes = [...outcomes];
                  newOutcomes[index] = e.target.value;
                  setOutcomes(newOutcomes);
                }}
                className="input-field"
                placeholder={`Outcome ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-md">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !eventName || !endDate}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Market'}
          </button>
        </div>
      </form>
    </div>
  );
}
