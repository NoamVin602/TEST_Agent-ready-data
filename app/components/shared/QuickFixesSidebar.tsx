"use client";

import { useState } from "react";
import { DockedComposer } from "./DockedComposer";

interface QuickFixItem {
  id: string;
  title: string;
  description: string;
  scoreImpact: string;
  scoreColor: "yellow" | "green";
  actionButton: string;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
  iconType: "check" | "archive" | "email" | "note" | "task";
}

const QUICK_FIXES: QuickFixItem[] = [
  {
    id: "contradicting-refund",
    title: "Contradicting refund policies",
    description: "2 documents have conflicting information",
    scoreImpact: "+3% score",
    scoreColor: "yellow",
    actionButton: "Resolve",
    borderColor: "#C23934", // Red
    iconBgColor: "#C23934",
    iconColor: "#FFFFFF",
    iconType: "check",
  },
  {
    id: "archive-stale",
    title: "Archive stale pricing guide",
    description: "Product Guide v2.1 is 8 months outdated",
    scoreImpact: "+2% score",
    scoreColor: "green",
    actionButton: "Archive",
    borderColor: "#FE9339", // Orange
    iconBgColor: "#FE9339",
    iconColor: "#5C4033", // Dark brown
    iconType: "archive",
  },
  {
    id: "duplicate-content",
    title: "Remove duplicate entries",
    description: "3 duplicates found",
    scoreImpact: "+1% score",
    scoreColor: "yellow",
    actionButton: "Resolve",
    borderColor: "#C23934", // Red
    iconBgColor: "#C23934",
    iconColor: "#FFFFFF",
    iconType: "check",
  },
  {
    id: "outdated-content",
    title: "Update outdated documentation",
    description: "5 articles need revision",
    scoreImpact: "+2% score",
    scoreColor: "yellow",
    actionButton: "Update",
    borderColor: "#FE9339", // Orange
    iconBgColor: "#FE9339",
    iconColor: "#5C4033",
    iconType: "check",
  },
];

export function QuickFixesSidebar() {
  const [resolvedCount, setResolvedCount] = useState(1);
  const totalIssues = QUICK_FIXES.length; // 4 total issues
  const totalScorePotential = 8; // +8% health potential (3% + 2% + 1% + 2%)

  const handleResolve = (id: string) => {
    // Handle resolve action
    console.log(`Resolving ${id}`);
    setResolvedCount((prev) => Math.min(prev + 1, totalIssues));
  };

  const handleResolveAll = () => {
    // Handle resolve all action
    console.log("Resolving all recommendations");
  };

  return (
    <DockedComposer
      title="Quick Fixes"
      items={QUICK_FIXES.map((fix) => ({
        ...fix,
        onResolve: () => handleResolve(fix.id),
      }))}
      alertMessage={undefined}
      resolvedCount={resolvedCount}
      totalIssues={totalIssues}
      totalScorePotential={totalScorePotential}
      footerButtonLabel="Resolve All Recommendations"
      onFooterButtonClick={handleResolveAll}
    />
  );
}
