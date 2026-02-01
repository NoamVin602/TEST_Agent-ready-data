# SLDS Component Audit Report

## Executive Summary

This audit verifies that all components in the `agent-ready-data-nextjs` project are using Salesforce Lightning Design System (SLDS) components and patterns correctly.

**Audit Date:** 2025-01-29  
**Total Components Audited:** 26 component files  
**Status:** ⚠️ **Partially Compliant** - Some components need updates

---

## Component Status Overview

### ✅ Fully SLDS Compliant Components

1. **TabNavigation.tsx** - Uses SLDS tabs blueprint correctly
2. **PageHeader.tsx** - Uses SLDS page header blueprint
3. **DockedComposer.tsx** - Uses SLDS docked composer blueprint
4. **All Button Components** - Using SLDS button classes (Neutral, Brand variants)

### ⚠️ Needs Minor Updates

1. **SeverityBadge.tsx** - Uses custom badge theme classes (acceptable, but should verify against SLDS standards)
2. **RecentActivityTable.tsx** - Uses custom badge classes

### 🔴 Needs Major Updates

1. **LeftNavigation.tsx** - NOT using SLDS vertical navigation blueprint
   - Currently uses custom `slds-navigation__item` classes (not in SLDS)
   - Should use `.slds-nav-vertical` and `.slds-nav-vertical__item` structure
   - Has extensive inline styles that should use SLDS utility classes

2. **ContentGapsView.tsx** - Extensive inline styles
   - Should replace inline styles with SLDS utility classes
   - Filter tabs should use SLDS scoped tabs or pills component
   - Cards should use SLDS card blueprint more consistently

3. **Multiple Components** - Excessive inline styles
   - Many components use inline `style={{}}` instead of SLDS utility classes
   - Should migrate to SLDS spacing, typography, and layout utilities

---

## Detailed Findings

### 1. LeftNavigation Component

**File:** `app/components/shared/LeftNavigation.tsx`

**Issues:**
- ❌ Uses custom class `slds-navigation__item` (not in SLDS)
- ❌ Should use `.slds-nav-vertical` structure
- ❌ Extensive inline styles instead of SLDS utility classes
- ⚠️ Missing proper ARIA labels for navigation

**Required Changes:**
```tsx
// Current (WRONG):
<nav style={{ flex: 1, padding: 0 }}>
  <button className="slds-navigation__item" style={{...}}>

// Should be (CORRECT):
<nav className="slds-nav-vertical">
  <ul className="slds-nav-vertical__list">
    <li className="slds-nav-vertical__item">
      <a className="slds-nav-vertical__action" href="...">
```

**SLDS Blueprint Reference:**
- Component: Vertical Navigation
- Documentation: `components/vertical-navigation.md`
- Required classes: `.slds-nav-vertical`, `.slds-nav-vertical__item`, `.slds-nav-vertical__action`

---

### 2. Badge Components

**Files:**
- `app/components/analysis/SeverityBadge.tsx`
- `app/components/dashboard/RecentActivityTable.tsx`

**Current Implementation:**
- Uses custom classes: `slds-theme_error`, `slds-theme_warning`, `slds-theme_success`
- These are defined in `globals.css` but not standard SLDS

**Status:** ⚠️ Acceptable if CSS is properly defined, but should verify against SLDS badge variants

**SLDS Standard Badge Classes:**
- Base: `.slds-badge`
- Error: Should use `.slds-badge_error` or custom implementation
- Warning: Should use `.slds-badge_warning` or custom implementation
- Success: Should use `.slds-badge_success` or custom implementation

---

### 3. Inline Styles Usage

**Components with Excessive Inline Styles:**

1. **LeftNavigation.tsx** - 200+ lines of inline styles
2. **ContentGapsView.tsx** - 100+ lines of inline styles
3. **ActivityView.tsx** - Multiple inline style objects
4. **DataCurationView.tsx** - Inline styles for layout
5. **HomeView.tsx** - Inline styles for cards and layout
6. **AnalysisView.tsx** - Inline styles for filters and cards

**Recommendation:**
Replace inline styles with SLDS utility classes:
- `display: flex` → `slds-grid` or `slds-grid_vertical`
- `gap: 16px` → `slds-gutters` or spacing utilities
- `padding: 16px` → `slds-p-around_medium`
- `margin: 16px` → `slds-m-around_medium`
- `alignItems: center` → `slds-grid_vertical-align-center`
- `justifyContent: space-between` → `slds-grid_align-spread`

---

### 4. Card Components

**Status:** ✅ Most cards use `.slds-card` class correctly

**Files Using Cards:**
- `DataChunkCard.tsx` - ✅ Uses `slds-card`
- `IssueCard.tsx` - ✅ Uses `slds-card`
- `MetricCard.tsx` - ✅ Uses `slds-card`
- `ContentGapsView.tsx` - ⚠️ Custom card styling (should use SLDS card)

---

### 5. Button Components

**Status:** ✅ All buttons use SLDS button classes correctly

**Verified:**
- Neutral buttons: `slds-button slds-button_neutral` ✅
- Brand buttons: `slds-button slds-button_brand` ✅
- Icon buttons: `slds-button slds-button_icon` ✅
- Proper circular border radius (9999px) ✅

---

### 6. Tab Components

**Status:** ✅ Using SLDS tabs correctly

**Files:**
- `TabNavigation.tsx` - ✅ Uses `slds-tabs_default` blueprint
- `AnalysisView.tsx` - ⚠️ Custom filter tabs (should use SLDS scoped tabs or pills)

---

## Action Items

### Priority 1: Critical (Must Fix)

1. **Replace LeftNavigation with SLDS Vertical Navigation**
   - File: `app/components/shared/LeftNavigation.tsx`
   - Effort: 2-3 hours
   - Impact: High - Core navigation component

### Priority 2: High (Should Fix)

2. **Replace Inline Styles with SLDS Utility Classes**
   - Files: Multiple components
   - Effort: 4-6 hours
   - Impact: Medium - Better maintainability and consistency

3. **Update ContentGapsView Filter Tabs**
   - File: `app/components/views/ContentGapsView.tsx`
   - Use SLDS scoped tabs or pills component
   - Effort: 1-2 hours

### Priority 3: Medium (Nice to Have)

4. **Verify Badge Classes Against SLDS Standards**
   - Files: `SeverityBadge.tsx`, `RecentActivityTable.tsx`
   - Ensure badge variants match SLDS documentation
   - Effort: 1 hour

5. **Add Missing ARIA Labels**
   - Multiple navigation components
   - Effort: 30 minutes

---

## SLDS Component Checklist

### Navigation Components
- [x] Tabs (`TabNavigation.tsx`) - ✅ Using `slds-tabs_default`
- [ ] Vertical Navigation (`LeftNavigation.tsx`) - ❌ Needs update
- [x] Page Header (`PageHeader.tsx`) - ✅ Using `slds-page-header`

### Form Components
- [x] Buttons - ✅ All variants correct
- [x] Inputs - ✅ Using `slds-input`
- [ ] Select/Dropdown - ⚠️ Check if used

### Data Display Components
- [x] Cards - ✅ Using `slds-card`
- [x] Badges - ⚠️ Using custom classes (acceptable)
- [x] Tables - ✅ Using `slds-table`
- [x] Progress Bar - ✅ Using `slds-progress-bar`

### Feedback Components
- [x] Tooltips - ✅ Using `slds-popover_tooltip`
- [x] Docked Composer - ✅ Using `slds-docked-composer`

---

## Recommendations

1. **Immediate Action:** Update `LeftNavigation.tsx` to use SLDS vertical navigation blueprint
2. **Short-term:** Replace inline styles with SLDS utility classes across all components
3. **Long-term:** Establish component review process to ensure SLDS compliance for new components

---

## References

- SLDS Component Documentation: `components/*.md`
- SLDS Vertical Navigation: `components/vertical-navigation.md`
- SLDS Badges: `components/badges.md`
- SLDS Cards: `components/cards.md`
- SLDS Buttons: `components/buttons.md`
- SLDS Tabs: `components/tabs.md`

---

*Generated: 2025-01-29*
