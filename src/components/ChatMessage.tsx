import { cn } from "@/lib/utils";
import { Flag, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          isUser
            ? "bg-racing-gradient shadow-racing"
            : "bg-secondary border border-border"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Flag className="w-5 h-5 text-primary" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 shadow-lg",
          isUser ? "message-user" : "message-bot"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse rounded-sm" />
          )}
        </p>
      </div>
    </div>
  );
};
