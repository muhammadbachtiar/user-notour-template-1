"use client"

import { Fragment, useEffect, useState } from "react"
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react"
import { BiChevronDown } from "react-icons/bi"
import { Link, useLocation } from "react-router-dom"

export function MenuItem({ item, basePath = "", level = 0 }) {
  const pathname = String(useLocation())
  const fullPath = item.route ? `${basePath}${item.route}` : basePath
  const isActive = pathname === fullPath
  const hasChildren = item.child && item.child.length > 0
  const isClickable = item.route && item.staticPage !== null || !item.staticPage && !hasChildren;
  
  const sortedChildren = item.child ? [...item.child].sort((a, b) => a.order - b.order) : []
    const [isOpen, setIsOpen] = useState(false);
   useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.style.overflow = "";
      html.style.paddingRight = "";
    } else {
      html.style.overflow = "";
      html.style.paddingRight = "";
    }

    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
    };
  }, [isOpen]);

  if (level > 0) {
    return (
      <div className="py-1">
        {isClickable ? (
          <Link 
            to={fullPath}
            className={` "w-full block px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors",
              ${isActive ? "text-black border-l-2 border-black pl-3" : "text-gray-800"}`}
          >
            {item.title}
          </Link>
        ) : (
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            {item.title}
          </div>
        )}
        
        {hasChildren && (
          <div className="ml-4 border-l border-gray-200 pl-4">
            {sortedChildren.map((child) => (
              <MenuItem 
                key={`${child.title}-${child.order}`} 
                item={child} 
                basePath={fullPath} 
                level={level + 1} 
              />
            ))}
          </div>
        )}
      </div>
    )
  }
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          {isClickable ? (
            <Link to={fullPath}>
              <div 
                className={`flex whitespace-nowrap overflow-hidden max-w-[10rem]
                  "inline-flex items-center bg-[#113F67] text-[#F3F9FB] border-[#113F67] px-4 py-2  hover:border-[#DDA853] font-bold transition-all duration-200",
                  "focus:outline-none",
                  ${isActive ? "border-b-2 border-[#DDA853]" 
                    : "hover:border-b-2 hover:border-gray-300"},
                  ${hasChildren ? "pr-1" : ""}
                `}
              >
                {item.title}
              </div>
            </Link>
          ) : (
            <MenuButton 
              className={`flex whitespace-nowrap overflow-hidden max-w-[10rem]
                  "inline-flex items-center bg-[#113F67] text-[#F3F9FB] border-[#113F67] px-4 py-2  hover:border-[#DDA853] font-bold transition-all duration-200",
                  "focus:outline-none",
                  ${isActive ? "border-b-2 border-[#DDA853]" 
                    : "hover:border-b-2 hover:border-gray-300"},
                  ${hasChildren ? "pr-1" : ""}
                `}
                 onClick={() => setIsOpen(!isOpen)}
            >
              {item.title}
              {hasChildren && (
                <BiChevronDown 
                  className={`
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    ${open ? "rotate-180" : ""}
                  `} 
                  aria-hidden="true" 
                />
              )}
            </MenuButton>
          )}

          {hasChildren && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems 
                className={
                  "absolute right-0 z-50 mt-1 w-60 max-h-[70vh] overflow-y-auto overflow-hidden origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-t-2 border-black"}
              >
                <div className="py-1">
                  {sortedChildren.map((child) => (
                    <MenuItem 
                      key={`${child.title}-${child.order}`} 
                      item={child} 
                      basePath={fullPath} 
                      level={level + 1} 
                    />
                  ))}
                </div>
              </MenuItems>
            </Transition>
          )}
        </>
      )}
    </Menu>
  )
}
