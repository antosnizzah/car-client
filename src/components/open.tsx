import  { useState } from 'react';
import { CohereClient } from 'cohere-ai';
import { Send, Trash2, XCircle, Bot } from 'lucide-react';

const cohere = new CohereClient({
  token: '5MzUb3cZMJoesmbmUdR9wlTPjAURQWuwykLogjbR', // Your trial API key
});

type Message = {
  role: 'USER' | 'CHATBOT';
  message: string;
};

const CohereChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [, setResponse] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const newChatHistory: Message[] = [...chatHistory, { role: 'USER', message }];
    setChatHistory(newChatHistory);
    setMessage('');
    setLoading(true);

    try {
      const stream = await cohere.chatStream({
        model: 'command-r-plus',
        message,
        temperature: 0.3,
        chatHistory: newChatHistory.map((chat) => ({
          role: chat.role,
          message: chat.message,
        })),
        promptTruncation: 'AUTO',
        connectors: [{ id: 'web-search' }],
      });

      let newResponse = '';
      for await (const chat of stream) {
        if (chat.eventType === 'text-generation') {
          newResponse += chat.text;
        }
      }

      setResponse(newResponse);
      setChatHistory((prev) => [
        ...prev,
        { role: 'CHATBOT', message: newResponse },
      ]);
    } catch (error) {
      console.error('Error communicating with Cohere API:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setResponse(null);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-full flex items-end justify-end p-5">
      <button
        title="Toggle Chat"
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
      >
        <Bot className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-h-3/4 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-purple-500 text-white p-3 text-center font-bold flex justify-between items-center">
            <span>Chatbot</span>
            <div className="flex gap-2">
              <button
                onClick={handleClearChat}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-transform transform hover:scale-105"
                title="Clear Chat"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                title="Toggle Chat"
                onClick={toggleChat}
                className="bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-transform transform hover:scale-105"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-blue-100">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs transition-transform transform ${
                  chat.role === 'USER'
                    ? 'ml-auto bg-purple-600 text-white'
                    : 'mr-auto bg-white text-black border border-gray-300'
                }`}
              >
                {chat.message}
              </div>
            ))}
            {loading && (
              <div className="p-2 rounded-lg max-w-xs mr-auto bg-gray-200 text-gray-800 animate-pulse">
                ...typing
              </div>
            )}
          </div>
          <div className="p-3 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type here..."
              className="flex-1 border border-gray-300 rounded-full p-2 mr-2"
            />
            <button
              title="Toggle Chat"
              onClick={handleSendMessage}
              className="bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600 transition-transform transform hover:scale-105"
              disabled={loading}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CohereChat;
