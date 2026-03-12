import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  MessageSquare, 
  Bell, 
  Settings, 
  Search, 
  CheckCircle, 
  Clock, 
  Reply,
  MoreVertical,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  User,
  Archive,
  Trash2,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'admin' | 'user' | 'system' | 'broadcast';
  status: 'sent' | 'delivered' | 'read';
  isFromAdmin?: boolean;
  attachments?: string[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  fromAdmin: boolean;
}

const UserChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'admin',
      senderName: 'NovaSMS Admin',
      content: 'Hello! Welcome to NovaSMSHubs. How can I help you today?',
      timestamp: '10:30 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    },
    {
      id: '2',
      senderId: 'user',
      senderName: 'You',
      content: 'Hi! I need help with my recent order',
      timestamp: '10:32 AM',
      type: 'user',
      status: 'read',
      isFromAdmin: false
    },
    {
      id: '3',
      senderId: 'admin',
      senderName: 'NovaSMS Admin',
      content: 'I\'d be happy to help! Can you provide your order ID?',
      timestamp: '10:33 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    },
    {
      id: '4',
      senderId: 'user',
      senderName: 'You',
      content: 'Sure, my order ID is GOD123WIN',
      timestamp: '10:35 AM',
      type: 'user',
      status: 'read',
      isFromAdmin: false
    },
    {
      id: '5',
      senderId: 'admin',
      senderName: 'NovaSMS Admin',
      content: 'Thank you! Let me check that for you right away.',
      timestamp: '10:36 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    },
    {
      id: '6',
      senderId: 'admin',
      senderName: 'NovaSMS Admin',
      content: 'I can see your order is being processed. You should receive your number within the next 30 minutes.',
      timestamp: '10:38 AM',
      type: 'admin',
      status: 'read',
      isFromAdmin: true
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to NovaSMSHubs!',
      message: 'Your account has been successfully created. Start exploring our services.',
      type: 'success',
      timestamp: '2 hours ago',
      read: false,
      fromAdmin: true
    },
    {
      id: '2',
      title: 'Order Confirmation',
      message: 'Your order GOD123WIN has been confirmed and is being processed.',
      type: 'info',
      timestamp: '1 hour ago',
      read: false,
      fromAdmin: true
    },
    {
      id: '3',
      title: 'System Announcement',
      message: 'Maintenance scheduled for tonight 2AM - 4AM. Services will be temporarily unavailable.',
      type: 'warning',
      timestamp: '3 hours ago',
      read: true,
      fromAdmin: true
    },
    {
      id: '4',
      title: 'Payment Received',
      message: 'Your wallet funding of ₦5,000 has been successfully processed.',
      type: 'success',
      timestamp: '3 hours ago',
      read: true,
      fromAdmin: true
    },
    {
      id: '5',
      title: 'New Feature Available',
      message: 'Check out our new bulk ordering feature for better discounts!',
      type: 'info',
      timestamp: '2 days ago',
      read: true,
      fromAdmin: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications'>('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Calculate unread notifications
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate receiving broadcast messages from admin
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving a new message or notification
      if (Math.random() > 0.95) {
        const isBroadcast = Math.random() > 0.5;
        
        if (isBroadcast) {
          // Add broadcast message to chat
          const broadcastMessage: Message = {
            id: Date.now().toString(),
            senderId: 'admin',
            senderName: 'NovaSMS Admin',
            content: '📢 Important announcement: All users should update their payment methods for better security.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'broadcast',
            status: 'delivered',
            isFromAdmin: true
          };
          setMessages(prev => [...prev, broadcastMessage]);
        } else {
          // Add new notification
          const newNotification: Notification = {
            id: Date.now().toString(),
            title: 'New Update',
            message: 'This is a simulated real-time notification from admin',
            type: 'info',
            timestamp: 'Just now',
            read: false,
            fromAdmin: true
          };
          setNotifications(prev => [newNotification, ...prev]);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'user',
      status: 'sent',
      isFromAdmin: false
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'admin',
        senderName: 'NovaSMS Admin',
        content: 'Thank you for your message. Our team will respond shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'admin',
        status: 'delivered',
        isFromAdmin: true
      };
      setMessages(prev => [...prev, adminResponse]);
    }, 3000);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, read: true }
        : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notif =>
    notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <Bell className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2" />
                Support Chat
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'chat' 
                      ? 'bg-nova-primary text-black' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                    activeTab === 'notifications' 
                      ? 'bg-nova-primary text-black' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromAdmin ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'broadcast' 
                      ? 'bg-yellow-100 border-2 border-yellow-300 text-yellow-900'
                      : message.isFromAdmin 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'bg-nova-primary text-black'
                  }`}>
                    {message.isFromAdmin && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-6 h-6 ${
                          message.type === 'broadcast' 
                            ? 'bg-yellow-500' 
                            : 'bg-nova-primary'
                        } rounded-full flex items-center justify-center`}>
                          {message.type === 'broadcast' ? (
                            <Bell className="w-3 h-3 text-white" />
                          ) : (
                            <User className="w-3 h-3 text-black" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{message.senderName}</span>
                          {message.type === 'broadcast' && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                              Broadcast
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {!message.isFromAdmin && (
                        <div className="flex items-center space-x-1">
                          {message.status === 'sent' && <Clock className="w-3 h-3" />}
                          {message.status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                          {message.status === 'read' && <CheckCircle className="w-3 h-3 text-blue-500" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
                  placeholder="Type your message..."
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
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {/* Notifications Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-nova-primary hover:text-nova-secondary font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-500">You're all caught up! Check back later for new updates.</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`bg-white rounded-lg shadow-sm border p-4 transition-all hover:shadow-md ${
                        notification.read ? 'border-gray-200 opacity-75' : 'border-nova-primary bg-nova-primary/5'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">{notification.timestamp}</span>
                                {notification.fromAdmin && (
                                  <span className="text-xs bg-nova-primary text-black px-2 py-1 rounded-full">
                                    From Admin
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                  title="Mark as read"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Delete notification"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChatPage;
