import { useMemo } from "react";
import { Emoji } from "./Emoji";

interface TargetEmojiProps {
  health: number;
  damaged: boolean;
}

export const TargetEmoji: React.FC<TargetEmojiProps> = ({
  health,
  damaged,
}) => {
  const emoji = useMemo(() => {
    let options: string[] = [];
    if (damaged) {
      if (health > 80) {
        options = ["😒", "😔", "😟", "😵‍💫"];
      } else if (health > 60) {
        options = ["😣", "😣", "😖"];
      } else if (health > 40) {
        options = ["😖", "😖", "😫"];
      } else if (health > 20) {
        options = ["😫", "😫", "😵"];
      } else {
        options = ["😵"];
      }
    } else {
      options = ["😀", "😁", "😉", "😜", "😊", "😏", "😬"];
    }
    return options[Math.floor(Math.random() * options.length)];
  }, [damaged, health]);

  return <Emoji size={300}>{emoji}</Emoji>;
};
