import React, { useState, useEffect, useRef } from "react";
import { Command } from "@/components/ui/command";
import {
  Terminal,
  ChevronRight,
  XCircle,
  Sun,
  Moon,
  History,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

type CommandBarProps = {
  onCommand?: (command: string) => void;
  commands?: string[];
  prompt?: string;
};

const MAX_HISTORY = 50;

const CommandBar = ({
  onCommand = () => {},
  commands = [
    "about",
    "projects",
    "skills",
    "dashboard",
    "timeline",
    "contact",
    "help",
    "theme",
  ],
  prompt = "visitor@portfolio:~$",
}: CommandBarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("commandHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandBarRef = useRef<HTMLDivElement>(null);
  const tempInputRef = useRef("");

  useEffect(() => {
    localStorage.setItem("commandHistory", JSON.stringify(commandHistory));
  }, [commandHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandBarRef.current &&
        !commandBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setShowHistory(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addToHistory = (cmd: string) => {
    if (
      cmd.trim() &&
      (commandHistory.length === 0 || commandHistory[0] !== cmd)
    ) {
      setCommandHistory((prev) => [cmd, ...prev.slice(0, MAX_HISTORY - 1)]);
    }
    setHistoryIndex(-1);
  };

  const handleCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();

    if (normalizedCmd === "history") {
      setShowHistory(true);
      return;
    }

    if (normalizedCmd === "clear") {
      setCommandHistory([]);
      setError("Command history cleared");
      return;
    }

    if (normalizedCmd === "help") {
      setError(
        `Available commands: ${[...commands, "history", "clear"].join(", ")}`,
      );
      return;
    }

    if (normalizedCmd === "theme") {
      toggleTheme();
      setError(`Theme switched to ${theme === "dark" ? "light" : "dark"} mode`);
      addToHistory(cmd);
      return;
    }

    if (!commands.includes(normalizedCmd)) {
      setError(
        `Command not found: ${cmd}. Type 'help' for available commands.`,
      );
      return;
    }

    addToHistory(cmd);
    onCommand(normalizedCmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showHistory) {
      if (e.key === "Escape") {
        setShowHistory(false);
        return;
      }
      return;
    }

    if (showSuggestions && filteredCommands.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0,
          );
          return;
        case "ArrowUp":
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1,
          );
          return;
        case "Tab":
          e.preventDefault();
          if (selectedSuggestionIndex >= 0) {
            setInput(filteredCommands[selectedSuggestionIndex]);
            setShowSuggestions(false);
          }
          return;
        case "Enter":
          if (selectedSuggestionIndex >= 0) {
            e.preventDefault();
            const selectedCommand = filteredCommands[selectedSuggestionIndex];
            setInput("");
            setShowSuggestions(false);
            handleCommand(selectedCommand);
            return;
          }
      }
    }

    switch (e.key) {
      case "Enter":
        if (input.trim()) {
          handleCommand(input.trim());
          setInput("");
          setShowSuggestions(false);
        }
        break;
      case "Escape":
        setError(null);
        setInput("");
        setShowSuggestions(false);
        break;
      case "ArrowUp":
        if (!showSuggestions) {
          e.preventDefault();
          if (historyIndex === -1) {
            tempInputRef.current = input;
          }
          if (historyIndex < commandHistory.length - 1) {
            setHistoryIndex((prev) => prev + 1);
            setInput(commandHistory[historyIndex + 1]);
          }
        }
        break;
      case "ArrowDown":
        if (!showSuggestions) {
          e.preventDefault();
          if (historyIndex > 0) {
            setHistoryIndex((prev) => prev - 1);
            setInput(commandHistory[historyIndex - 1]);
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setInput(tempInputRef.current);
          }
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1);
  };

  const filteredCommands = commands.filter((cmd) =>
    cmd.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <div
      ref={commandBarRef}
      className="fixed top-0 left-0 w-full bg-background z-50 border-b border-primary"
    >
      <Command className="h-[62px] bg-transparent">
        <div className="flex items-center px-4 h-full">
          <Terminal className="w-4 h-4 text-primary mr-2" />
          <span className="font-mono text-primary mr-2">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none font-mono text-foreground placeholder:text-muted-foreground"
            placeholder="Type a command or 'help'..."
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 hover:text-primary transition-colors"
              title="Show command history"
            >
              <History className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:text-primary transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="absolute top-full left-0 w-full p-2 bg-destructive/10 border-t border-destructive">
            <span className="font-mono text-sm text-destructive">{error}</span>
          </div>
        )}

        {showSuggestions && input && filteredCommands.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-background border-t border-primary">
            {filteredCommands.map((cmd, index) => (
              <div
                key={cmd}
                className={`px-4 py-2 font-mono cursor-pointer ${index === selectedSuggestionIndex ? "bg-primary/10 text-primary" : "hover:bg-primary/5"}`}
                onClick={() => {
                  setInput("");
                  setShowSuggestions(false);
                  handleCommand(cmd);
                }}
              >
                {cmd}
              </div>
            ))}
          </div>
        )}

        {showHistory && (
          <div className="absolute top-full left-0 w-full bg-background border-t border-primary max-h-[300px] overflow-y-auto">
            <div className="p-2 border-b border-primary font-mono text-sm text-primary">
              Command History
              <button
                onClick={() => setShowHistory(false)}
                className="float-right hover:text-primary/80"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            {commandHistory.length === 0 ? (
              <div className="p-4 text-center font-mono text-muted-foreground">
                No commands in history
              </div>
            ) : (
              commandHistory.map((cmd, index) => (
                <div
                  key={index}
                  className="px-4 py-2 font-mono cursor-pointer hover:bg-primary/5"
                  onClick={() => {
                    setInput(cmd);
                    setShowHistory(false);
                    inputRef.current?.focus();
                  }}
                >
                  {cmd}
                </div>
              ))
            )}
          </div>
        )}
      </Command>
    </div>
  );
};

export default CommandBar;
