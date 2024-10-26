import clsx from 'clsx';

interface IEmojiProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

export const Emoji = ({
  children,
  className,
  size,
  style = {},
  ...props
}: IEmojiProps) => (
  <div
    className={clsx('leading-none aspect-square select-none', className)}
    style={{ fontSize: `${typeof size === 'number' ? size : 16}px`, ...style }}
    {...props}
  >
    <div className="relative -top-[0.125em] pointer-events-none">
      {children}
    </div>
  </div>
);
