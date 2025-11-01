import React from 'react';
import { useCreateTask } from './../apis/taskData';
import useTaskStore from '../statemanagment/taskStore';
import useProjectStore from '../statemanagment/projectStore';
import useColumnStore from '../statemanagment/columnStore';
import useModalStore from '../statemanagment/modalStore';

const BackDrop = () => {
  const {
    createTaskModalVisible,
    hideCreateTaskModal,
    showModal,
    hideModal,
    modalVisible,
    editTaskModalVisible,
    hideEditTaskModal,
  } = useTaskStore();
  const { projectModalVisible, hideProjectModal } = useProjectStore();
  const {
    deleteModalVisible,
    hideDeleteModal,
    deleteProjectModal,
    showDeleteProjectModal,
    hideDeleteProjectModal,
  } = useModalStore();

  const handleBackdropClick = () => {
    hideProjectModal();
    hideCreateTaskModal();
    hideModal();
    hideDeleteModal();
    hideEditTaskModal()
    hideDeleteProjectModal();

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
          columnModalVisible ||
          deleteModalVisible ||
          editTaskModalVisible ||
          deleteProjectModal
            ? 5
            : -5,
        background: 'rgba(0,0,0,.4)',
      }}></div>
  );
};

export default BackDrop;
