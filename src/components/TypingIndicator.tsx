import { Flag } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in-up">
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary border border-border">
        <Flag className="w-5 h-5 text-primary" />
      </div>

      {/* Typing bubble */}
      <div className="message-bot px-4 py-3 shadow-lg">
        <div className="flex gap-1.5 items-center h-5">
          <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
          <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
          <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
        </div>
      </div>
    </div>
  );
};
