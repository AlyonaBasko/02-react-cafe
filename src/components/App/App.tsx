import { useState } from 'react';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import { type Votes, type VoteType } from '../../types/votes';

// Прямий експорт функціонального компонента App
export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes === 0 ? 0 : Math.round((votes.good / totalVotes) * 100);
  // canReset має використовувати обчислене значення, а не просто true
  const canReset = totalVotes > 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      {/* Залишаємо лише один VoteOptions, використовуючи обчислене canReset */}
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset}
      />
      <VoteStats
        votes={votes}
        totalVotes={totalVotes}
        positiveRate={positiveRate}
      />
    </div>
  );
}