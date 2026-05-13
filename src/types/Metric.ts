// Metric.ts — shape of a single stat item (numeric value, suffix, and label) in the metrics bar.
export interface Metric {
  value: number;
  suffix: string;
  label: string;
}
