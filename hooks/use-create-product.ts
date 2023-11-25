import { create } from 'zustand';

interface useCreateProductStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateProductModal = create<useCreateProductStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));