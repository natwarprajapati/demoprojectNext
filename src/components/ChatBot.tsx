import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { colors } = useTheme();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
    
        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
    
        try {
            const response = await fetch('https://chatgpt-api.shn.hk/v1/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [...messages.map(m => ({role: m.role, content: m.content})), userMessage],
                }),
            });
    
            const data = await response.json();
            const assistantMessage = data.choices?.[0]?.message?.content || "No response";
            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, the free API is not responding. Try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={`flex flex-col h-[600px] w-full max-w-2xl mx-auto ${colors?.cardBg} rounded-lg shadow-lg`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                                ? `${colors?.primary} text-white`
                                : `${colors?.cardBg} ${colors?.text} border ${colors?.border}`
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className={`${colors?.cardBg} ${colors?.text} border ${colors?.border} rounded-lg p-3`}>
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className={`flex-1 p-2 rounded-lg border ${colors?.border} ${colors?.text} ${colors?.cardBg} focus:outline-none focus:ring-2 focus:ring-${colors?.primary}`}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg ${colors?.primary} text-white font-medium hover:opacity-90 disabled:opacity-50`}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
} 