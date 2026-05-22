"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ContactMessage } from "@/types/message";

type MessageContextType = {
  messages: ContactMessage[];
  addMessage: (message: Omit<ContactMessage, "id" | "createdAt">) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MESSAGE_STORAGE_KEY = "blumyn_messages";

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(MESSAGE_STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        setMessages([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages));
  }, [messages, hydrated]);

  const addMessage = (message: Omit<ContactMessage, "id" | "createdAt">) => {
    const newMessage: ContactMessage = {
      id: `MSG-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...message,
    };

    setMessages((prev) => [newMessage, ...prev]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, removeMessage, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }

  return context;
}