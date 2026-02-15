"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon, PlusIcon } from "../../lib/slds-icons";

interface DocumentCard {
  id: string;
  title: string;
  type: string;
  trustScore: number;
  highlightedText: string;
  action: "keep" | "archive";
}

interface TakeActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueType: string;
  issueDescription: string;
  documents: DocumentCard[];
  expertReviewer?: {
    name: string;
    role: string;
  };
  onSave?: () => void;
  onSendToExpert?: () => void;
}

/* Placeholder blurred lines to simulate document text */
function BlurredLines({ count }: { count: number }) {
  const widths = ["100%", "92%", "85%", "96%", "78%", "88%"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "8px",
            width: widths[i % widths.length],
            backgroundColor: "#E5E5E5",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
}

/* External link icon (simple SVG) */
function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 8.667v4A1.333 1.333 0 0110.667 14H3.333A1.333 1.333 0 012 12.667V5.333A1.333 1.333 0 013.333 4h4M10 2h4v4M6.667 9.333L14 2"
        stroke="#706E6B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TakeActionModal({
  isOpen,
  onClose,
  issueType,
  issueDescription,
  documents,
  expertReviewer,
  onSave,
  onSendToExpert,
}: TakeActionModalProps) {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.document.addEventListener("keydown", handleEscape);
      window.document.body.style.overflow = "hidden";
      // Auto-select the "keep" document by default
      const keepDoc = documents.find((doc) => doc.action === "keep");
      if (keepDoc) {
        setSelectedDocument(keepDoc.id);
      }
    }

    return () => {
      window.document.removeEventListener("keydown", handleEscape);
      window.document.body.style.overflow = "";
    };
  }, [isOpen, documents, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    onClose();
  };

  const handleSendToExpert = () => {
    if (onSendToExpert) {
      onSendToExpert();
    }
    onClose();
  };

  if (!isOpen || !mounted) return null;

  // Derive title and subtitle from issue type
  const isContradiction = issueType === "Contradiction";
  const modalTitle = isContradiction
    ? "Resolve Data Contradiction"
    : `Resolve ${issueType} Issue`;
  const modalSubtitle = isContradiction
    ? "We found conflicting values for Power Output. Select the correct source or escalate for review"
    : issueDescription;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 9000,
        }}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-labelledby="take-action-title"
        aria-modal="true"
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 9001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "812px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 32px rgba(0, 0, 0, 0.16)",
            overflow: "hidden",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              transform: "translate(50%, -50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#0176D3",
              border: "2px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <XIcon size={14} color="#FFFFFF" />
          </button>

          {/* Header */}
          <div
            style={{
              padding: "24px 24px 16px 24px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Close X button (top right) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#0176D3",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <XIcon size={12} color="#FFFFFF" />
            </button>

            <h2
              id="take-action-title"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "28px",
                color: "#03234D",
                margin: "0 0 8px 0",
                fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
              }}
            >
              {modalTitle}
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                color: "#5C5C5C",
                margin: 0,
                fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
              }}
            >
              {modalSubtitle}
            </p>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "0 24px",
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Source Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: documents.length > 1 ? "1fr 1fr" : "1fr",
                gap: "16px",
              }}
            >
              {documents.map((doc) => {
                const isSelected = selectedDocument === doc.id;
                const trustColor =
                  doc.trustScore >= 80
                    ? "#06A59A"
                    : doc.trustScore >= 50
                      ? "#FE9339"
                      : "#EA001E";
                const trustBgColor =
                  doc.trustScore >= 80
                    ? "#E1F5F3"
                    : doc.trustScore >= 50
                      ? "#FFF3E8"
                      : "#FEE2E2";

                // Determine highlight color based on whether this is the "keep" source
                const isKeep = doc.action === "keep";
                const highlightColor = isKeep ? "#0176D3" : "#EA001E";

                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc.id)}
                    style={{
                      border: isSelected
                        ? "2px solid #0176D3"
                        : "1px solid #C9C9C9",
                      borderRadius: "12px",
                      padding: isSelected ? "15px" : "16px", // compensate for 2px border
                      backgroundColor: "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      transition: "border-color 0.15s ease",
                    }}
                  >
                    {/* Radio + Keep this source + External link */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {/* Radio button */}
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: isSelected
                            ? "2px solid #0176D3"
                            : "2px solid #C9C9C9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#0176D3",
                            }}
                          />
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          color: "#2E2E2E",
                          flex: 1,
                          fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                        }}
                      >
                        Keep this source
                      </span>
                      <ExternalLinkIcon />
                    </div>

                    {/* Document title */}
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "22px",
                        color: "#03234D",
                        margin: 0,
                        fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                      }}
                    >
                      {doc.title}
                    </h3>

                    {/* Document type */}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "17px",
                        color: "#706E6B",
                        fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                      }}
                    >
                      {doc.type}
                    </span>

                    {/* Blurred placeholder text + highlighted contradiction */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <BlurredLines count={2} />

                      {/* Highlighted text */}
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: "18px",
                          color: highlightColor,
                          margin: 0,
                          fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                        }}
                      >
                        {doc.highlightedText}
                      </p>

                      <BlurredLines count={2} />
                    </div>

                    {/* Trust score */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "auto",
                        paddingTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: "18px",
                          color: "#706E6B",
                          fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                        }}
                      >
                        Trust
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          color: trustColor,
                          backgroundColor: trustBgColor,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                        }}
                      >
                        {doc.trustScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Assigned Expert */}
            {expertReviewer && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 0 8px 0",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "18px",
                    color: "#706E6B",
                    border: "1px solid #C9C9C9",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                  }}
                >
                  Assigned Expert
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "18px",
                    color: "#2E2E2E",
                    fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                  }}
                >
                  {expertReviewer.name} ({expertReviewer.role})
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #E5E5E5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left: Not a contradiction */}
            <button
              type="button"
              onClick={onClose}
              style={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                color: "#0176D3",
                backgroundColor: "transparent",
                border: "1px solid #0176D3",
                borderRadius: "4px",
                padding: "6px 16px",
                cursor: "pointer",
                fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
              }}
            >
              Not a contradiction
            </button>

            {/* Right: Send to Expert + Save */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {onSendToExpert && (
                <button
                  type="button"
                  onClick={handleSendToExpert}
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#0176D3",
                    backgroundColor: "transparent",
                    border: "1px solid #0176D3",
                    borderRadius: "4px",
                    padding: "6px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                  }}
                >
                  <PlusIcon size={14} color="#0176D3" />
                  Send to Expert
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "#FFFFFF",
                  backgroundColor: "#0176D3",
                  border: "1px solid #0176D3",
                  borderRadius: "4px",
                  padding: "6px 24px",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
