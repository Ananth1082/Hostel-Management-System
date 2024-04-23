import { Menu } from "@/Types/Menu";
import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import H2 from "../Typography/H2";

export default function MenuLayout() {
  const [menuItems, setMenuItems] = useState<Menu[]>([
    { time: "", day: "", mess_type: "", description: "" },
  ]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      let menuItemForTheDay: Menu[] = [];
      try {
        const breakfastResponse = await fetch(
          "http://localhost:8080/menu-item",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              time: "Breakfast",
              day: "Monday",
              mess_type: "North",
            }),
          }
        );
        const lunchResponse = await fetch("http://localhost:8080/menu-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time: "Lunch",
            day: "Monday",
            mess_type: "North",
          }),
        });
        const teaResponse = await fetch("http://localhost:8080/menu-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time: "Tea",
            day: "Monday",
            mess_type: "North",
          }),
        });
        const dinnerResponse = await fetch("http://localhost:8080/menu-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time: "Dinner",
            day: "Monday",
            mess_type: "North",
          }),
        });

        if (breakfastResponse.ok) {
          const breakfastMenu = await breakfastResponse.json();
          menuItemForTheDay.push(breakfastMenu);

          if (lunchResponse.ok) {
            const lunchMenu = await lunchResponse.json();
            menuItemForTheDay.push(lunchMenu);

            if (teaResponse.ok) {
              const teaMenu = await teaResponse.json();
              menuItemForTheDay.push(teaMenu);

              if (dinnerResponse.ok) {
                const dinnerMenu = await dinnerResponse.json();
                menuItemForTheDay.push(dinnerMenu);
              }
            }
          }
        }
        console.log(menuItemForTheDay);

        setMenuItems(menuItemForTheDay);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
    <div className="m-auto mt-10">
    <H2 className="text-center ">Today's Menu</H2>
      <div className="grid grid-cols-4 w-[80%] m-auto mt-10 gap-4">
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} menuItem={menuItem} />
        ))}
      </div>
      </div>
    </>
  );
}
