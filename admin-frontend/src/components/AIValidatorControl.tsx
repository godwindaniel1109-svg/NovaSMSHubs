import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Bot, 
  Cpu, 
  Zap, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Power, 
  Globe, 
  Server, 
  Database, 
  Wifi, 
  WifiOff,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Ban,
  UserPlus,
  UserMinus,
  MessageSquare,
  Bell,
  FileText,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Trash2,
  Edit,
  Filter,
  Search,
  MoreVertical,
  Play,
  Pause,
  Square,
  Circle,
  Volume2,
  VolumeX,
  Info,
  Target,
  Sparkles,
  Network,
  Cloud,
  HardDrive,
  Monitor,
  Smartphone,
  Shield,
  Users,
  DollarSign,
  CreditCard,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface AISystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
  activeUsers: number;
  serverStatus: 'online' | 'offline' | 'maintenance';
  lastBackup: string;
  aiHealth: number;
  aiModelsActive: number;
  aiProcessingSpeed: number;
}

interface AIInsight {
  id: string;
  type: 'performance' | 'security' | 'user_behavior' | 'system_health' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  aiModel: string;
  actionable: boolean;
  suggestedAction?: string;
}

interface AIPrediction {
  id: string;
  category: 'users' | 'revenue' | 'traffic' | 'issues' | 'growth';
  prediction: string;
  confidence: number;
  timeframe: string;
  impact: 'positive' | 'negative' | 'neutral';
  accuracy: number;
  historicalData: number[];
}

interface AIModel {
  id: string;
  name: string;
  type: 'analytics' | 'security' | 'automation' | 'prediction' | 'monitoring';
  status: 'active' | 'training' | 'inactive' | 'error';
  accuracy: number;
  speed: number;
  uptime: string;
  lastOptimized: string;
  autoMode: boolean;
  notificationsEnabled: boolean;
}

interface AITask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  aiModel: string;
  startTime: string;
  estimatedCompletion: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface AIValidator {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'training' | 'error';
  accuracy: number;
  speed: number;
  lastTrained: string;
  modelType: 'text' | 'image' | 'behavior' | 'fraud' | 'content';
  category: 'security' | 'content' | 'user_behavior' | 'fraud_detection';
  config: AIConfig;
}

interface AIConfig {
  sensitivity: number;
  autoApprove: boolean;
  manualReview: boolean;
  learningRate: number;
  batchSize: number;
  maxRequests: number;
  timeout: number;
}

interface ValidationRule {
  id: string;
  name: string;
  condition: string;
  action: 'allow' | 'block' | 'flag' | 'review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  category: string;
  hitRate: number;
  lastModified: string;
}

interface ValidationStats {
  totalValidations: number;
  successRate: number;
  flaggedItems: number;
  blockedItems: number;
  avgProcessingTime: number;
  uptime: string;
  lastUpdate: string;
}

const AIValidatorControl: React.FC = () => {
  const [selectedValidator, setSelectedValidator] = useState<AIValidator | null>(null);
  const [aiSystemStatus, setAISystemStatus] = useState<AISystemStatus>({
    cpu: 45,
    memory: 62,
    disk: 78,
    uptime: '15 days 8 hours',
    activeUsers: 1247,
    serverStatus: 'online',
    lastBackup: '2 hours ago',
    aiHealth: 96.8,
    aiModelsActive: 8,
    aiProcessingSpeed: 125
  });

  const [aiInsights, setAIInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'performance',
      title: 'AI predicts 23% traffic spike in 2 hours',
      description: 'Based on historical patterns and current user behavior, expect significant traffic increase',
      confidence: 94.2,
      priority: 'high',
      timestamp: '2 mins ago',
      aiModel: 'Traffic Predictor',
      actionable: true,
      suggestedAction: 'Scale up server resources'
    },
    {
      id: '2',
      type: 'security',
      title: 'Unusual login patterns detected',
      description: 'AI identified suspicious login attempts from 3 different regions',
      confidence: 87.5,
      priority: 'critical',
      timestamp: '5 mins ago',
      aiModel: 'Security Monitor',
      actionable: true,
      suggestedAction: 'Enable enhanced authentication'
    },
    {
      id: '3',
      type: 'user_behavior',
      title: 'User engagement dropping in evening hours',
      description: 'AI analysis shows 15% decrease in user activity between 6-9 PM',
      confidence: 91.3,
      priority: 'medium',
      timestamp: '15 mins ago',
      aiModel: 'Behavior Analyzer',
      actionable: true,
      suggestedAction: 'Launch evening engagement campaign'
    },
    {
      id: '4',
      type: 'prediction',
      title: 'Revenue will increase 18% next week',
      description: 'AI predicts strong revenue growth based on current trends',
      confidence: 88.7,
      priority: 'low',
      timestamp: '30 mins ago',
      aiModel: 'Revenue Predictor',
      actionable: false
    }
  ]);

  const [aiPredictions, setAIPredictions] = useState<AIPrediction[]>([
    {
      id: '1',
      category: 'users',
      prediction: '1,450 active users by tomorrow',
      confidence: 92.3,
      timeframe: '24 hours',
      impact: 'positive',
      accuracy: 94.1,
      historicalData: [1200, 1220, 1247, 1280, 1320]
    },
    {
      id: '2',
      category: 'revenue',
      prediction: '$52.8K revenue this week',
      confidence: 89.6,
      timeframe: '7 days',
      impact: 'positive',
      accuracy: 91.2,
      historicalData: [42000, 43500, 45200, 46800, 48500]
    },
    {
      id: '3',
      category: 'issues',
      prediction: '3 potential system issues',
      confidence: 76.4,
      timeframe: '48 hours',
      impact: 'negative',
      accuracy: 82.3,
      historicalData: [0, 1, 2, 1, 3]
    },
    {
      id: '4',
      category: 'growth',
      prediction: '12% user growth next month',
      confidence: 85.7,
      timeframe: '30 days',
      impact: 'positive',
      accuracy: 88.9,
      historicalData: [8, 10, 11, 12, 12]
    }
  ]);

  const [aiModels, setAIModels] = useState<AIModel[]>([
    {
      id: 'traffic_predictor',
      name: 'Traffic Predictor',
      type: 'prediction',
      status: 'active',
      accuracy: 94.1,
      speed: 85,
      uptime: '99.8%',
      lastOptimized: '1 hour ago',
      autoMode: true,
      notificationsEnabled: true
    },
    {
      id: 'security_monitor',
      name: 'Security Monitor',
      type: 'security',
      status: 'active',
      accuracy: 91.7,
      speed: 120,
      uptime: '99.9%',
      lastOptimized: '30 mins ago',
      autoMode: true,
      notificationsEnabled: true
    },
    {
      id: 'behavior_analyzer',
      name: 'Behavior Analyzer',
      type: 'analytics',
      status: 'active',
      accuracy: 89.3,
      speed: 95,
      uptime: '99.7%',
      lastOptimized: '2 hours ago',
      autoMode: true,
      notificationsEnabled: true
    },
    {
      id: 'revenue_predictor',
      name: 'Revenue Predictor',
      type: 'prediction',
      status: 'training',
      accuracy: 88.9,
      speed: 110,
      uptime: '98.5%',
      lastOptimized: '6 hours ago',
      autoMode: false,
      notificationsEnabled: true
    },
    {
      id: 'system_optimizer',
      name: 'System Optimizer',
      type: 'automation',
      status: 'active',
      accuracy: 92.5,
      speed: 75,
      uptime: '99.9%',
      lastOptimized: '15 mins ago',
      autoMode: true,
      notificationsEnabled: true
    },
    {
      id: 'user_classifier',
      name: 'User Classifier',
      type: 'analytics',
      status: 'active',
      accuracy: 90.2,
      speed: 105,
      uptime: '99.6%',
      lastOptimized: '3 hours ago',
      autoMode: true,
      notificationsEnabled: true
    },
    {
      id: 'anomaly_detector',
      name: 'Anomaly Detector',
      type: 'security',
      status: 'active',
      accuracy: 87.8,
      speed: 130,
      uptime: '99.8%',
      lastOptimized: '45 mins ago',
      autoMode: true,
      notificationsEnabled: true
    },
    {
      id: 'performance_monitor',
      name: 'Performance Monitor',
      type: 'monitoring',
      status: 'active',
      accuracy: 95.2,
      speed: 70,
      uptime: '100%',
      lastOptimized: 'Just now',
      autoMode: true,
      notificationsEnabled: true
    }
  ]);

  const [aiTasks, setAITasks] = useState<AITask[]>([
    {
      id: '1',
      name: 'User Behavior Analysis',
      description: 'Analyzing user patterns and engagement metrics',
      status: 'running',
      progress: 67,
      aiModel: 'Behavior Analyzer',
      startTime: '10 mins ago',
      estimatedCompletion: '5 mins',
      priority: 'medium'
    },
    {
      id: '2',
      name: 'Security Scan',
      description: 'Comprehensive security vulnerability assessment',
      status: 'running',
      progress: 34,
      aiModel: 'Security Monitor',
      startTime: '15 mins ago',
      estimatedCompletion: '20 mins',
      priority: 'high'
    },
    {
      id: '3',
      name: 'Revenue Forecast',
      description: 'Predicting revenue trends for next quarter',
      status: 'completed',
      progress: 100,
      aiModel: 'Revenue Predictor',
      startTime: '1 hour ago',
      estimatedCompletion: 'Completed',
      priority: 'low'
    },
    {
      id: '4',
      name: 'System Optimization',
      description: 'AI-powered system resource optimization',
      status: 'pending',
      progress: 0,
      aiModel: 'System Optimizer',
      startTime: 'Queue',
      estimatedCompletion: '10 mins',
      priority: 'medium'
    }
  ]);

  const [aiValidators, setAIValidators] = useState<AIValidator[]>([
    {
      id: 'content_filter',
      name: 'Content Filter',
      description: 'Filters inappropriate content and spam',
      status: 'active',
      accuracy: 94.5,
      speed: 120,
      lastTrained: '2 hours ago',
      modelType: 'content',
      category: 'content',
      config: {
        sensitivity: 75,
        autoApprove: true,
        manualReview: false,
        learningRate: 0.001,
        batchSize: 32,
        maxRequests: 1000,
        timeout: 5000
      }
    },
    {
      id: 'fraud_detection',
      name: 'Fraud Detection',
      description: 'Detects suspicious activities and transactions',
      status: 'active',
      accuracy: 91.2,
      speed: 95,
      lastTrained: '6 hours ago',
      modelType: 'fraud',
      category: 'fraud_detection',
      config: {
        sensitivity: 85,
        autoApprove: false,
        manualReview: true,
        learningRate: 0.002,
        batchSize: 16,
        maxRequests: 500,
        timeout: 10000
      }
    },
    {
      id: 'behavior_analysis',
      name: 'User Behavior Analysis',
      description: 'Analyzes user patterns and anomalies',
      status: 'training',
      accuracy: 87.8,
      speed: 150,
      lastTrained: '1 day ago',
      modelType: 'behavior',
      category: 'user_behavior',
      config: {
        sensitivity: 70,
        autoApprove: true,
        manualReview: false,
        learningRate: 0.003,
        batchSize: 64,
        maxRequests: 2000,
        timeout: 3000
      }
    },
    {
      id: 'image_recognition',
      name: 'Image Recognition',
      description: 'Validates uploaded images and documents',
      status: 'inactive',
      accuracy: 89.3,
      speed: 200,
      lastTrained: '3 days ago',
      modelType: 'image',
      category: 'security',
      config: {
        sensitivity: 80,
        autoApprove: false,
        manualReview: true,
        learningRate: 0.0015,
        batchSize: 8,
        maxRequests: 200,
        timeout: 15000
      }
    }
  ]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAISystemStatus(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20) + 40,
        memory: Math.floor(Math.random() * 15) + 55,
        activeUsers: Math.floor(Math.random() * 100) + 1200,
        aiHealth: Math.min(99.9, Math.max(85, prev.aiHealth + (Math.random() - 0.5) * 2))
      }));

      // Simulate AI insights
      if (Math.random() > 0.7) {
        const newInsight: AIInsight = {
          id: Date.now().toString(),
          type: ['performance', 'security', 'user_behavior', 'system_health', 'prediction'][Math.floor(Math.random() * 5)] as any,
          title: ['AI detected unusual pattern', 'Performance optimization available', 'Security alert', 'User trend identified'][Math.floor(Math.random() * 4)],
          description: 'AI system generated a new insight based on real-time analysis.',
          confidence: Math.floor(Math.random() * 15) + 85,
          priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          timestamp: 'Just now',
          aiModel: aiModels[Math.floor(Math.random() * aiModels.length)].name,
          actionable: Math.random() > 0.3
        };
        setAIInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [aiModels]);

  const toggleAIModel = (modelId: string) => {
    setAIModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' as const }
        : model
    ));
  };

  const toggleAIValidator = (validatorId: string) => {
    setAIValidators(prev => prev.map(validator => 
      validator.id === validatorId 
        ? { ...validator, status: validator.status === 'active' ? 'inactive' : 'active' as const }
        : validator
    ));
  };

  const toggleValidationRule = (ruleId: string) => {
    setValidationRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, enabled: !rule.enabled, lastModified: 'Just now' }
        : rule
    ));
  };

  const updateValidatorConfig = (validatorId: string, config: Partial<AIConfig>) => {
    setAIValidators(prev => prev.map(validator => 
      validator.id === validatorId 
        ? { ...validator, config: { ...validator.config, ...config } }
        : validator
    ));
  };

  const executeAIAction = (insightId: string) => {
    const insight = aiInsights.find(i => i.id === insightId);
    if (insight?.suggestedAction) {
      console.log(`AI executing: ${insight.suggestedAction}`);
      // Remove insight after action
      setAIInsights(prev => prev.filter(i => i.id !== insightId));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="w-8 h-8 mr-3" />
              AI Validator Control Center
            </h1>
            <p className="text-blue-100 mt-2">
              Complete AI validation and intelligence for system management
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{aiSystemStatus.aiHealth}%</div>
            <div className="text-blue-100 text-sm">AI System Health</div>
            <div className="text-blue-200 text-xs mt-1">{aiSystemStatus.aiModelsActive} AI Models Active</div>
          </div>
        </div>
      </div>

      {/* AI System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">AI Health</h3>
            <Brain className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiSystemStatus.aiHealth}%</div>
          <div className="text-xs text-gray-500">Overall AI performance</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">AI Models</h3>
            <Bot className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiSystemStatus.aiModelsActive}</div>
          <div className="text-xs text-gray-500">Active models</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">AI Speed</h3>
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiSystemStatus.aiProcessingSpeed}ms</div>
          <div className="text-xs text-gray-500">Processing time</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">CPU Usage</h3>
            <Cpu className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiSystemStatus.cpu}%</div>
          <div className="text-xs text-gray-500">AI-optimized</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">Active Users</h3>
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiSystemStatus.activeUsers.toLocaleString()}</div>
          <div className="text-xs text-gray-500">AI-monitored</div>
        </div>
      </div>

      {/* AI Insights & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
              AI Insights
            </h2>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${aiInsights.filter(i => i.priority === 'critical').length > 0 ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className="text-sm text-gray-500">{aiInsights.length} Active</span>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedInsight(insight)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{insight.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(insight.priority)}`}>
                    {insight.priority.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>AI: {insight.aiModel}</span>
                    <span>Confidence: {insight.confidence}%</span>
                    <span>{insight.timestamp}</span>
                  </div>
                  {insight.actionable && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        executeAIAction(insight.id);
                      }}
                      className="px-3 py-1 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700"
                    >
                      Execute AI Action
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-600" />
              AI Predictions
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Target className="w-4 h-4" />
                <span>AI Forecast</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {aiPredictions.map((prediction) => (
              <div key={prediction.id} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm capitalize">{prediction.category}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">{prediction.prediction}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getImpactColor(prediction.impact)}`}>
                      {prediction.confidence}%
                    </div>
                    <div className="text-xs text-gray-500">Confidence</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Timeframe: {prediction.timeframe}</span>
                    <span>Accuracy: {prediction.accuracy}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(prediction.confidence / 20) ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Models & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Models */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Bot className="w-6 h-6 mr-2 text-green-600" />
              AI Models
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoMode(!autoMode)}
                className={`p-2 rounded-lg transition-colors ${
                  autoMode ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
                title={autoMode ? 'Auto Mode ON' : 'Auto Mode OFF'}
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
                title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {aiModels.map((model) => (
              <div
                key={model.id}
                className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-xs">{model.name}</h3>
                  <button
                    onClick={() => toggleAIModel(model.id)}
                    className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                      model.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                      model.status === 'active' ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-900 capitalize">{model.type}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Accuracy</span>
                    <span className="font-medium text-gray-900">{model.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Speed</span>
                    <span className="font-medium text-gray-900">{model.speed}ms</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Uptime</span>
                    <span className="font-medium text-gray-900">{model.uptime}</span>
                  </div>
                </div>
                
                <div className={`text-xs px-2 py-1 rounded-full font-medium mt-2 ${getStatusColor(model.status)}`}>
                  {model.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-orange-600" />
              AI Tasks
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCw className="w-4 h-4" />
              <span>Auto-running</span>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {aiTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{task.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.status === 'running' ? 'text-blue-600 bg-blue-100' :
                    task.status === 'completed' ? 'text-green-600 bg-green-100' :
                    task.status === 'failed' ? 'text-red-600 bg-red-100' :
                    'text-gray-600 bg-gray-100'
                  }`}>
                    {task.status.toUpperCase()}
                  </span>
                </div>
                
                {task.status === 'running' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>AI: {task.aiModel}</span>
                  <span>{task.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Validator Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-purple-600" />
            AI Validator Controls
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Brain className="w-4 h-4" />
            <span>Validation models and rules</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Validators */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI Validation Models</h3>
            <div className="space-y-4">
              {aiValidators.map((validator) => (
                <div
                  key={validator.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(validator.status)}`}>
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{validator.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(validator.status)}`}>
                            {validator.status.toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(validator.category)}`}>
                            {validator.category.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAIValidator(validator.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        validator.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        validator.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{validator.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Accuracy</span>
                      <span className="font-medium text-gray-900">{validator.accuracy}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Speed</span>
                      <span className="font-medium text-gray-900">{validator.speed}ms</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Last Trained</span>
                      <span className="font-medium text-gray-900">{validator.lastTrained}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Sensitivity</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={validator.config.sensitivity}
                        onChange={(e) => updateValidatorConfig(validator.id, { sensitivity: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <div className="text-center text-xs text-gray-600">{validator.config.sensitivity}%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Learning Rate</span>
                      <input
                        type="number"
                        step="0.001"
                        value={validator.config.learningRate}
                        onChange={(e) => updateValidatorConfig(validator.id, { learningRate: parseFloat(e.target.value) })}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Batch Size</span>
                      <input
                        type="number"
                        value={validator.config.batchSize}
                        onChange={(e) => updateValidatorConfig(validator.id, { batchSize: parseInt(e.target.value) })}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Auto-Approve</span>
                      <button
                        onClick={() => updateValidatorConfig(validator.id, { autoApprove: !validator.config.autoApprove })}
                        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                          validator.config.autoApprove ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                          validator.config.autoApprove ? 'translate-x-4' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Manual Review</span>
                      <button
                        onClick={() => updateValidatorConfig(validator.id, { manualReview: !validator.config.manualReview })}
                        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                          validator.config.manualReview ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                          validator.config.manualReview ? 'translate-x-4' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Rules */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Validation Rules</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rule Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Condition</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Hit Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {validationRules.map((rule) => (
                    <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{rule.name}</div>
                          <div className="text-sm text-gray-500">{rule.category}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{rule.condition}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rule.action === 'block' ? 'bg-red-100 text-red-700' :
                          rule.action === 'flag' ? 'bg-yellow-100 text-yellow-700' :
                          rule.action === 'review' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {rule.action.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                          {rule.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{rule.hitRate}%</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleValidationRule(rule.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            rule.enabled ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            rule.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Save Configuration
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Validator Configuration Modal */}
      {selectedValidator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedValidator.name} Configuration</h2>
              <button
                onClick={() => setSelectedValidator(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sensitivity (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedValidator.config.sensitivity}
                    onChange={(e) => updateValidatorConfig(selectedValidator.id, { sensitivity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{selectedValidator.config.sensitivity}%</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Learning Rate</label>
                  <input
                    type="number"
                    step="0.001"
                    value={selectedValidator.config.learningRate}
                    onChange={(e) => updateValidatorConfig(selectedValidator.id, { learningRate: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                  <input
                    type="number"
                    value={selectedValidator.config.batchSize}
                    onChange={(e) => updateValidatorConfig(selectedValidator.id, { batchSize: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Requests</label>
                  <input
                    type="number"
                    value={selectedValidator.config.maxRequests}
                    onChange={(e) => updateValidatorConfig(selectedValidator.id, { maxRequests: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Auto-Approve</div>
                    <div className="text-sm text-gray-500">Automatically approve valid items</div>
                  </div>
                  <button
                    onClick={() => updateValidatorConfig(selectedValidator.id, { autoApprove: !selectedValidator.config.autoApprove })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      selectedValidator.config.autoApprove ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      selectedValidator.config.autoApprove ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Manual Review</div>
                    <div className="text-sm text-gray-500">Require manual review for flagged items</div>
                  </div>
                  <button
                    onClick={() => updateValidatorConfig(selectedValidator.id, { manualReview: !selectedValidator.config.manualReview })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      selectedValidator.config.manualReview ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      selectedValidator.config.manualReview ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedValidator(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIValidatorControl;
