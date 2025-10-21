import React from 'react';
import Sidebar from './../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SubTaskModal from '../components/SubTaskModal';
import { createPortal } from 'react-dom';
import useTaskStore from '../statemanagment/taskStore';

const BaseLayout = () => {
  const { activeTaskId, modalVisible, setActiveTaskId, showModal, hideModal } =
    useTaskStore();
  const body = document.querySelector('.home');
  console.log(body);
  return (
    <>
      <div className='home'>
        <Sidebar />
        <main className='main-content'>
          <Header />
          {modalVisible && createPortal(<SubTaskModal />,body)}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
