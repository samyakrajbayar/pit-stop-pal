import { useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { RacingHeader } from "./RacingHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { WelcomeMessage } from "./WelcomeMessage";
import { SpeedLines } from "./SpeedLines";
import { useRacingChat } from "@/hooks/useRacingChat";
import { Button } from "./ui/button";

export const RacingChat = () => {
  const { messages, isLoading, sendMessage, clearChat } = useRacingChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isStreamingLastMessage =
    isLoading && messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <SpeedLines />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <RacingHeader />

      {/* Messages area */}
      <div className="relative flex-1 overflow-y-auto racing-scrollbar">
        {messages.length === 0 ? (
          <WelcomeMessage onSuggestionClick={sendMessage} />
        ) : (
          <div className="flex flex-col gap-4 p-4 md:p-6">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
                isStreaming={
                  isStreamingLastMessage && index === messages.length - 1
                }
              />
            ))}
            {isLoading && !isStreamingLastMessage && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Clear chat button */}
      {messages.length > 0 && (
        <div className="absolute top-20 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      )}

      {/* Input area */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};
