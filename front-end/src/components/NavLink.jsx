import React from 'react';

function NavLink({ href, icon, text, mobile, active, onClick }) {
  const baseClasses = "flex items-center space-x-1 transition-colors duration-200";
  const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium";
  const desktopClasses = "inline-flex items-center";
  const activeClasses = "text-indigo-600";
  const inactiveClasses = "text-gray-600 hover:text-indigo-600";

  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${mobile ? mobileClasses : desktopClasses}
        ${active ? activeClasses : inactiveClasses}
      `}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

export default NavLink;