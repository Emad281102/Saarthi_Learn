"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Mic,
  Paperclip,
  RotateCcw,
  BookOpen,
  Calculator,
  Beaker,
  Globe,
  Lightbulb,
  HelpCircle,
  ImageIcon,
  Volume2,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "image";
  subject?: string;
}

const quickActions = [
  {
    icon: Calculator,
    label: "Math Help",
    subject: "Mathematics",
    query: "I need help with a math problem",
  },
  {
    icon: Beaker,
    label: "Science Doubt",
    subject: "Science",
    query: "I have a science question",
  },
  {
    icon: Globe,
    label: "Language Help",
    subject: "Languages",
    query: "Help me with language learning",
  },
  {
    icon: BookOpen,
    label: "Study Tips",
    subject: "General",
    query: "Give me some study tips",
  },
  {
    icon: Lightbulb,
    label: "Concept Clarity",
    subject: "General",
    query: "Explain this concept simply",
  },
  {
    icon: HelpCircle,
    label: "Homework Help",
    subject: "General",
    query: "I need help with my homework",
  },
];

const sampleConversations = [
  {
    id: "1",
    title: "Algebra Problem Solving",
    lastMessage: "Great! You solved it correctly.",
    timestamp: "2 hours ago",
    subject: "Mathematics",
  },
  {
    id: "2",
    title: "Photosynthesis Process",
    lastMessage: "Plants use sunlight to make food...",
    timestamp: "Yesterday",
    subject: "Science",
  },
  {
    id: "3",
    title: "English Grammar Rules",
    lastMessage: "Remember: Subject + Verb + Object",
    timestamp: "2 days ago",
    subject: "Languages",
  },
];

export default function SaarthiBuddyPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "नमस्ते! मैं सारथी हूँ, आपका AI शिक्षा सहायक। मैं आपकी पढ़ाई में किसी भी तरह की मदद कर सकता हूँ। आप मुझसे हिंदी, अंग्रेजी या अपनी मातृभाषा में सवाल पूछ सकते हैं।",
      sender: "ai",
      timestamp: new Date(),
      subject: "General",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, subject?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      subject,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content, subject),
        sender: "ai",
        timestamp: new Date(),
        subject,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string, subject?: string): string => {
    const responses = {
      math: [
        "मैं आपकी गणित की समस्या को हल करने में मदद करूंगा। कृपया अपना सवाल विस्तार से बताएं।",
        "गणित में कोई भी समस्या हो, मैं step-by-step समाधान दूंगा। आपका प्रश्न क्या है?",
      ],
      science: [
        "विज्ञान के किसी भी विषय में मैं आपकी सहायता कर सकता हूँ। आपका प्रश्न क्या है?",
        "मैं आपको विज्ञान की अवधारणाओं को सरल भाषा में समझाऊंगा।",
      ],
      general: [
        "मैं आपकी मदद करने के लिए यहाँ हूँ। कृपया अपना प्रश्न पूछें।",
        "आप जो भी पूछना चाहते हैं, मैं उसका उत्तर देने की कोशिश करूंगा।",
      ],
    };

    const category = subject?.toLowerCase().includes("math")
      ? "math"
      : subject?.toLowerCase().includes("science")
      ? "science"
      : "general";

    const categoryResponses = responses[category];
    return categoryResponses[
      Math.floor(Math.random() * categoryResponses.length)
    ];
  };

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    handleSendMessage(action.query, action.subject);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      const message = `मैंने एक फाइल अपलोड की है: ${file.name}`;
      handleSendMessage(message, "General");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Chat History Sidebar */}
      <div className="w-80 bg-white rounded-lg border p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Chat History</h2>
          <Button variant="ghost" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {sampleConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {conversation.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {conversation.subject}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {conversation.lastMessage}
                </p>
                <p className="text-xs text-gray-400">
                  {conversation.timestamp}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <div className="space-y-2">
          <h3 className="font-medium text-sm text-gray-900">Language</h3>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="Hindi">हिंदी</option>
            <option value="English">English</option>
            <option value="Bengali">বাংলা</option>
            <option value="Tamil">தமிழ்</option>
          </select>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-lg border flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-gradient-to-r from-brand-1 to-brand-2 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/saarthi-avatar.png" />
              <AvatarFallback className="bg-white text-brand-1 font-bold">
                S
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-neutral-700">
                Saarthi-Buddy
              </h1>
              <p className="text-sm text-cyan-500">
                Always here to help with your studies
              </p>
            </div>
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Help</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="flex flex-col items-center p-3 h-auto hover:bg-brand-1 hover:text-white"
              >
                <action.icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-brand-1 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/saarthi-avatar.png" />
                        <AvatarFallback className="bg-brand-1 text-white text-xs">
                          S
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Saarthi-Buddy</span>
                      {message.subject && (
                        <Badge variant="secondary" className="text-xs">
                          {message.subject}
                        </Badge>
                      )}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/saarthi-avatar.png" />
                      <AvatarFallback className="bg-brand-1 text-white text-xs">
                        S
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-600 hover:text-brand-1"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-brand-1"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="अपना सवाल यहाँ लिखें... (Type your question here...)"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputMessage)
                }
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-brand-1"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="bg-brand-1 hover:bg-brand-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Saarthi can make mistakes. Please verify important information.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>
    </div>
  );
}
