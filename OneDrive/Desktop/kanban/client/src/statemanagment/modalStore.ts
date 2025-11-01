import { create } from 'zustand';

const useModalStore = create((set) => ({

    deleteModalVisible: false,
    deleteEditModal: false,
    deleteProjectModal:false,
    showDeleteModal: () => set({ deleteModalVisible: true }),
    hideDeleteModal: () => set({ deleteModalVisible: false }),

    showDeleteEditModal: () => set({ deleteEditModal: true }),
    hideDeleteEditModal: () => set({ deleteEditModal: false }),

    showDeleteProjectModal: () => set({ deleteProjectModal: true }),
    hideDeleteProjectModal: () => set({ deleteProjectModal: false }),

}));

export default useModalStore;
