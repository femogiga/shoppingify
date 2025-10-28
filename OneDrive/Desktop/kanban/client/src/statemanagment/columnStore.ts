import { create } from 'zustand';

const useColumnStore = create((set) => ({
    activeTaskId: null,
    columnModalVisible: false,


    showColumnModal: () => set({ columnModalVisible: true }),
    hideColumnModal: () => set({ columnModalVisible: false }),

}));

export default useColumnStore;
