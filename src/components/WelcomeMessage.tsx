import { Flag, BookOpen, Trophy, Zap } from "lucide-react";

const suggestions = [
  {
    icon: Flag,
    text: "Explain the physics behind drafting in NASCAR",
  },
  {
    icon: BookOpen,
    text: "Help me study for my math test with racing examples",
  },
  {
    icon: Trophy,
    text: "Who are the greatest F1 drivers of all time?",
  },
  {
    icon: Zap,
    text: "How do hybrid engines work in modern F1 cars?",
  },
];

interface WelcomeMessageProps {
  onSuggestionClick: (text: string) => void;
}

export const WelcomeMessage = ({ onSuggestionClick }: WelcomeMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
      {/* Hero icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-racing-gradient shadow-glow flex items-center justify-center racing-pulse">
          <Flag className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-4 border-background" />
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
        Welcome to the Pit Lane! 🏁
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        I'm PitCrew AI, your racing-obsessed study buddy. Whether you need help
        with homework or want to geek out about motorsports, I've got you
        covered!
      </p>

      {/* Suggestion cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="group flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-200 text-left"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <suggestion.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
