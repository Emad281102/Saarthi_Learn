import { Calculator, Beaker, Globe, BookOpen, Lightbulb, HelpCircle } from "lucide-react";

// ==================== TYPES ====================
export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  type?: "text" | "image" | "file";
  subject?: string;
}

export interface QuickAction {
  icon: React.ElementType;
  label: string;
  subject: string;
  query: string;
  color?: string;
}

// ==================== CONSTANTS ====================
export const QUICK_ACTIONS: QuickAction[] = [
  { icon: Calculator, label: "Math Help", subject: "Mathematics", query: "I need help with a math problem", color: "text-blue-600" },
  { icon: Beaker, label: "Science Doubt", subject: "Science", query: "I have a science question", color: "text-green-600" },
  { icon: Globe, label: "Language Help", subject: "Languages", query: "Help me with language learning", color: "text-purple-600" },
  { icon: BookOpen, label: "Study Tips", subject: "General", query: "Give me some study tips", color: "text-orange-600" },
  { icon: Lightbulb, label: "Concept Clarity", subject: "General", query: "Explain this concept simply", color: "text-yellow-600" },
  { icon: HelpCircle, label: "Homework Help", subject: "General", query: "I need help with my homework", color: "text-pink-600" },
];

export const WELCOME_MESSAGE: Message = {
  id: "1",
  content: "Welcome to Saarthi Buddy! I am your AI learning assistant. I can help you with any study-related questions. How can I help you today?",
  sender: "ai",
  timestamp: "--:-- --",
  subject: "General",
};

// ==================== UTILITY FUNCTIONS ====================
export const handleFileUpload = (file: File): string => {
  return `File uploaded: ${file.name}`;
};

export const getTimeString = () =>
  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

// Supported subjects for the chat UI
export const SUBJECTS = [
  'General',
  'Mathematics',
  'Science',
  'Languages',
  'History'
];
