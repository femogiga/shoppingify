import { create } from 'zustand';


interface ColumnState {
    activeTaskId:string | number | null;
    columnModalVisible: boolean;
    showColumnModal:()=>void
    hideColumnModal:()=>void
}
const useColumnStore = create<ColumnState>((set) => ({
    activeTaskId: null,
    columnModalVisible: false,
    showColumnModal: () => set({ columnModalVisible: true }),
    hideColumnModal: () => set({ columnModalVisible: false }),

}));

export default useColumnStore;
