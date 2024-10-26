import { Emoji } from './Emoji';

interface ITargetEmojiProps {
  health: number;
  damaged: boolean;
}

export const TargetEmoji = ({ health, damaged }: ITargetEmojiProps) => {
  let options: string[] = [];
  if (damaged) {
    if (health > 80) {
      options = ['😒', '😔', '😟', '😵‍💫'];
    } else if (health > 60) {
      options = ['😣', '😣', '😖'];
    } else if (health > 40) {
      options = ['😖', '😖', '😫'];
    } else if (health > 20) {
      options = ['😫', '😫', '😵'];
    } else {
      options = ['😵'];
    }
  } else {
    options = ['😀', '😁', '😉', '😜', '😊', '😏', '😬'];
  }

  const emoji = options[Math.floor(Math.random() * options.length)];

  return <Emoji size={300}>{emoji}</Emoji>;
};
