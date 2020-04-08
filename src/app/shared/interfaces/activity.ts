export interface SheduleData {
  active: boolean;
  monthlyPayment: number;
}

export interface Activity {
  id: number;
  name: string;
  dailyPrice: number;
  shedule: SheduleData[];
  subtotal: number; 
}