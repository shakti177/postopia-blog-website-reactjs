import React from "react";
import logoDark from "../../assets/logo/blacklogo.png";
import logoLight from "../../assets/logo/whitelogo.png";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "../../context/ThemeProvider";
import { Moon, Sun, Search } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav className="flex items-center justify-between p-5 sticky top-0 z-10 md:px-[60px] lg:px-[120px] lg:py-5 bg-white shadow-md dark:bg-neutral-900">
        <div className="flex items-center justify-center w-32 md:w-44 lg:w-52">
          <Link to="/">
            <img src={theme === "light" ? logoDark : logoLight} alt="Logo" />
          </Link>
        </div>
        {/* For desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-6">
          {/* For Mobile */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Search />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <SearchBar />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="dark:text-white" /> : <Moon />}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-7 w-7 md:h-9 md:w-9">
                <AvatarImage src="https://pbs.twimg.com/profile_images/1612332480685838337/DtMNGDSQ_400x400.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
