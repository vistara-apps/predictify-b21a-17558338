
"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useState, useCallback } from "react";
import WalletConnectButton from "./components/WalletConnectButton";
import MarketCard from "./components/MarketCard";
import CreateMarketForm from "./components/CreateMarketForm";
import OracleStatusIndicator from "./components/OracleStatusIndicator";
import { Market } from "./types";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [activeTab, setActiveTab] = useState<'markets' | 'my-bets'>('markets');

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Sample markets data
  useEffect(() => {
    setMarkets([
      {
        market_id: '1',
        event_name: 'Will BTC reach $100k by end of 2024?',
        outcomes: ['Yes', 'No'],
        payout_structure: { 'Yes': 1.8, 'No': 2.2 },
        status: 'active',
        creator_address: '0x123...',
        created_at: new Date().toISOString(),
        total_pool: 1250,
        end_date: '2024-12-31T23:59:59Z'
      },
      {
        market_id: '2', 
        event_name: 'Will ETH 2.0 staking reach 50M ETH?',
        outcomes: ['Yes', 'No'],
        payout_structure: { 'Yes': 1.5, 'No': 2.5 },
        status: 'active',
        creator_address: '0x456...',
        created_at: new Date().toISOString(),
        total_pool: 890,
        end_date: '2024-06-30T23:59:59Z'
      }
    ]);
  }, []);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleCreateMarket = useCallback((marketData: Omit<Market, 'market_id' | 'created_at' | 'status'>) => {
    const newMarket: Market = {
      ...marketData,
      market_id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: 'active'
    };
    
    setMarkets(prev => [newMarket, ...prev]);
    setShowCreateForm(false);
  }, []);

  const handleBet = useCallback((marketId: string, outcome: string, amount: number) => {
    // In a real app, this would interact with smart contracts
    console.log(`Betting ${amount} on ${outcome} for market ${marketId}`);
    
    // Update the market pool
    setMarkets(prev => prev.map(market => 
      market.market_id === marketId 
        ? { ...market, total_pool: (market.total_pool || 0) + amount }
        : market
    ));
  }, []);

  const saveFrameButton = useCallback(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="btn-secondary text-sm"
        >
          + Save App
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center gap-sm text-sm text-accent animate-fade-out">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="grid-container py-lg">
          <CreateMarketForm
            onCreateMarket={handleCreateMarket}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="grid-container">
        {/* Header */}
        <header className="flex justify-between items-center py-lg">
          <div>
            <h1 className="font-display text-display text-foreground">Predictify</h1>
            <p className="text-muted text-sm">Crowd wisdom prediction markets</p>
          </div>
          <div className="flex items-center gap-md">
            {saveFrameButton()}
            <WalletConnectButton />
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex gap-md mb-lg">
          <button
            onClick={() => setActiveTab('markets')}
            className={`px-lg py-md rounded-md transition-colors ${
              activeTab === 'markets' 
                ? 'bg-primary text-white' 
                : 'bg-surface text-muted hover:text-foreground'
            }`}
          >
            Markets
          </button>
          <button
            onClick={() => setActiveTab('my-bets')}
            className={`px-lg py-md rounded-md transition-colors ${
              activeTab === 'my-bets' 
                ? 'bg-primary text-white' 
                : 'bg-surface text-muted hover:text-foreground'
            }`}
          >
            My Bets
          </button>
        </nav>

        {/* Create Market Button */}
        <div className="mb-lg">
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-accent w-full"
          >
            + Create Prediction Market
          </button>
        </div>

        {/* Oracle Status */}
        <div className="mb-lg">
          <OracleStatusIndicator status="verified" />
        </div>

        {/* Markets List */}
        <main className="space-y-lg pb-lg">
          {activeTab === 'markets' && (
            <div className="space-y-lg">
              {markets.length === 0 ? (
                <div className="card text-center py-xl">
                  <p className="text-muted">No markets available yet.</p>
                  <p className="text-sm text-muted mt-sm">Be the first to create one!</p>
                </div>
              ) : (
                markets.map((market) => (
                  <MarketCard
                    key={market.market_id}
                    market={market}
                    variant={market.status === 'resolved' ? 'resolved' : 'active'}
                    onBet={handleBet}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'my-bets' && (
            <div className="card text-center py-xl">
              <p className="text-muted">Connect your wallet to view your bets.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="py-lg text-center">
          <button
            onClick={() => openUrl("https://base.org/builders/minikit")}
            className="text-muted text-sm hover:text-foreground transition-colors"
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
