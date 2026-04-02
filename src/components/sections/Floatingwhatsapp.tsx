"use client";

import { useState } from "react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  agentName?: string;
  agentTitle?: string;
  greeting?: string;
  tooltipText?: string;
}

export default function FloatingWhatsApp({
  phoneNumber,
  agentName = "Support Team",
  agentTitle = "Typically replies in minutes",
  greeting = "Hi there! How can we help you today?",
  tooltipText = "Chat with us",
}: FloatingWhatsAppProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [badgeVisible, setBadgeVisible] = useState(true);

  const togglePopup = () => {
    setOpen((prev) => !prev);
    setBadgeVisible(false);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {/* Chat Popup */}
      {open && (
        <div className="flex flex-col w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <WhatsAppIcon size={22} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{agentName}</p>
              <p className="text-white/80 text-xs">{agentTitle}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg leading-none hover:opacity-70 transition-opacity ml-auto"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Message bubble */}
          <div className="bg-[#f0f0f0] px-4 py-4">
            <div className="bg-[#E7F7E1] rounded-tr-2xl rounded-br-2xl rounded-tl-2xl px-3 py-2 max-w-[85%] inline-block">
              <p className="text-gray-800 text-sm leading-relaxed">{greeting}</p>
              <p className="text-gray-400 text-[10px] text-right mt-1">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ✓✓
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="bg-white px-4 pb-4 pt-0 flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#25D366] transition-colors text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 hover:bg-[#20bc5a] active:scale-95 transition-all"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* FAB + Tooltip */}
      <div className="flex items-center gap-3 relative">
        {!open && (
          <span className="bg-white border border-gray-100 shadow-md rounded-full px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
            {tooltipText}
          </span>
        )}

        <button
          onClick={togglePopup}
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#20bc5a] hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Open WhatsApp chat"
          style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.45)" }}
        >
          {open ? <CloseIcon /> : <WhatsAppIcon size={28} color="white" />}
        </button>

        {/* Notification badge */}
        {badgeVisible && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
            1
          </span>
        )}
      </div>
    </div>
  );
}

function WhatsAppIcon({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.518 3.658 1.418 5.167L2 22l4.985-1.407A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 01-4.047-1.102l-.29-.172-3.002.847.833-2.942-.19-.3A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}