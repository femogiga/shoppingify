import { SquareKanban } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import useProjectStore from '../statemanagment/projectStore';


interface INavItem {
  title: string;
  path: number;
}
const NavItem: React.FC<INavItem> = ({ title, path }) => {
   const { activeLink , changeActiveLink } = useProjectStore();


  console.log(activeLink)

  return (
    <li className='nav-item flex item-center gap-x-1 color-dark-white'>
      <Link
         to={`projects/${path}`}
        onClick={(e)=>changeActiveLink(path)}
        className="className='nav-item flex item-center gap-x-1 color-dark-white'">
        <SquareKanban />
        <span>{title}</span>
      </Link>
    </li>
  );
}

export default NavItem
