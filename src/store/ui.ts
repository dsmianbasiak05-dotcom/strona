"use client";

import { create } from "zustand";

interface UIState {
  searchOpen: boolean;
  menuOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
}

export const useUI = create<UIState>()((set) => ({
  searchOpen: false,
  menuOpen: false,
  setSearchOpen: (searchOpen) => set({ searchOpen, menuOpen: false }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));
