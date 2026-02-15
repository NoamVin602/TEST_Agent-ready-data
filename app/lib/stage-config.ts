/**
 * Stage Configuration System
 * Manages different stages of the Data Health user story:
 * - day0: Initial state after first scan (45/100 score, critical issues)
 * - goal: Goal achievement state (95/100 score, issues resolved)
 * - continuous: Continuous improvement state (content gaps, unanswered queries)
 */

export type StageType = 'day0' | 'goal' | 'continuous';

export interface TopIssue {
  id: string;
  category: string;
  healthScore: string;
  severity: "high" | "medium" | "low";
  description: string;
}

export interface StageConfig {
  stage: StageType;
  healthScore: number;
  theme: 'warning' | 'success' | 'info';
  lastScanTime: string;
  issues: {
    contradictions: number;
    outdated: number;
    duplicates: number;
    drafts: number;
    contentGaps: number;
    pii: number;
  };
  topIssues: TopIssue[];
  recentActivity: Array<{
    id: number;
    actionType: string;
    description: string;
    actor: string;
    timestamp: string;
    impactScore: string;
  }>;
  chartData: Array<{ date: string; value: number }>;
}

// Day Zero Configuration - Initial State
// Scenario: Brian connects data sources, runs scan, gets instant results
export const DAY_ZERO_CONFIG: StageConfig = {
  stage: 'day0',
  healthScore: 45,
  theme: 'warning',
  lastScanTime: 'a few minutes ago', // Scan just completed
  issues: {
    contradictions: 2,
    outdated: 5,
    duplicates: 3,
    drafts: 1,
    contentGaps: 0,
    pii: 15, // Critical: PII detected in 15 articles
  },
  topIssues: [
    {
      id: 'issue-1',
      category: 'Contradiction',
      healthScore: '+25% Health Score',
      severity: 'high',
      description: 'Conflicting power output information'
    },
    {
      id: 'issue-2',
      category: 'Outdated',
      healthScore: '+3% Health Score',
      severity: 'high',
      description: 'Deprecated product information'
    }
  ],
  recentActivity: [
    {
      id: 1,
      actionType: 'Health Scan Completed',
      description: 'Scan completed - 45/100 score. Critical issues detected.',
      actor: 'System',
      timestamp: 'Just now',
      impactScore: '0'
    },
    {
      id: 2,
      actionType: 'Data Sources Connected',
      description: '3 data sources connected: Technical Docs, Knowledge Base, Engineering PDFs',
      actor: 'Brian',
      timestamp: '5 minutes ago',
      impactScore: '0'
    }
  ],
  chartData: [
    { date: '2.20', value: 32 },
    { date: '2.27', value: 34 },
    { date: '3.06', value: 36 },
    { date: '3.13', value: 38 },
    { date: '3.20', value: 39 },
    { date: '3.27', value: 40 },
    { date: '4.03', value: 41 },
    { date: '4.10', value: 43 },
    { date: '4.17', value: 44 },
    { date: '4.20', value: 45 }
  ]
};

// Goal Achievement Configuration - Score 95/100
export const GOAL_CONFIG: StageConfig = {
  stage: 'goal',
  healthScore: 95,
  theme: 'success',
  lastScanTime: '1 hour ago',
  issues: {
    contradictions: 0,
    outdated: 1,
    duplicates: 0,
    drafts: 0,
    contentGaps: 0,
    pii: 0,
  },
  topIssues: [
    {
      id: 'issue-1',
      category: 'Minor Update',
      healthScore: '+1% Health Score',
      severity: 'low',
      description: 'Update API version reference in documentation'
    }
  ],
  recentActivity: [
    {
      id: 1,
      actionType: 'PII Masked',
      description: '15 articles verified and secured',
      actor: 'System',
      timestamp: '3 hours ago',
      impactScore: '+20'
    },
    {
      id: 2,
      actionType: 'Conflict Resolved',
      description: 'Prioritized Engineering PDF over Web Manual',
      actor: 'Laura (Expert)',
      timestamp: '5 hours ago',
      impactScore: '+10'
    },
    {
      id: 3,
      actionType: 'Outdated Content Archived',
      description: '5 articles archived',
      actor: 'John',
      timestamp: '1 day ago',
      impactScore: '+15'
    },
    {
      id: 4,
      actionType: 'Duplicates Removed',
      description: '3 duplicate entries removed',
      actor: 'System',
      timestamp: '1 day ago',
      impactScore: '+5'
    }
  ],
  chartData: [
    { date: '2.20', value: 45 },
    { date: '2.27', value: 50 },
    { date: '3.06', value: 65 },
    { date: '3.13', value: 70 },
    { date: '3.20', value: 75 },
    { date: '3.27', value: 80 },
    { date: '4.03', value: 85 },
    { date: '4.10', value: 90 },
    { date: '4.17', value: 93 },
    { date: '4.20', value: 95 }
  ]
};

// Continuous Improvement Configuration
export const CONTINUOUS_CONFIG: StageConfig = {
  stage: 'continuous',
  healthScore: 95,
  theme: 'info',
  lastScanTime: '30 minutes ago',
  issues: {
    contradictions: 0,
    outdated: 0,
    duplicates: 0,
    drafts: 1,
    contentGaps: 3,
    pii: 0,
  },
  topIssues: [
    {
      id: 'issue-1',
      category: 'Content Gap',
      healthScore: '+3% Health Score',
      severity: 'medium',
      description: 'Missing inverter maintenance documentation'
    }
  ],
  recentActivity: [
    {
      id: 1,
      actionType: 'Content Gap Identified',
      description: 'Inverter Maintenance - 120 unanswered queries',
      actor: 'System',
      timestamp: '2 hours ago',
      impactScore: '0'
    },
    {
      id: 2,
      actionType: 'Draft Content Generated',
      description: 'Inverter Maintenance Guide (AI-generated)',
      actor: 'System',
      timestamp: '1 hour ago',
      impactScore: '+3'
    },
    {
      id: 3,
      actionType: 'Draft Assigned for Review',
      description: 'Assigned to Laura for expert review',
      actor: 'John',
      timestamp: '45 minutes ago',
      impactScore: '0'
    }
  ],
  chartData: [
    { date: '2.20', value: 45 },
    { date: '2.27', value: 50 },
    { date: '3.06', value: 65 },
    { date: '3.13', value: 70 },
    { date: '3.20', value: 75 },
    { date: '3.27', value: 80 },
    { date: '4.03', value: 85 },
    { date: '4.10', value: 90 },
    { date: '4.17', value: 93 },
    { date: '4.20', value: 95 }
  ]
};

/**
 * Get stage configuration based on environment variable or default to 'day0'
 */
export function getStageConfig(): StageConfig {
  const stage = (process.env.NEXT_PUBLIC_STAGE as StageType) || 'day0';
  
  switch (stage) {
    case 'goal':
      return GOAL_CONFIG;
    case 'continuous':
      return CONTINUOUS_CONFIG;
    case 'day0':
    default:
      return DAY_ZERO_CONFIG;
  }
}
