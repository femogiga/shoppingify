import { create } from 'zustand';


interface ProjectState{
    activeLink: string | number | null;
    projectModalVisible: boolean;
    showProjectModal: ()=>void
    hideProjectModal:()=> void
    changeActiveLink: (newLink : string)=>void
    toggleActiveLink: ()=> void
}
const useProjectStore = create<ProjectState>((set) => ({
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
