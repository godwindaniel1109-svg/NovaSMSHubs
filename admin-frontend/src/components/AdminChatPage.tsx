import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Users, 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Ban,
  VolumeX,
  Volume2,
  Reply,
  MoreVertical,
  UserPlus,
  Bell,
  Settings,
  Archive,
  Trash2,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  type: 'admin' | 'user' | 'system' | 'notification' | 'broadcast';
  status: 'sent' | 'delivered' | 'read';
  isFromAdmin?: boolean;
  attachments?: string[];
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userStatus: 'online' | 'offline' | 'away' | 'busy';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isMuted: boolean;
  isArchived: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended' | 'muted';
  role: 'user' | 'premium' | 'vip';
  isOnline: boolean;
  lastSeen: string;
  unreadMessages: number;
}

const AdminChatPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      userStatus: 'online',
      lastMessage: 'Thank you for providing the order ID. Let me check that for you right away.',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isMuted: false,
      isArchived: false
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@email.com',
      userStatus: 'online',
      lastMessage: 'I need help with my order',
      lastMessageTime: '1 hour ago',
      unreadCount: 1,
      isMuted: false,
      isArchived: false
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@email.com',
      userStatus: 'offline',
      lastMessage: 'Thanks for the quick support!',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      isMuted: false,
      isArchived: false
    },
    {
      id: '4',
      userId: '4',
      userName: 'Sarah Williams',
      userEmail: 'sarah.williams@email.com',
      userStatus: 'away',
      lastMessage: 'When will my number be ready?',
      lastMessageTime: '5 hours ago',
      unreadCount: 3,
      isMuted: false,
      isArchived: false
    },
    {
      id: '5',
      userId: '5',
      userName: 'David Brown',
      userEmail: 'david.brown@email.com',
      userStatus: 'online',
      lastMessage: 'Payment successful, please confirm',
      lastMessageTime: '6 hours ago',
      unreadCount: 1,
      isMuted: false,
      isArchived: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    // John Doe conversation
    {
      id: '1',
      senderId: 'admin',
      senderName: 'Admin',
      receiverId: '1',
      receiverName: 'John Doe',
      content: 'Hello! I can see your order GOD123WIN is being processed. You should receive your number within the next 30 minutes.',
      timestamp: '10:30 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'John Doe',
      receiverId: 'admin',
      receiverName: 'Admin',
      content: 'Thank you for the quick response!',
      timestamp: '10:32 AM',
      type: 'user',
      status: 'read',
      isFromAdmin: false
    },
    {
      id: '3',
      senderId: 'admin',
      senderName: 'Admin',
      receiverId: '1',
      receiverName: 'John Doe',
      content: 'I see. Can you provide your order ID so I can check the status?',
      timestamp: '10:33 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    },
    {
      id: '4',
      senderId: 'admin',
      senderName: 'Admin',
      receiverId: '1',
      receiverName: 'John Doe',
      content: 'Thank you for providing the order ID. Let me check that for you right away.',
      timestamp: '10:36 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      status: 'active',
      role: 'premium',
      isOnline: true,
      lastSeen: 'Online now',
      unreadMessages: 2
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      status: 'active',
      role: 'user',
      isOnline: false,
      lastSeen: '5 min ago',
      unreadMessages: 0
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      status: 'active',
      role: 'user',
      isOnline: false,
      lastSeen: '2 hours ago',
      unreadMessages: 1
    },
    {
      id: '4',
      name: 'Sarah Jones',
      email: 'sarah.jones@email.com',
      status: 'active',
      role: 'vip',
      isOnline: true,
      lastSeen: 'Online now',
      unreadMessages: 0
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      status: 'active',
      role: 'premium',
      isOnline: false,
      lastSeen: '1 day ago',
      unreadMessages: 3
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [messageType, setMessageType] = useState<'individual' | 'broadcast' | 'notification'>('individual');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConversations(prev => prev.map(conv => ({
        ...conv,
        userStatus: Math.random() > 0.5 ? 'online' : 'offline'
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'admin',
      senderName: 'Admin',
      receiverId: selectedConversation.userId,
      receiverName: selectedConversation.userName,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'admin',
      status: 'sent',
      isFromAdmin: true
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage, lastMessageTime: 'Just now' }
        : conv
    ));

    // Simulate delivery status update
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMsg.id 
          ? { ...msg, status: 'delivered' as const }
          : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMsg.id 
          ? { ...msg, status: 'read' as const }
          : msg
      ));
    }, 2000);
  };

  const handleBroadcast = async () => {
    if (!broadcastMessage.trim()) return;

    if (messageType === 'individual') {
      // Send to single user
      if (selectedUsers.length === 0) return;
      
      const user = users.find(u => u.id === selectedUsers[0]);
      if (user) {
        const message: Message = {
          id: Date.now().toString(),
          senderId: 'admin',
          senderName: 'Admin',
          receiverId: user.id,
          receiverName: user.name,
          content: broadcastMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'admin',
          status: 'sent',
          isFromAdmin: true
        };

        setMessages(prev => [...prev, message]);
      }
    } else if (messageType === 'broadcast') {
      // Send to all users
      users.forEach(user => {
        const message: Message = {
          id: Date.now().toString() + Math.random(),
          senderId: 'admin',
          senderName: 'Admin',
          receiverId: user.id,
          receiverName: user.name,
          content: broadcastMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'broadcast',
          status: 'sent',
          isFromAdmin: true
        };

        setMessages(prev => [...prev, message]);
      });
    } else if (messageType === 'notification') {
      // Send system notification to all users
      users.forEach(user => {
        const message: Message = {
          id: Date.now().toString() + Math.random(),
          senderId: 'admin',
          senderName: 'Admin',
          receiverId: user.id,
          receiverName: user.name,
          content: broadcastMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'notification',
          status: 'sent',
          isFromAdmin: true
        };

        setMessages(prev => [...prev, message]);
      });
    }

    setBroadcastMessage('');
    setSelectedUsers([]);
    setShowNewMessageModal(false);
  };

  const handleUserSelect = (userId: string) => {
    // For individual messaging, only allow one user to be selected
    setSelectedUsers([userId]);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      case 'away':
        return 'bg-yellow-100 text-yellow-800';
      case 'busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Messages
            </h2>
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="New Message"
            >
              <UserPlus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-nova-primary/10 border-l-4 border-l-nova-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-nova-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {conversation.userName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    conversation.userStatus === 'online' ? 'bg-green-500' :
                    conversation.userStatus === 'away' ? 'bg-yellow-500' :
                    conversation.userStatus === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {conversation.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                      <h3 className="font-medium text-gray-900 truncate">{conversation.userName}</h3>
                    </div>
                    <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.userEmail}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-nova-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-nova-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {selectedConversation.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      selectedConversation.userStatus === 'online' ? 'bg-green-500' :
                      selectedConversation.userStatus === 'away' ? 'bg-yellow-500' :
                      selectedConversation.userStatus === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.userName}</h3>
                    <p className="text-sm text-gray-500">{selectedConversation.userEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Voice Call">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Video Call">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="User Info">
                    <Info className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation ? (
                messages
                  .filter(msg => 
                    msg.receiverId === selectedConversation.userId || 
                    msg.senderId === selectedConversation.userId
                  )
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFromAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromAdmin 
                          ? 'bg-nova-primary text-black' 
                          : 'bg-gray-200 text-gray-900'
                      }`}>
                        {!message.isFromAdmin && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {message.senderName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="font-medium text-sm text-gray-700">{message.senderName}</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.isFromAdmin && (
                            <div className="flex items-center space-x-1">
                              {message.status === 'sent' && <Clock className="w-3 h-3" />}
                              {message.status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                              {message.status === 'read' && <CheckCircle className="w-3 h-3 text-blue-500" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Message</h2>
              <button 
                onClick={() => setShowNewMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Message Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="individual"
                      checked={messageType === 'individual'}
                      onChange={(e) => setMessageType(e.target.value as 'individual' | 'broadcast' | 'notification')}
                      className="mr-2"
                    />
                    <span>Individual User</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="broadcast"
                      checked={messageType === 'broadcast'}
                      onChange={(e) => setMessageType(e.target.value as 'individual' | 'broadcast' | 'notification')}
                      className="mr-2"
                    />
                    <span>All Users</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="notification"
                      checked={messageType === 'notification'}
                      onChange={(e) => setMessageType(e.target.value as 'individual' | 'broadcast' | 'notification')}
                      className="mr-2"
                    />
                    <span>System Notification</span>
                  </label>
                </div>
              </div>

              {/* User Selection - Only show for individual messages */}
              {messageType === 'individual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select User {selectedUsers.length > 0 && `(${selectedUsers.length} selected)`}
                </label>
                <div className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelect(user.id)}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          className="rounded border-gray-300 text-nova-primary focus:ring-nova-primary"
                        />
                        <div className="relative">
                          <div className="w-8 h-8 bg-nova-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {user.name.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${
                            user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        {user.unreadMessages > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {user.unreadMessages}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Message Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder={messageType === 'notification' ? 'Enter notification message...' : 'Enter chat message...'}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBroadcast}
                  disabled={!broadcastMessage.trim() || selectedUsers.length === 0}
                  className="px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {messageType === 'notification' ? 'Send Notification' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChatPage;
