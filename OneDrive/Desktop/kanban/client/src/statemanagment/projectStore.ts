import { create } from 'zustand';

const useProjectStore = create((set) => ({
    activeLink: 1,


    changeActiveLink: (newLink) => set({ activeLink: newLink }),


    toggleActiveLink: () => set((state) => ({
        activeLink: state.activeLink === 1 ? 2 : 1
    })),
}));

export default useProjectStore;
