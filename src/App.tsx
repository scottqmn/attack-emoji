import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import { HealthBar } from './components/HealthBar';
import { HitEmoji } from './components/HitEmoji';
import { TargetEmoji } from './components/TargetEmoji';
import { addVariance } from './lib/addVariance';
import { HitData, HitDataTypes } from './types/hit';

const HEAL_DELAY = 1000;
const TOTAL_HEALTH = 100;
const ADDITIONAL_THRESHOLD = 150;
const VARIANCE = 25;

function App() {
  const [hits, setHits] = useState<HitData[]>([]);
  const [prevHit, setPrevHit] = useState<HitData | undefined>(undefined);
  const [hitInterval, setHitInterval] = useState<number>(0);
  const [health, setHealth] = useState(TOTAL_HEALTH);

  const decreaseHealth = (num: number) => {
    setHealth((curr) => curr - num);
  };

  const reset = useCallback(
    debounce(() => {
      setHits([]);
      setPrevHit(undefined);
      setHitInterval(0);
      setHealth(TOTAL_HEALTH);
    }, HEAL_DELAY),
    [setHits, setPrevHit, setHitInterval, setHealth]
  );

  const registerHit: React.PointerEventHandler = (e) => {
    const hitIndex = hits.length;
    const timestamp = new Date().getTime();
    const type =
      hitIndex > 0 && hitIndex % 3 === 0
        ? HitDataTypes.Kick
        : HitDataTypes.Punch;
    const nextHit: HitData = {
      x: addVariance(e.clientX, VARIANCE),
      y: addVariance(e.clientY, VARIANCE),
      timestamp,
      type,
    };

    if (prevHit) {
      setHitInterval(nextHit.timestamp - prevHit.timestamp);
    }
    setHits((curr) => [...(curr ?? []), nextHit]);
    setPrevHit(nextHit);
    decreaseHealth(5);
    reset();
  };

  const registerAdditional: React.PointerEventHandler = () => {
    if (prevHit && hitInterval && hitInterval < ADDITIONAL_THRESHOLD) {
      const { x, y } = prevHit;
      const timestamp = new Date().getTime();
      const nextHit = {
        x,
        y,
        timestamp,
        type: HitDataTypes.Bang,
      };
      setHits((curr) => [...(curr ?? []), nextHit]);
      decreaseHealth(3.5);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="mx-auto w-fit"
        onPointerDown={registerHit}
        onPointerUp={registerAdditional}
      >
        <HealthBar health={health} totalHealth={TOTAL_HEALTH} />
        <TargetEmoji
          key={hits.length}
          health={health}
          damaged={hits.length > 0}
        />
        {hits.map((hitData) => (
          <HitEmoji key={hitData.timestamp} data={hitData} />
        ))}
      </div>
    </AnimatePresence>
  );
}

export default App;
