/**
 * SLDS Cosmos Icon System
 * Replaces Lucide icons with SLDS-compliant SVG icons
 * Based on Salesforce Lightning Design System icon library
 */

import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
  viewBox?: string;
}

// SLDS Icon Base Component
export const SLDSIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  className = '',
  style = {},
  size = 16,
  children,
  color,
  viewBox = "0 0 24 24"
}) => {
  return (
    <svg
      className={`slds-icon ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fill: color || 'currentColor',
        ...style
      }}
      viewBox={viewBox}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
};

// Activity/Heartbeat Icon (SLDS: activity)
export const ActivityIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// Alert Triangle Icon (SLDS: warning)
export const AlertTriangleIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', ...rest } = props;
  return (
    <SLDSIcon {...rest} color={color}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="currentColor"/>
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </SLDSIcon>
  );
};

// Clock Icon (SLDS: clock)
export const ClockIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </SLDSIcon>
);

// Copy Icon (SLDS: copy)
export const CopyIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// File Edit Icon (SLDS: file)
export const FileEditIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// Search Icon (SLDS: search)
export const SearchIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </SLDSIcon>
);

// Sparkles Icon (SLDS: sparkles)
export const SparklesIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Check Icon (SLDS: check)
export const CheckIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// CheckCircle Icon (SLDS: success)
export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// TrendingUp Icon (SLDS: trending)
export const TrendingUpIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M17 6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// Database Icon (SLDS: database)
export const DatabaseIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Play Icon (SLDS: play)
export const PlayIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
  </SLDSIcon>
);

// Loader Icon (SLDS: spinner)
export const LoaderIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props} className={`slds-spinner ${props.className || ''}`}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.416" strokeDashoffset="31.416" fill="none" opacity="0.3"/>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.416" strokeDashoffset="15.708" fill="none"/>
  </SLDSIcon>
);

// Grid Icon (SLDS: grid)
export const GridIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// ChevronRight Icon (SLDS: chevronright)
export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// ChevronDown Icon (SLDS: chevrondown)
export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// ChevronUp Icon (SLDS: chevronup)
export const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// X Icon (SLDS: close)
export const XIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// Edit Icon (SLDS: edit)
export const EditIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Save Icon (SLDS: save)
export const SaveIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// XCircle Icon (SLDS: error)
export const XCircleIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </SLDSIcon>
);

// Archive Icon (SLDS: archive)
export const ArchiveIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M21 8v13H3V8M1 3h22l-2 5H3L1 3z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// RotateCcw Icon (SLDS: refresh)
export const RotateCcwIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10M23 14l4.64-4.64A9 9 0 0 0 20.49 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// Eye Icon (SLDS: preview)
export const EyeIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Grid3x3 Icon (SLDS: grid)
export const Grid3x3Icon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <rect x="3" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="11" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="19" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="3" y="11" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="11" y="11" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="19" y="11" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="3" y="19" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="11" y="19" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="19" y="19" width="5" height="5" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Star Icon (SLDS: favorite)
export const StarIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
  </SLDSIcon>
);

// Plus Icon (SLDS: add)
export const PlusIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
  </SLDSIcon>
);

// Award Icon (SLDS: award)
export const AwardIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// HelpCircle Icon (SLDS: help)
export const HelpCircleIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </SLDSIcon>
);

// Settings Icon (SLDS: settings)
export const SettingsIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </SLDSIcon>
);

// Bell Icon (SLDS: notification)
export const BellIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// User Icon (SLDS: user)
export const UserIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Filter Icon (SLDS: filterList)
export const FilterIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// AI Icon (Einstein/AI Sparkles)
export const AIIcon: React.FC<IconProps> = ({ size = 16, color, className = '', style = {} }) => {
  const { color: _, ...restStyle } = style as any;
  return (
    <svg
      className={`slds-icon ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fill: color || 'currentColor',
        ...restStyle
      }}
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <path d="M9.37939 7.32426L7.54683 8.23616C6.99626 8.51053 6.55094 8.95438 6.27565 9.50313L5.36072 11.3296C5.23118 11.5906 4.85603 11.5906 4.72648 11.3296L3.81156 9.50313C3.53627 8.95438 3.09095 8.51053 2.54037 8.23616L0.70782 7.32426C0.446026 7.19514 0.446026 6.82123 0.70782 6.69211L2.54037 5.78021C3.09095 5.50584 3.53627 5.06199 3.81156 4.51324L4.72648 2.68675C4.85603 2.42582 5.23118 2.42582 5.36072 2.68675L6.27565 4.51324C6.55094 5.06199 6.99626 5.50584 7.54683 5.78021L9.37939 6.69211C9.64118 6.82123 9.64118 7.19514 9.37939 7.32426ZM13.3765 11.3861L12.5911 10.9934C12.3536 10.8777 12.1647 10.684 12.0459 10.45L11.6519 9.66722C11.5979 9.55424 11.4359 9.55424 11.3793 9.66722L10.9852 10.45C10.8692 10.6867 10.6749 10.875 10.4401 10.9934L9.65468 11.3861C9.54132 11.4399 9.54132 11.6013 9.65468 11.6578L10.4401 12.0505C10.6776 12.1662 10.8665 12.3599 10.9852 12.5939L11.3793 13.3767C11.4333 13.4897 11.5952 13.4897 11.6519 13.3767L12.0459 12.5939C12.162 12.3572 12.3563 12.1689 12.5911 12.0505L13.3765 11.6578C13.4898 11.604 13.4898 11.4426 13.3765 11.3861ZM13.3765 2.3505L12.5911 1.95776C12.3536 1.8421 12.1647 1.64842 12.0459 1.41439L11.6519 0.631609C11.5979 0.51863 11.4359 0.51863 11.3793 0.631609L10.9852 1.41439C10.8692 1.65111 10.6749 1.83941 10.4401 1.95776L9.65468 2.3505C9.54132 2.4043 9.54132 2.5657 9.65468 2.62219L10.4401 3.01492C10.6776 3.13059 10.8665 3.32427 10.9852 3.5583L11.3793 4.34108C11.4333 4.45406 11.5952 4.45406 11.6519 4.34108L12.0459 3.5583C12.162 3.32158 12.3563 3.13328 12.5911 3.01492L13.3765 2.62219C13.4898 2.56839 13.4898 2.40699 13.3765 2.3505Z" fill="currentColor"/>
    </svg>
  );
};

// Data Mapping Icon (SLDS: data_mapping)
export const DataMappingIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </SLDSIcon>
);

// Shield Icon (SLDS: shield)
export const ShieldIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Process Icon (SLDS: process/diamond)
export const ProcessIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 8l-4 4 4 4 4-4-4-4z" fill="currentColor"/>
  </SLDSIcon>
);

// Table Icon (SLDS: table)
export const TableIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// Chart Icon (SLDS: chart/pie)
export const ChartIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Segments Icon (SLDS: segments)
export const SegmentsIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// Light Bulb Icon (SLDS: light_bulb)
export const LightBulbIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6v2H9v-2c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M10 18h4" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// Arrow Left Icon (SLDS: arrow_left)
export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// More Icon (SLDS: more)
export const MoreIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
  </SLDSIcon>
);

// Metrics Icon (from provided SVG - Standard Icons/M/metrics)
export const MetricsIcon: React.FC<IconProps> = (props) => (
  <svg
    width={props.size || 32}
    height={props.size || 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    style={props.style}
  >
    <rect width="32" height="32" rx="4" fill="#1B96FF"/>
    <path d="M23.04 7.04004H8.96004C7.90404 7.04004 7.04004 7.90404 7.04004 8.96004V23.04C7.04004 24.096 7.90404 24.96 8.96004 24.96H23.04C24.096 24.96 24.96 24.096 24.96 23.04V8.96004C24.96 7.90404 24.096 7.04004 23.04 7.04004ZM12.16 21.12C12.16 21.472 11.872 21.76 11.52 21.76H10.88C10.528 21.76 10.24 21.472 10.24 21.12V17.6C10.24 17.248 10.528 16.96 10.88 16.96H11.52C11.872 16.96 12.16 17.248 12.16 17.6V21.12ZM15.36 21.12C15.36 21.472 15.072 21.76 14.72 21.76H14.08C13.728 21.76 13.44 21.472 13.44 21.12V12.8C13.44 12.448 13.728 12.16 14.08 12.16H14.72C15.072 12.16 15.36 12.448 15.36 12.8V21.12ZM18.56 21.12C18.56 21.472 18.272 21.76 17.92 21.76H17.28C16.928 21.76 16.64 21.472 16.64 21.12V10.88C16.64 10.528 16.928 10.24 17.28 10.24H17.92C18.272 10.24 18.56 10.528 18.56 10.88V21.12ZM21.76 21.12C21.76 21.472 21.472 21.76 21.12 21.76H20.48C20.128 21.76 19.84 21.472 19.84 21.12V15.04C19.84 14.688 20.128 14.4 20.48 14.4H21.12C21.472 14.4 21.76 14.688 21.76 15.04V21.12Z" fill="white"/>
  </svg>
);

// File Text Icon (SLDS: file)
export const FileTextIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// Zap/Lightning Icon (SLDS: lightning)
export const ZapIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
  </SLDSIcon>
);

// Email Icon (SLDS: email)
export const EmailIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </SLDSIcon>
);

// Task/New Task Icon (SLDS: new_task)
export const TaskIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 2v6h6M12 18v-6M9 15h6" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// Note/New Note Icon (SLDS: new_note)
export const NoteIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 2v6h6M12 13v-3M9 11h6" stroke="currentColor" strokeWidth="2"/>
  </SLDSIcon>
);

// TrendingDown Icon (SLDS: trending_down)
export const TrendingDownIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M23 18l-9.5-9.5-5 5L1 6M7 18H1v6M22 6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// Minus Icon (SLDS: minus)
export const MinusIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </SLDSIcon>
);

// Edit2 Icon (SLDS: edit)
export const Edit2Icon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// CheckCircle2 Icon (alias for CheckCircleIcon)
export const CheckCircle2Icon: React.FC<IconProps> = CheckCircleIcon;

// Google Drive Icon
export const GoogleDriveIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props} viewBox="0 0 32 32">
    <path d="M8.5 7L16 18.5L23.5 7H8.5Z" fill="#0066DA"/>
    <path d="M23.5 7L31 18.5H16L8.5 7H23.5Z" fill="#00AC47"/>
    <path d="M16 18.5L8.5 30L16 30L23.5 18.5H16Z" fill="#EA4335"/>
    <path d="M8.5 30L16 18.5L8.5 7L1 18.5L8.5 30Z" fill="#FFBA00"/>
  </SLDSIcon>
);

// Book Icon (SLDS: knowledge_base)
export const BookIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M20 2h3.5A2.5 2.5 0 0 1 26 4.5v15a2.5 2.5 0 0 1-2.5 2.5H20" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// World Icon (SLDS: world)
export const WorldIcon: React.FC<IconProps> = (props) => (
  <SLDSIcon {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SLDSIcon>
);

// Additional SLDS icons can be added here as needed
