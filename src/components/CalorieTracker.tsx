import { useMemo } from "react";
import { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  //Contadores
  const caloriesConsumed: number = useMemo(
    () =>
      activities.reduce((total, value) => {
        if (value.category === 1) {
          return total + value.calories;
        }
        return total;
      }, 0),
    [activities]
  );
  const caloriesBurned: number = useMemo(
    () =>
      activities.reduce((total, value) => {
        if (value.category === 2) {
          return total + value.calories;
        }
        return total;
      }, 0),
    [activities]
  );
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calories Summary
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Consumed"
        />
        <CalorieDisplay
          calories={caloriesBurned}
          text="Burned"
        />
        <CalorieDisplay
          calories={netCalories}
          text="Difference"
        />
      </div>
    </>
  );
};

export default CalorieTracker;
