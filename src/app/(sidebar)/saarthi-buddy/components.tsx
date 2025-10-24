"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Sparkles, BookOpen, MessageCircle, Zap, Send, Mic, Paperclip, ImageIcon, Smile, File, X, Volume2, VolumeX } from "lucide-react";
import type { Message, QuickAction } from "./config";

// ==================== CHAT HEADER ====================
export interface ChatHeaderProps {
  onResetChat: () => void;
  onVoiceToggle: () => void;
  voiceEnabled: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onResetChat, onVoiceToggle, voiceEnabled }) => {
  return (
    <div className="px-5 py-3 bg-gradient-to-r from-[var(--brand-blue-1)] to-[var(--brand-blue-2)] flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <Avatar className="h-8 w-8 ring-2 ring-white/80">
              <AvatarImage src="/saarthi-avatar.png" />
              <AvatarFallback className="bg-white text-brand-1 font-bold text-sm">S</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-semibold text-white text-sm tracking-wide">Saarthi Buddy</h1>
            <Sparkles className="h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 transition-all duration-200 ${voiceEnabled ? "text-yellow-300 hover:text-yellow-200 hover:bg-white/15" : "text-white/90 hover:text-white hover:bg-white/15"}`}
            onClick={onVoiceToggle}
            title={voiceEnabled ? "Turn voice off" : "Turn voice on"}
            aria-pressed={voiceEnabled}
          >
            {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200" onClick={onResetChat} title="Reset chat">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ==================== EMPTY STATE ====================
function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full min-h-[500px]">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,var(--brand-blue-1),var(--brand-blue-2))] opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-brand-1" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-1 to-brand-2 bg-clip-text text-transparent">
            Welcome to Saarthi Buddy!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your AI learning companion is ready to help you excel in your studies. Ask questions, get explanations, or choose a quick topic above to get started.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="p-3 bg-brand-1/10 rounded-lg"><BookOpen className="h-6 w-6 text-brand-1" /></div>
            <p className="text-sm font-medium text-gray-700">Study Help</p>
            <p className="text-xs text-gray-500 text-center">Get help with any subject</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="p-3 bg-brand-2/10 rounded-lg"><MessageCircle className="h-6 w-6 text-brand-2" /></div>
            <p className="text-sm font-medium text-gray-700">Clear Doubts</p>
            <p className="text-xs text-gray-500 text-center">Ask in any language</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="p-3 bg-brand-3/10 rounded-lg"><Zap className="h-6 w-6 text-brand-3" /></div>
            <p className="text-sm font-medium text-gray-700">Quick Answers</p>
            <p className="text-xs text-gray-500 text-center">Get instant help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TYPING INDICATOR ====================
function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white border border-gray-100 rounded-[20px] px-4 py-3.5 max-w-[85%] shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 bg-gradient-to-br from-[var(--brand-blue-1)] to-[var(--brand-blue-2)] rounded-full text-white text-[10px] font-bold flex items-center justify-center">S</span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-brand-2 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-brand-3 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1.5 h-1.5 bg-brand-4 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <span className="text-xs text-gray-500">Typing...</span>
        </div>
      </div>
    </div>
  );
}

// ==================== CHAT AREA ====================
interface ChatAreaProps {
  messages: Message[];
  isTyping?: boolean;
  onResetChat?: () => void;
  onVoiceToggle?: () => void;
  voiceEnabled?: boolean;
}

export function ChatArea({ messages, isTyping, onResetChat, onVoiceToggle, voiceEnabled }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <ChatHeader onResetChat={onResetChat || (() => {})} onVoiceToggle={onVoiceToggle || (() => {})} voiceEnabled={!!voiceEnabled} />
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-12 bg-white"
          style={{ maxHeight: 'calc(100vh - 280px)' }}
        >
          <div className="max-w-[680px] mx-auto space-y-4 pt-12 pb-4">
            {messages.map((message) => {
              const isUser = message.sender === "user";
              return (
                <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
                  <div className={`max-w-[85%] ${isUser ? "order-2" : "order-1"}`}>
                    {!isUser && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 bg-gradient-to-br from-[var(--brand-blue-1)] to-[var(--brand-blue-2)] rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">S</span>
                        <span className="text-sm font-semibold text-gray-800">Saarthi Buddy</span>
                        {message.subject && (
                          <span className="text-[10px] bg-gray-50 text-brand-1 border border-gray-200 rounded-full px-2.5 py-0.5 font-medium">{message.subject}</span>
                        )}
                      </div>
                    )}
                    <div className={`px-4 py-3.5 shadow-sm ${isUser ? "rounded-[20px] bg-gradient-to-br from-[var(--brand-blue-1)] to-[var(--brand-blue-2)] text-white" : "rounded-[20px] bg-white text-gray-800 border border-gray-100"}`}>
                      {/* Render attachments if present */}
                      {message.type === 'image' && typeof message.content === 'string' && (
                        <Image src={message.content} alt="attachment" className="mb-2 max-h-56 rounded-xl border border-gray-200" width={640} height={360} unoptimized />
                      )}
                      {message.type === 'file' && (
                        <div className="mb-2 flex items-center gap-2 text-gray-700">
                          <File className="h-4 w-4 text-brand-1" />
                          <span className="text-xs font-medium">{message.content}</span>
                        </div>
                      )}
                      <div className={`text-base leading-relaxed break-words ${isUser ? "font-medium" : "font-semibold"} space-y-2`}>
                        {typeof message.content === 'string' ? (
                          message.content.split(/\n\s*\n/).map((para, idx) => (
                            <p key={idx} className="whitespace-pre-line">{para}</p>
                          ))
                        ) : (
                          <pre className="text-xs bg-gray-50 p-3 rounded-xl border border-gray-100 overflow-x-auto">{JSON.stringify(message.content, null, 2)}</pre>
                        )}
                      </div>
                      <p className={`text-[10px] mt-2.5 ${isUser ? "text-white/50" : "text-gray-400"}`}>{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== CHAT INPUT ====================
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
  recLang?: string;
}

// Minimal SpeechRecognition types to avoid explicit `any`
type RecognitionCtor = new () => ISpeechRecognition;
interface RecognitionAlternative { transcript: string }
interface RecognitionResult { [index: number]: RecognitionAlternative }
interface RecognitionEvent { resultIndex: number; results: RecognitionResult[] }
interface SpeechRecognitionErrorEvent {
  error?: string;
  name?: string;
  message?: string;
}
interface ISpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

export function ChatInput({ value, onChange, onSend, onFileUpload, disabled = false, recLang = 'en-US' }: ChatInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (SR) {
      recognitionRef.current = new SR();
      recognitionRef.current.lang = recLang;
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
    }
  }, [recLang]);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = recLang;
    }
  }, [recLang]);

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const isLocalhost = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
        if (!isLocalhost && typeof window !== 'undefined' && !window.isSecureContext) {
          setMicError('Microphone requires a secure origin (HTTPS).');
          return;
        }

        if (!navigator?.mediaDevices?.getUserMedia) {
          setMicError('Mic not supported. Update your browser.');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicError(null);
        audioChunksRef.current = [];

        const preferredType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : (MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '');
        const mr = new MediaRecorder(stream, preferredType ? { mimeType: preferredType, audioBitsPerSecond: 128000 } : undefined);
        mediaRecorderRef.current = mr;

        mr.ondataavailable = (e: BlobEvent) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        const blobToBase64 = (blob: Blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const dataUrl = reader.result as string;
              const base64 = dataUrl.split(',')[1] || '';
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

        mr.onstop = async () => {
          try {
            const mime = preferredType || 'audio/webm';
            const blob = new Blob(audioChunksRef.current, { type: mime });
            // release mic
            stream.getTracks().forEach((t) => t.stop());
            const audioBase64 = await blobToBase64(blob);

            const resp = await fetch('/api/saarthi-stt', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64, mimeType: blob.type || mime, lang: recLang }),
            });
            if (!resp.ok) {
              const errData = await resp.json().catch(() => ({}));
              throw new Error(`STT failed: ${resp.status} ${JSON.stringify(errData)}`);
            }
            const data = await resp.json();
            const text = (data.transcript || '').trim();
            if (text) {
              onChange((value ? value + ' ' : '') + text);
              setMicError(null);
            } else {
              setMicError('No transcript received. Please try again.');
            }
          } catch (err) {
            console.warn('Transcription error', err);
            setMicError('Transcription failed. Please try again.');
          } finally {
            setIsRecording(false);
          }
        };

        mr.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Unable to access microphone', err);
        setMicError('Unable to access microphone. Please allow mic access.');
        setIsRecording(false);
      }
    } else {
      try { mediaRecorderRef.current?.stop(); } catch {}
      setIsRecording(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (onFileUpload) onFileUpload(file);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-6 pt-4">
      {selectedFile && (
        <div className="mb-4 flex items-center justify-between bg-brand-1/10 border border-brand-1/20 rounded-xl px-3 py-2">
          <div className="flex items-center gap-3">
            {selectedFile.type?.startsWith('image/') ? (
              <Image src={URL.createObjectURL(selectedFile)} alt="preview" className="h-8 w-8 rounded-lg object-cover border border-gray-200" width={32} height={32} unoptimized />
            ) : (
              <div className="h-8 w-8 rounded-lg bg-brand-1/10 flex items-center justify-center">
                <File className="h-4 w-4 text-brand-1" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={clearSelectedFile} className="h-8 w-8 hover:bg-brand-1/10">
            <X className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      )}
      <div className="border-t border-gray-200 mb-4"></div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { if(fileInputRef.current){ fileInputRef.current.accept = '.pdf,.doc,.docx,image/*'; fileInputRef.current.click(); } }}
            className="h-10 w-10 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-[var(--brand-blue-1)] hover:border-[var(--brand-blue-1)] hover:shadow-md hover:bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--brand-blue-1)]"
            title="Attach file"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { if(fileInputRef.current){ fileInputRef.current.accept = 'image/*'; fileInputRef.current.click(); } }}
            className="h-10 w-10 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-[var(--brand-blue-1)] hover:border-[var(--brand-blue-1)] hover:shadow-md hover:bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--brand-blue-1)]"
            title="Add image"
            aria-label="Add image"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-[var(--brand-blue-1)] hover:border-[var(--brand-blue-1)] hover:shadow-md hover:bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--brand-blue-1)]"
            title="Add emoji"
            aria-label="Add emoji"
            onClick={() => setShowEmoji(v => !v)}
          >
            <Smile className="h-5 w-5" />
          </Button>
          {showEmoji && (
            <div className="absolute left-0 bottom-full mb-2 z-10 bg-white/95 border border-gray-200 rounded-2xl shadow-lg p-2 grid grid-cols-8 gap-1">
              {['😀','😃','😄','😁','😊','🙂','😉','🤗','🤔','😎','🧠','📚','✍️','📝','📖','🔍','💡','✅','✨','🙌','👏','👍','🤝','🧮','🧪','🔬','🌍','🇮🇳','🧑‍🏫','👩‍🏫','🎓','🏫','📈','🗣️','🔤','🔠'].map((emo) => (
                <button
                  key={emo}
                  onClick={() => { onChange((value ? value + ' ' : '') + emo); }}
                  className="text-xl h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100"
                  title={emo}
                  aria-label={`Insert ${emo}`}
                >{emo}</button>
              ))}
              <button
                onClick={() => setShowEmoji(false)}
                className="col-span-8 mt-1 text-[11px] text-gray-600 hover:text-gray-800"
                aria-label="Close emoji picker"
              >Close</button>
            </div>
          )}
        </div>
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your question here..."
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="pr-14 pl-6 py-6 h-[52px] rounded-[26px] border-2 border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm focus:border-[var(--brand-blue-1)] focus:ring-2 focus:ring-[var(--brand-blue-1)]"
          />
          {micError && (
            <div className="absolute left-6 -bottom-6 text-xs text-red-600">{micError}</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-lg transition-all duration-200 ${isRecording ? "text-red-600 hover:text-red-700 hover:bg-red-50 ring-2 ring-red-300 animate-pulse" : "text-gray-500 hover:text-[var(--brand-blue-1)] hover:bg-white ring-1 ring-gray-200"}`}
            title={isRecording ? "Stop recording" : "Start recording"}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <Mic className="h-5 w-5" />
          </Button>
        </div>
        <Button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="h-[52px] px-6 rounded-[26px] text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[var(--brand-blue-1)] to-[var(--brand-blue-2)] hover:from-[var(--brand-blue-2)] hover:to-[var(--brand-blue-2)] shadow-md hover:shadow-lg"
        >
          <Send className="h-4 w-4 mr-2" />
          <span className="font-medium text-sm">Send</span>
        </Button>
      </div>
      <div className="flex items-center justify-between pt-1 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 bg-gray-300 rounded-full flex-shrink-0"></span>
          <p className="text-[12px] text-gray-500 leading-relaxed">Saarthi can make mistakes. Please verify important information.</p>
        </div>
        <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-medium">Enter</kbd>
          <span>to send</span>
        </p>
      </div>
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} accept="image/*,.pdf,.doc,.docx" />
    </div>
  );
}

// ==================== QUICK ACTIONS ====================
interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
}

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<QuickAction | null>(null);

  const handleClick = (action: QuickAction, index: number) => {
    setActiveIndex(index);
    setSelected(action);
    onActionClick(action);
    setTimeout(() => {
      setActiveIndex(null);
      setSelected(null);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-5 py-3 bg-gradient-to-br from-brand-1/10 to-brand-2/10 flex-shrink-0 flex flex-col justify-center border-b border-brand-1/20">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mb-0.5">
          <span className="inline-block h-1.5 w-1.5 bg-[var(--brand-blue-1)] rounded-full"></span>
          Quick Help Topics
        </h3>
        <span className="text-[10px] text-gray-500 ml-3">Choose a topic to start</span>
        {selected && (
          <div className="ml-3 mt-2 inline-flex items-center rounded-full border border-[var(--brand-blue-2)] bg-white/80 px-2.5 py-0.5 text-[11px] text-brand-1 shadow-sm transition-opacity duration-300">
            Starting: {selected.label}
          </div>
        )}
      </div>
      <div className="p-4 bg-gradient-to-br from-gray-50 to-white w-full flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5 w-full">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleClick(action, index)}
              className={`group relative flex items-center gap-3 px-3.5 py-4 h-auto bg-white/50 hover:bg-brand-1/10 border-0 transition-all duration-200 rounded-2xl justify-start ${activeIndex === index ? "ring-2 ring-[var(--brand-blue-2)]" : ""}`}
            >
              {activeIndex === index && (
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--brand-blue-1)] to-[var(--brand-blue-2)] opacity-10 animate-pulse pointer-events-none"></span>
              )}
              <div className={`relative p-2 rounded-xl bg-gradient-to-br from-gray-100/80 to-gray-50/80 group-hover:from-[var(--brand-blue-1)]/20 group-hover:to-[var(--brand-blue-2)]/20 transition-all duration-200`}>
                {activeIndex === index && (
                  <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle,var(--brand-blue-2),transparent)] opacity-30 animate-ping"></span>
                )}
                <action.icon className={`h-5 w-5 ${action.color || 'text-gray-700'} group-hover:scale-110 transition-transform duration-200`} />
              </div>
              <span className="text-[15px] font-medium text-gray-700 group-hover:text-brand-1 text-left">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
