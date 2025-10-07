import { NavLink } from "react-router-dom";

function NavBar() {
  const activeClass = "text-blue-400 font-bold bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:100%_2px] bg-no-repeat transition-all duration-500 ease-out";
  const normalClass = "hover:text-blue-300 transition-colors duration-300 relative after:block after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100";

  return (
    <div className="pt-8">
        <nav className="group mx-20 p-6 shadow-2xl shadow-violet-400/30 rounded-3xl backdrop-blur-sm border border-blue-400 flex gap-6 justify-center font-satoshi-black text-xl relative">
          <NavLink to="/" 
          className={({ isActive }) => (isActive ? activeClass : normalClass) } 
          
          >
            Home
          </NavLink>

          <NavLink to="/custom" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
           Custom
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
            About us
          </NavLink>

        </nav>

    </div>
  );
}

export default NavBar;