"use client";

import { useState, useEffect } from "react";
import { QuickActions, ChatArea, ChatInput } from "./components";
import { QUICK_ACTIONS, WELCOME_MESSAGE, handleFileUpload } from "./config";
import type { Message, QuickAction } from "./config";

export default function SaarthiBuddyPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const getTimeString = () =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const formatAiText = (text: string): string => {
    if (!text) return '';
    let t = text.replace(/\r\n/g, '\n');
    // Remove Markdown emphasis asterisks: **bold** and *italic*
    t = t.replace(/\*\*(.*?)\*\*/g, '$1');
    t = t.replace(/\*(.*?)\*/g, '$1');
    // Convert leading bullets to a more readable bullet symbol
    t = t.replace(/^\s*[-*]\s+/gm, '• ');
    // Collapse excessive blank lines
    t = t.replace(/\n{3,}/g, '\n\n');
    return t.trim();
  };

  const handleSendMessage = async (content: string, subject?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: getTimeString(),
      subject,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      console.log('🚀 Starting API call...');
      console.log('Message:', content);
  console.log('Subject:', subject);

      // Use Next.js API route instead of direct API calls (to avoid CORS/network issues)
      console.log('📡 Calling Next.js API route...');
      
      const response = await fetch('/api/saarthi-buddy', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          subject: subject
        }),
      });

      console.log('📥 Response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error' }));
        console.error('API Route Error:', errorData);
        throw new Error(`API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);
      
      if (data.fallback) {
        console.warn('⚠️ Using fallback response (API unavailable)');
      }
      
  const rawText = data.aiMessage?.content || data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response. Please try again.';
  const aiText = formatAiText(rawText);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiText,
        sender: "ai",
        timestamp: getTimeString(),
  subject: subject,
      };
      setMessages((prev) => [...prev, aiResponse]);
      console.log('✅ AI response added to messages');
    } catch (error) {
      console.error('❌ Full Error Details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error message:', errorMessage);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `❌ Error: ${errorMessage}\n\nPlease check:\n1. Your internet connection\n2. The browser console for details\n3. Try refreshing the page`,
        sender: "ai",
        timestamp: getTimeString(),
        subject,
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.query, action.subject);
  };

  const handleVoiceToggle = () => {
    setTtsEnabled((prev) => {
      const next = !prev;
      if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch {}
      }
      return next;
    });
  };

  const handleResetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setIsTyping(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
  };

  const handleFileSelect = (file: File) => {
    const message = handleFileUpload(file);
    handleSendMessage(message, "General");
  };

  useEffect(() => {
    if (!ttsEnabled) return;
    const last = messages[messages.length - 1];
    if (!last || last.sender !== 'ai') return;
    const text = typeof last.content === 'string' ? last.content : JSON.stringify(last.content);
    if (!text) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1;
        utter.pitch = 1;
        window.speechSynthesis.speak(utter);
      } catch (err) {
        console.warn('TTS error', err);
      }
    }
  }, [messages, ttsEnabled]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f7fb] to-[#e9eaf3] p-4 overflow-hidden">
      <div className="flex w-full max-w-5xl h-[88vh] rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-md bg-white">
        {/* Quick Actions Sidebar */}
        <div className="w-64 h-full border-r border-gray-100 flex flex-col overflow-hidden">
          <QuickActions 
            actions={QUICK_ACTIONS} 
            onActionClick={handleQuickAction}
          />
        </div>
        {/* Main Chat Container - Purple header spans top-right corner */}
        <div className="flex-1 h-full flex flex-col overflow-hidden rounded-tr-[2rem] bg-indigo-500">
          {/* Chat Area with Unified Purple Header */}
          <ChatArea 
            messages={messages} 
            isTyping={isTyping}
            onResetChat={handleResetChat}
            onVoiceToggle={handleVoiceToggle}
            voiceEnabled={ttsEnabled}
          />
          {/* Seamlessly integrated Chat Input Bar */}
          <div className="flex-shrink-0 w-full bg-white z-10 px-6 pb-4 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <ChatInput
                value={inputMessage}
                onChange={setInputMessage}
                onSend={() => handleSendMessage(inputMessage)}
                onFileUpload={handleFileSelect}
                disabled={isTyping}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
