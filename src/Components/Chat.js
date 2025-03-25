import React, { useState, useEffect } from 'react';
import '../Styles/Chat.css';
const ChatComponent = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [contactedPartnerIds, setContactedPartnerIds] = useState(new Set());

  const partners = [
    { 
      id: 1, 
      name: 'John Doe', 
      avatar: 'https://i.pravatar.cc/150?img=1',
      online: true, 
      lastMessage: 'Hey there!' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      avatar: 'https://i.pravatar.cc/150?img=3',
      online: false, 
      lastMessage: 'See you tomorrow!' 
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      avatar: 'https://i.pravatar.cc/150?img=5',
      online: true, 
      lastMessage: 'Thanks!' 
    },
  ];

  useEffect(() => {
    const initialMessages = partners.reduce((acc, partner) => {
      acc[partner.id] = acc[partner.id] || [];
      return acc;
    }, {});
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedPartner) return;

    const newMsg = {
      id: messages[selectedPartner.id].length + 1,
      text: newMessage,
      sender: 'me',
    };

    setMessages(prev => ({
      ...prev,
      [selectedPartner.id]: [...(prev[selectedPartner.id] || []), newMsg]
    }));
    
    setContactedPartnerIds(prev => new Set([...prev, selectedPartner.id]));
    setNewMessage('');
  };

  const uncontactedPartners = partners.filter(
    partner => !contactedPartnerIds.has(partner.id)
  );

  return (
    <div className="chat-container">
      {/* Contacts Sidebar */}
      <div className="chat-sidebar">
        {/* New Connections */}
        {uncontactedPartners.length > 0 && (
          <div className="uncontacted-section">
            <div className="section-title">New Connections</div>
            <div className="uncontacted-bubbles">
              {uncontactedPartners.map(partner => (
                <div
                  key={partner.id}
                  className="avatar-bubble"
                  onClick={() => setSelectedPartner(partner)}
                >
                  <img 
                    src={partner.avatar} 
                    alt={partner.name} 
                    className="avatar-image"
                  />
                  {partner.online && <div className="online-status" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages List */}
        <div className="contacted-section">
          <div className="section-title">Messages</div>
          <div className="contact-list">
            {partners.filter(p => contactedPartnerIds.has(p.id)).map(partner => (
              <div
                key={partner.id}
                className={`contact-item ${selectedPartner?.id === partner.id ? 'active' : ''}`}
                onClick={() => setSelectedPartner(partner)}
              >
                <div className="avatar-container">
                  <img 
                    src={partner.avatar} 
                    alt={partner.name} 
                    className="avatar-image"
                  />
                  {partner.online && <div className="online-status" />}
                </div>
                <div className="contact-info">
                  <div className="contact-name">{partner.name}</div>
                  <div className="last-message">{partner.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {selectedPartner ? (
          <>
            <div className="chat-header">
              <div className="header-avatar">
                <img 
                  src={selectedPartner.avatar} 
                  alt={selectedPartner.name} 
                  className="avatar-image"
                />
                {selectedPartner.online && <div className="online-status" />}
              </div>
              <div className="header-info">
                <div className="contact-name">{selectedPartner.name}</div>
                <div className="contact-status">
                  {selectedPartner.online ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            <div className="messages-container">
              {(messages[selectedPartner.id] || []).map(message => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">{message.text}</div>
                </div>
              ))}
            </div>

            <form className="message-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="empty-chat">
            <div className="empty-icon">💬</div>
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;