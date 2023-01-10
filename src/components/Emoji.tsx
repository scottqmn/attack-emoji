import styled from "styled-components";

interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

const Outer = styled.span`
  display: inline-block;
  width: var(--size, 48px);
  height: var(--size, 48px);
  font-size: var(--size, 48px);
  line-height: 0.75;
  user-select: none;
`;

export const Emoji: React.FC<EmojiProps> = ({
  children,
  className,
  size = 48,
  ...props
}) => (
  <Outer
    className={className}
    style={{ "--size": `${size}px` } as React.CSSProperties}
    {...props}
  >
    {children}
  </Outer>
);
