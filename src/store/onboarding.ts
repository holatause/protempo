import { create } from "zustand";

interface OnboardingState {
  companyData: {
    name: string;
    industry: string;
    targetAudience: string;
  } | null;
  setCompanyData: (data: {
    name: string;
    industry: string;
    targetAudience: string;
  }) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  companyData: null,
  setCompanyData: (data) => set({ companyData: data }),
}));
