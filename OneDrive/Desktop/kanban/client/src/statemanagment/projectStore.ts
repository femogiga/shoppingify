import { create } from 'zustand';

const useProjectStore = create((set) => ({
    activeLink: 1,
    projectModalVisible: false,
    showProjectModal: () => set({ projectModalVisible: true }),

    hideProjectModal: () => set({ projectModalVisible: false }),
    changeActiveLink: (newLink) => set({ activeLink: newLink }),
    toggleActiveLink: () => set((state) => ({
        activeLink: state.activeLink === 1 ? 2 : 1
    })),

}));

export default useProjectStore;
