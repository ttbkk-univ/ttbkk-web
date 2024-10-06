export interface Brand {
  id?: string;
  hashtags?: string[];
  name: string;
  label: string;
  description?: string;
  place_count: { count: number }[0];
}
