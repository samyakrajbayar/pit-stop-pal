import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-3 items-end p-4 bg-card/80 backdrop-blur-sm border-t border-border">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about racing or get help with your studies... 🏎️"
          disabled={disabled}
          className="min-h-[52px] max-h-32 resize-none bg-secondary border-border focus:border-primary focus:ring-primary/20 placeholder:text-muted-foreground"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          size="icon"
          className="h-[52px] w-[52px] bg-racing-gradient hover:opacity-90 shadow-racing transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
