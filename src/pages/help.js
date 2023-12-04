import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import TopNavbar from "../components/Navbar/topNavbar";
import './help.css';
import '../components/theme_color.css';
import '../pages/dashboard.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    const newMessage = {
      position: 'right',
      type: 'text',
      text: inputText,
      date: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');

    // Handle chatbot responses here (e.g., call an API to get responses)
    handleChatbotResponse(inputText);
  };

  const handleChatbotResponse = (userInput) => {
    // Simulate chatbot response (replace with actual logic or API call)
    const botResponse = getBotResponse(userInput);

    const newBotMessage = {
      position: 'left',
      type: 'text',
      text: botResponse,
      date: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };

  const getBotResponse = (userInput) => {
    // Replace with actual chatbot logic or API call
    // Here, a simple example is used
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      return 'Hello there! How can I assist you today?';
    } else if (lowerCaseInput.includes('how are you')) {
      return 'I am just a bot, but thanks for asking!';
    } else if (lowerCaseInput.includes('can you help me')) {
      return 'Yes, what do you need help with?';
    } else {
      return 'I did not understand that. Please ask another question.';
    }
  };

  // Add a greeting message when the component mounts
  useEffect(() => {
    const greetingMessage = {
      position: 'left',
      type: 'text',
      text: 'Hello! I am your chatbot. Feel free to ask me anything.',
      date: new Date(),
    };

    setMessages([greetingMessage]);
  }, []);

  return (
    <>
     
     <TopNavbar className="top_Navbar"/>
      <div className="app_body">
      <Navbar />
      <div className='dashboardBody'>
        <div className='chatbotBody shadowBox'>
          <div className='display_message'>
            {messages.map((message, index) => (
              <div key={index} className={`message-container ${message.position === 'right' ? 'right' : ''}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className='input_message'>
            <input
              type='text'
              value={inputText}
              onChange={handleInputChange}
              placeholder='Type your message...'
            />
            <button onClick={handleSendMessage} className='sendMessage_button'>
              Send
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Chatbot;