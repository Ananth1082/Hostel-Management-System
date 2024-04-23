import MealsGreetingCard from "@/Components/user/MealsGreetingCard";
import MenuLayout from "@/Components/user/MenuLayout";
import ReleaseCoupon from "@/Components/user/ReleaseCoupon";

export default function Meals() {
  return (
    <div className=" w-[90%] rounded-lg m-auto p-4">
      
      <MealsGreetingCard/>
      <MenuLayout />
      <ReleaseCoupon />
    </div>
  );
}
