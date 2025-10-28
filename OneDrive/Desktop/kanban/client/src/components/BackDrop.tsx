import React from 'react';
import { useCreateTask } from './../apis/taskData';
import useTaskStore from '../statemanagment/taskStore';
import useProjectStore from '../statemanagment/projectStore';
import useColumnStore from '../statemanagment/columnStore';

const BackDrop = () => {
  const {
    createTaskModalVisible,
    hideCreateTaskModal,
    showModal,
    hideModal,
    modalVisible,
  } = useTaskStore();
  const { projectModalVisible, hideProjectModal } = useProjectStore();

  const handleBackdropClick = () => {
    hideProjectModal();
    hideCreateTaskModal();
    hideModal();
  };
  const { columnModalVisible } = useColumnStore();
  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex:
          projectModalVisible ||
          createTaskModalVisible ||
          modalVisible ||
          columnModalVisible
            ? 5
            : -5,
        background: 'rgba(0,0,0,.4)',
      }}></div>
  );
};

export default BackDrop;
