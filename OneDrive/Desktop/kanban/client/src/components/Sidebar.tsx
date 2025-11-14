import React from 'react';
import {
  Tally3,
  ClipboardList,
  Diamond,
  SquareKanban,
  Sun,
  Moon,
  EyeOff,
} from 'lucide-react';
import DarkMode from './DarkMode';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { useFetchProjects } from '../apis/projectData';
import useProjectStore from '../statemanagment/projectStore';
import Avatar from './Avatar';

const Sidebar = () => {
  const { mode } = useDarkMode();
  const { isPending, data: projectData, error } = useFetchProjects();
  console.log(projectData);
  const { changeActiveLink, activeLink, showProjectModal } = useProjectStore();
  const handleLinkChange = (e) => {
    e.preventDefault();
  };
  const handleModalVisibility = (e) => {
    e.preventDefault();
    showProjectModal();
  };
  return (
    <aside className={`sidebar ${mode === 'light' ? 'lightmode' : 'darkmode'}`}>
      <header
        className={`flex item-center p-x-1 ${
          mode === 'light' ? 'lightmode' : 'darkmode'
        }`}>
        <Tally3 size={30} color={'purple'} />
        <h2 className={mode === 'light' ? 'font-black' : 'font-white'}>
          Kanban
        </h2>
      </header>
      <section>
        <h3
          className={`${
            mode === 'light' ? 'font-black' : 'font-white '
          } p-x-1  mbe-1} font-sm p-y-1`}>
          ALL BOARDS <span>(8)</span>
        </h3>
        <nav className='nav'>
          <ul className='grid gap-y-1'>
            {projectData &&
              projectData.map((project) => (
                <NavItem
                  title={project.title}
                  key={`project${project.id}`}
                  path={project.id}
                />
              ))}

            <li className='create nav-item flex item-center gap-x-1 font-white '>
              <SquareKanban size={'2rem'} />
              <button
                onClick={handleModalVisibility}
                style={{
                  backgroundColor: 'unset',
                  color: 'rgb(141, 192, 243)',
                  border: 'none',
                }}>
                +Create new board
              </button>
            </li>
          </ul>
        </nav>
      </section>
      <div className='p-x-1 align-self-end'>
        <DarkMode />
        <div className='flex item-center gap-x-1 color-dark-white font-sm p-y-1'>
          <EyeOff size={20} color={'#979dac'} /> Hide Sidebar
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
