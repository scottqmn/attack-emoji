import { Emoji } from './Emoji';

interface IHealthBarProps {
  health: number;
  totalHealth: number;
}

const HEALTH_INCREMENT = 12;
const healthArray = Array(HEALTH_INCREMENT).fill(0);

export const HealthBar = ({ health, totalHealth }: IHealthBarProps) => {
  const incrementValue = totalHealth / HEALTH_INCREMENT;

  const getEmojiCharacter = (index: number) => {
    if (index * incrementValue > health) return '⬜️';
    const healthPercentage = health / totalHealth;
    if (healthPercentage >= 0.75) return '🟩';
    if (healthPercentage >= 0.5) return '🟨';
    if (healthPercentage >= 0.25) return '🟧';
    return '🟥';
  };

  return (
    <div className="flex flex-col gap-2.5 mx-auto w-fit">
      <div>EMOJI</div>
      <div className="flex">
        {healthArray.map((_, index) => (
          <Emoji key={index} size={25}>
            {getEmojiCharacter(index)}
          </Emoji>
        ))}
      </div>
    </div>
  );
};
