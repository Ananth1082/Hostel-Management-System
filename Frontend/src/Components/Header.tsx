import { useState } from "react";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  return (
    <header className="bg-black h-16 p-2 flex gap-10">
      <button
        onClick={toggleMenu}
        className=  "border-white border-2 rounded-full p-2 w-20 text-white"
      >
        <span className={`transition-opacity border-solid ease-in-out duration-300 delay-100 ${isHidden?"opacity-100":"opacity-0"}`}>Menu</span>
      </button>
      <nav
        className={`transition-opacity transition-height transition-transform ease-in-out duration-300 delay-100 text-white flex gap-8 items-center ${
          isHidden ? "opacity-0 h-0 translate-x-[-2rem]" : "opacity-100 h-auto"
        }`}
      >
        <div>Home</div>
        <div>About</div>
        <div>Contact</div>
      </nav>
    </header>
  );
};

export { Header };
