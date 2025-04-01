
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mealPlans } from '../utils/roomData';

interface NightsAndMealSelectorProps {
  nights: number;
  mealPlan: string;
  onNightsChange: (value: number) => void;
  onMealPlanChange: (value: string) => void;
}

const NightsAndMealSelector: React.FC<NightsAndMealSelectorProps> = ({ 
  nights, 
  mealPlan, 
  onNightsChange, 
  onMealPlanChange 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="nights">Nights</Label>
        <Input 
          id="nights"
          type="number" 
          value={nights}
          onChange={(e) => onNightsChange(parseInt(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mealPlan">Meal Plan</Label>
        <Select 
          value={mealPlan} 
          onValueChange={onMealPlanChange}
        >
          <SelectTrigger id="mealPlan">
            <SelectValue placeholder="Select Meal Plan" />
          </SelectTrigger>
          <SelectContent>
            {mealPlans.map((meal) => (
              <SelectItem key={meal.id} value={meal.plan}>
                <div className="flex items-center">
                  <span>{meal.plan}</span>
                  <span className="ml-1 text-xs text-muted-foreground">({meal.name})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NightsAndMealSelector;
