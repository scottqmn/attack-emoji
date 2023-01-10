export enum HitDataTypes {
  Punch,
  Kick,
  Bang,
}

export type HitData = {
  x: number;
  y: number;
  timestamp: number;
  type: HitDataTypes;
};
