import React from 'react';
import Sidebar from './../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SubTaskModal from '../components/SubTaskModal';
import { createPortal } from 'react-dom';
import useTaskStore from '../statemanagment/taskStore';
import useProjectStore from '../statemanagment/projectStore';
import CreateProjectModal from './../components/CreateProjectModal';
import CreateTaskModal from '../components/CreateTaskModal';
import BackDrop from '../components/BackDrop';
import Container from '../components/Container';
import CreateColumnModal from '../components/CreateColumnModal';
import { useDarkMode } from '../context/DarkModeContext';
import useColumnStore from '../statemanagment/columnStore';
import EditTaskModal from '../components/EditTaskModal';

const BaseLayout = () => {
  const {
    activeTaskId,
    modalVisible,
    setActiveTaskId,
    showModal,
    hideModal,
    createTaskModalVisible,
    editTaskModalVisible,
  } = useTaskStore();
  const {
    showProjectModal,
    hideProjectModal,
    projectModal,
    projectModalVisible,
  } = useProjectStore();
  const body = document.querySelector('.home');
  const { mode } = useDarkMode()
  const{columnModalVisible} = useColumnStore()
  return (
    <>
      <div className={`home ${mode === 'light' ? 'bg-light' : 'bg-darker'}`}>
        <BackDrop />
        <Sidebar />
        <main className='main-content'>
          <Header />
          {modalVisible && createPortal(<SubTaskModal />, body)}
          {projectModalVisible && createPortal(<CreateProjectModal />, body)}
          {createTaskModalVisible && createPortal(<CreateTaskModal />, body)}
          {columnModalVisible &&
            createPortal(<CreateColumnModal mode={mode} />, body)}
          {    editTaskModalVisible
 &&
            createPortal(<EditTaskModal mode={mode} />, body)}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
