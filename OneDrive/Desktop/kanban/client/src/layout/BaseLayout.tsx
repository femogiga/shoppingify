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

const BaseLayout = () => {
  const {
    activeTaskId,
    modalVisible,
    setActiveTaskId,
    showModal,
    hideModal,
    createTaskModalVisible,
  } = useTaskStore();
   const {
     showProjectModal,
     hideProjectModal,
     projectModal,
     projectModalVisible,
   } = useProjectStore();
  const body = document.querySelector('.home');
  console.log(body);
  return (
    <>
      <div className='home'>
        <BackDrop />
        <Sidebar />
        <main className='main-content'>
          <Header />
          {modalVisible && createPortal(<SubTaskModal />, body)}
          {projectModalVisible && createPortal(<CreateProjectModal />, body)}
          {createTaskModalVisible && createPortal(<CreateTaskModal />, body)}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
