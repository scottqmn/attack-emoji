import styled from "styled-components";
import { Emoji } from "./Emoji";

interface HealthBarProps {
  health: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  width: fit-content;
`;

const RightAlign = styled.div`
  text-align: right;
`;

export const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  const healthArray = Array(10).fill(0);
  return (
    <Container>
      <div>EMOJI</div>
      <div>
        {healthArray.map((_, index) => {
          const threshold = index * 10;
          let emoji;
          if (threshold <= health) {
            emoji = "🟩";
          } else {
            const difference = threshold - health;
            if (difference < 2.5) {
              emoji = "🟨";
            } else if (difference < 5) {
              emoji = "🟧";
            } else if (difference < 7.5) {
              emoji = "🟥";
            } else {
              emoji = "⬜️";
            }
          }

          return emoji ? (
            <Emoji key={index} size={24}>
              {emoji}
            </Emoji>
          ) : null;
        })}
      </div>
      <RightAlign>{Math.max(Math.floor(health), 0)}/100</RightAlign>
    </Container>
  );
};
