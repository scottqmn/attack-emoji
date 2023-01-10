import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { Emoji } from "./Emoji";
import { HitData, HitDataTypes } from "../types/hit";

interface HitEmojiProps {
  data: HitData;
}

const PositionWrap = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
`;

const fadeOutAnimation = keyframes`
 0% { opacity: 0.8; transform: scale(0.9); }
 20% { opacity: 1; transform: scale(1); }
 100% { opacity: 0; transform: scale(0.4); }
`;

const EmojiFadeOut = styled(Emoji)`
  animation-name: ${fadeOutAnimation};
  animation-duration: 600ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export const HitEmoji: React.FC<HitEmojiProps> = ({ data }) => {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unmount = () => {
    setMounted(false);
  };

  const emoji = useMemo(() => {
    switch (data.type) {
      case HitDataTypes.Bang:
        return "💥";
      case HitDataTypes.Kick:
        return "🦶";
      case HitDataTypes.Punch:
      default:
        return "👊";
    }
  }, [data.type]);

  return mounted ? (
    <PositionWrap style={{ left: data.x, top: data.y }}>
      <EmojiFadeOut onAnimationEnd={unmount} size={100}>
        {emoji}
      </EmojiFadeOut>
    </PositionWrap>
  ) : null;
};
