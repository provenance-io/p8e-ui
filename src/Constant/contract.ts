import { Color } from "Constant";

export const CHART_COLORS = [Color.BLUE, Color.FOREST_GREEN, Color.BURGUNDY, Color.PURPLE, Color.ORANGE, Color.TEAL];

export const ENVELOPE_STATUSES = [
  'CREATED',
  'FRAGMENT',
  'INBOX',
  'EXECUTED',
  'OUTBOX',
  'SIGNED',
  'CHAINCODE',
  'INDEX',
  'COMPLETE',
  'ERROR',
] as const;
