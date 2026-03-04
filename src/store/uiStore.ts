/**
 * Zustand Store - UI
 */
import { create } from 'zustand'

interface UIStore {
  isMenuOpen: boolean
  isModalOpen: boolean
  modalContent: string | null
  toggleMenu: () => void
  openModal: (content: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  isModalOpen: false,
  modalContent: null,
  toggleMenu: () =>
    set((state) => ({
      isMenuOpen: !state.isMenuOpen,
    })),
  openModal: (content) =>
    set({
      isModalOpen: true,
      modalContent: content,
    }),
  closeModal: () =>
    set({
      isModalOpen: false,
      modalContent: null,
    }),
}))
