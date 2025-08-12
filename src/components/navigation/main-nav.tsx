import { useState, useEffect } from "react"
import { MenuItem } from "./menu-item"
import { MobileSidebar } from "./mobile-sidebar"
import {  BiDotsHorizontalRounded } from "react-icons/bi"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function MainNav({ menuData }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={classNames("relative transition-all duration-300", isScrolled && "shadow-sm")}>

      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} menuData={menuData} />

      <div  className="hidden lg:block relative">
        <ul className="flex items-center space-x-1">
          {sortedMenuItems.slice(0, 5).map((item) => (
            <MenuItem key={`${item.title}-${item.order}`} item={item} />
          ))}
          {sortedMenuItems.length > 5 && (
            <li className="relative">
              <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-2 bg-[#113F67] text-white hover:text-gray-200 rounded-md transition-colors flex items-center space-x-1 text-sm font-medium"
                aria-label="More menu items"
              >
                <BiDotsHorizontalRounded size={18}/>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
