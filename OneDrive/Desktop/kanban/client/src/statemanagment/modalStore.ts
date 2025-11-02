import { create } from 'zustand';

const useModalStore = create((set) => ({

    deleteModalVisible: false,
    deleteEditModal: false,
    deleteProjectModal: false,
    editProjectModalVisible: false,

    showDeleteModal: () => set({ deleteModalVisible: true }),
    hideDeleteModal: () => set({ deleteModalVisible: false }),

    showDeleteEditModal: () => set({ deleteEditModal: true }),
    hideDeleteEditModal: () => set({ deleteEditModal: false }),

    showDeleteProjectModal: () => set({ deleteProjectModal: true }),
    hideDeleteProjectModal: () => set({ deleteProjectModal: false }),

    showEditProjectModal: () => set({ editProjectModalVisible: true }),
    hideEditProjectModal: () => set({ editProjectModalVisible: false }),

}));

export default useModalStore;
