
export interface Activity {
  id: number;
  name: string;
  dailyPrice: number;
  shedule: { active: boolean }[];
  subtotal: number; 
}