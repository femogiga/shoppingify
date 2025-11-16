import { create } from 'zustand';


interface TaskState{
    activeTaskId: string | number | null;
    modalVisible: boolean;
    activeTaskData: Task | null;
    createTaskModalVisible: boolean;
    editTaskModalVisible: boolean;
    setActiveTaskId: (newTaskId: number) => void
    showModal: () => void;
    hideModal: () => void;
    setActiveTaskData: (TaskData: Task) => void;
    openTaskModal: (taskId: number) => void
    showCreateTaskModal:() => void;
    hideCreateTaskModal:() => void;
    showEditTaskModal:() => void;
    hideEditTaskModal:() => void;
}


const useTaskStore = create<TaskState>((set) => ({
    activeTaskId: null,
    modalVisible: false,
    activeTaskData: null,
    createTaskModalVisible: false,
    editTaskModalVisible:false,

    setActiveTaskId: (newTaskId: number) => set({ activeTaskId: newTaskId }),
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
