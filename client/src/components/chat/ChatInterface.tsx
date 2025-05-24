import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Heart, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch chat history
  const { data: chatHistory, isLoading } = useQuery({
    queryKey: ["/api/chat/history"],
    retry: false,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat/message", { message });
      return response.json();
    },
    onSuccess: (data) => {
      // Add bot response to messages
      const botMessage: Message = {
        id: Date.now().toString() + "_bot",
        type: "bot",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Invalidate chat history to refresh
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Load chat history on component mount
  useEffect(() => {
    if (chatHistory && Array.isArray(chatHistory)) {
      const formattedMessages: Message[] = [];
      
      // Add welcome message first
      formattedMessages.push({
        id: "welcome",
        type: "bot",
        content: "Hello! I'm AshaAI, your career companion. I'm here to help you with course recommendations, resume building, job search tips, and career guidance. How can I assist you today?",
        timestamp: new Date(),
      });

      // Add chat history in reverse order (newest first from DB, but we want chronological order)
      chatHistory.reverse().forEach((msg: any) => {
        formattedMessages.push(
          {
            id: `${msg.id}_user`,
            type: "user",
            content: msg.message,
            timestamp: new Date(msg.timestamp),
          },
          {
            id: `${msg.id}_bot`,
            type: "bot",
            content: msg.response,
            timestamp: new Date(msg.timestamp),
          }
        );
      });

      setMessages(formattedMessages);
    } else if (!isLoading) {
      // No chat history, show welcome message
      setMessages([{
        id: "welcome",
        type: "bot",
        content: "Hello! I'm AshaAI, your career companion. I'm here to help you with course recommendations, resume building, job search tips, and career guidance. How can I assist you today?",
        timestamp: new Date(),
      }]);
    }
  }, [chatHistory, isLoading]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    const message = inputMessage.trim();
    if (!message) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Send to API
    sendMessageMutation.mutate(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionQuestions = [
    "I want to learn Java",
    "Help me build a resume",
    "Find me a mentor",
    "Career change advice",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  if (isLoading) {
    return (
      <Card className="h-[calc(100vh-120px)] flex items-center justify-center">
        <CardContent>
          <p className="text-gray-500">Loading chat history...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[calc(100vh-120px)] flex flex-col">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
            <Heart className="text-white h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AshaAI Assistant</h2>
            <p className="text-sm text-gray-500">Your personal career companion</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            {message.type === "user" ? (
              <>
                <div className="flex-1"></div>
                <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-lg p-4 max-w-md">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gray-300">
                    <User className="text-gray-600 h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-teal-600">
                    <Heart className="text-white h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-4 max-w-md">
                  <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                </div>
              </>
            )}
          </div>
        ))}
        {sendMessageMutation.isPending && (
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-teal-600">
                <Heart className="text-white h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-lg p-4 max-w-md">
              <p className="text-gray-800">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            className="flex-1"
            disabled={sendMessageMutation.isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || sendMessageMutation.isPending}
            className="bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestionQuestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm"
              disabled={sendMessageMutation.isPending}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
