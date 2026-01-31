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
    title: "Contradicting refund policies.",
    description: "2 documents have conflicting information.",
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
    title: "Archive stale pricing guide.",
    description: "Product Guide v2.1 is 8 months outdated.",
    scoreImpact: "+2% score",
    scoreColor: "green",
    actionButton: "Archive",
    borderColor: "#FE9339", // Orange
    iconBgColor: "#FE9339",
    iconColor: "#5C4033", // Dark brown
    iconType: "archive",
  },
];

export function QuickFixesSidebar() {
  const [resolvedCount, setResolvedCount] = useState(1);
  const totalIssues = QUICK_FIXES.length + 1; // 3 total issues (1 already resolved)
  const totalScorePotential = 5; // +5% health potential

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
      alertMessage="3 issues affecting your AI readiness score"
      resolvedCount={resolvedCount}
      totalIssues={totalIssues}
      totalScorePotential={totalScorePotential}
      footerButtonLabel="Resolve All Recommendations"
      onFooterButtonClick={handleResolveAll}
    />
  );
}
