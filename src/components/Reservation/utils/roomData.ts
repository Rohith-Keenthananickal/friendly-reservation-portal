
interface RoomType {
  id: number;
  type: string;
}

interface MealPlan {
  id: number;
  plan: string;
  name: string;
}

export const roomTypes: RoomType[] = [
  { id: 1, type: 'Deluxe Room' },
  { id: 2, type: 'Super Deluxe Room' },
  { id: 3, type: 'Premium Room' },
];

export const mealPlans: MealPlan[] = [
  { id: 1, plan: 'MAP', name: 'Modified American Plan' },
  { id: 2, plan: 'AP', name: 'American Plan' },
  { id: 3, plan: 'CP', name: 'Continental Plan' },
  { id: 4, plan: 'EP', name: 'European Plan' },
];
