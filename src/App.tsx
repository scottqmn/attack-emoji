import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { HealthBar } from "./components/HealthBar";
import { HitEmoji } from "./components/HitEmoji";
import { TargetEmoji } from "./components/TargetEmoji";
import { addVariance } from "./lib/addVariance";
import { HitData, HitDataTypes } from "./types/hit";

const Container = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const TargetArea = styled.div`
  position: relative;
`;

const HEAL_DELAY = 500;
const ADDITIONAL_THRESHOLD = 150;
const VARIANCE = 40;

function App() {
  const [hits, setHits] = useState<HitData[]>([]);
  const [prevHit, setPrevHit] = useState<HitData | undefined>(undefined);
  const [hitInterval, setHitInterval] = useState<number>(0);
  const [health, setHealth] = useState(100);

  const decreaseHealth = (num: number) => {
    setHealth((curr) => curr - num);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = useCallback(
    debounce(() => {
      setHits([]);
      setPrevHit(undefined);
      setHitInterval(0);
      setHealth(100);
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
    decreaseHealth(2);
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
    <Container>
      <HealthBar health={health} />
      <TargetArea onPointerDown={registerHit} onPointerUp={registerAdditional}>
        <TargetEmoji
          key={hits.length}
          health={health}
          damaged={hits.length > 0}
        />
        {hits.map((hitData) => (
          <HitEmoji key={hitData.timestamp} data={hitData} />
        ))}
      </TargetArea>
    </Container>
  );
}

export default App;
