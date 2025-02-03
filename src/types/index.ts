export interface ChartData {
  id: string;
  name: string;
  type: 'line' | 'spline' | 'area';
  color: string;
  data: DataPoint[];
}

export interface DataPoint {
  date: string;
  value: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}