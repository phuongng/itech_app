import React, { Component } from 'react';
import { MessageBox, MessageList } from 'react-chat-elements';
import './help.css';

class Chatbot extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      inputText: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  handleSendMessage = () => {
    const newMessage = {
      position: 'right',
      type: 'text',
      text: this.state.inputText,
      date: new Date(),
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage],
      inputText: '',
    }));

    // You can handle chatbot responses here
    // For example, you can call an API to get chatbot responses
  }

  

  render() {
    return (
      <div className="chatbot">
       <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={this.state.messages}
        />

        <div className="input-box">
        <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            placeholder="Type your message..."
        />
        <button onClick={this.handleSendMessage}>Send</button>
        </div>

        <MessageBox
            reply={{
                photoURL: 'https://facebook.github.io/react/img/logo.svg',
                title: 'elit magna',
                titleColor: '#8717ae',
                message: 'Aliqua amet incididunt id nostrud',
            }}
            onReplyMessageClick={() => console.log('reply clicked!')}
            position={'left'}
            type={'text'}
            text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
            />
      </div>
    );
  }
}

export default Chatbot;
