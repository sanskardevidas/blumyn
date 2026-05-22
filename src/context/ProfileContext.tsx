"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { UserProfile } from "@/types/profile";

type ProfileContextType = {
  profile: UserProfile;
  updateProfile: (data: UserProfile) => void;
  clearProfile: () => void;
};

const defaultProfile: UserProfile = {
  fullName: "",
  email: "",
  phone: "",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const PROFILE_STORAGE_KEY = "blumyn_profile";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        setProfile(defaultProfile);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile, hydrated]);

  const updateProfile = (data: UserProfile) => {
    setProfile(data);
  };

  const clearProfile = () => {
    setProfile(defaultProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
}