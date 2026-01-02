import { Flag, Gauge } from "lucide-react";

export const RacingHeader = () => {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card/80 backdrop-blur-sm">
      {/* Checkered pattern accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-racing-gradient" />
      
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-racing-gradient shadow-racing flex items-center justify-center racing-pulse">
              <Flag className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider text-racing-gradient">
              PITCREW AI
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Your Racing Study Companion
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
          <Gauge className="w-4 h-4 text-primary rpm-gauge" />
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
            Ready to Race
          </span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>
    </header>
  );
};
