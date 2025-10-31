import { create } from 'zustand';

const useTaskStore = create((set) => ({
    activeTaskId: null,
    modalVisible: false,
    activeTaskData: null,
    createTaskModalVisible: false,
    editTaskModalVisible:false,

    setActiveTaskId: (newTaskId: number) => set({ activeTask: newTaskId }),
    showModal: () => set({ modalVisible: true }),
    hideModal: () => set({ modalVisible: false }),
    setActiveTaskData: (taskData) => set({activeTaskData : taskData}),

    openTaskModal: (taskId) => set({
        activeTaskId: taskId,
        modalVisible: true
    }),
    showCreateTaskModal: () => set({ createTaskModalVisible: true }),
    hideCreateTaskModal: () => set({ createTaskModalVisible: false }),
    showEditTaskModal: () => set({ editTaskModalVisible: true }),
    hideEditTaskModal: () => set({ editTaskModalVisible: false }),

}));

export default useTaskStore;
