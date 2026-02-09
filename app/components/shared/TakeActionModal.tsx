"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { XIcon, CheckCircleIcon, ArchiveIcon, PlusIcon } from "../../lib/slds-icons";
import { DataHealthLineChart } from "../dashboard/DataHealthLineChart";

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
  }, [isOpen, documents]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDocumentClick = (docId: string) => {
    setSelectedDocument(docId);
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

  const modalContent = (
    <>
      {/* Backdrop */}
      <motion.div
        className="slds-backdrop slds-backdrop_open"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
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
      <motion.section
        className="slds-modal slds-fade-in-open"
        role="dialog"
        aria-labelledby="take-action-title"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
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
          padding: "3rem 1.5rem",
        }}
        onClick={handleBackdropClick}
      >
        <div
          className="slds-modal__container"
          style={{
            width: "100%",
            maxWidth: "812px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="slds-modal__header">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
              <h2
                id="take-action-title"
                style={{
                  fontSize: "var(--slds-g-font-scale-3, 20px)",
                  fontWeight: "var(--slds-g-font-weight-4, 400)",
                  lineHeight: "28px",
                  color: "var(--slds-g-color-on-surface-3, #03234d)",
                  margin: 0,
                }}
              >
                Document Preview
              </h2>
              <p
                style={{
                  fontSize: "var(--slds-g-font-scale-1, 14px)",
                  fontWeight: "var(--slds-g-font-weight-4, 400)",
                  lineHeight: "19px",
                  color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                  margin: 0,
                }}
              >
                {issueDescription} - {documents.length} document{documents.length > 1 ? "s" : ""}
              </p>
            </div>
            <button
              type="button"
              className="slds-button slds-button_icon slds-button_icon-small"
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "var(--slds-g-spacing-4, 16px)",
                right: "var(--slds-g-spacing-4, 16px)",
              }}
            >
              <XIcon size={16} color="var(--slds-g-color-on-surface-1, #5c5c5c)" />
            </button>
          </div>

          {/* Content */}
          <div
            className="slds-modal__content"
            style={{
              padding: "var(--slds-g-spacing-5, 24px)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--slds-g-spacing-5, 24px)",
              overflowY: "auto",
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Document Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--slds-g-spacing-4, 16px)",
              }}
            >
              {documents.map((doc) => {
                const isSelected = selectedDocument === doc.id;
                const isKeep = doc.action === "keep";
                const trustColor = doc.trustScore >= 80 ? "#06A59A" : doc.trustScore >= 50 ? "#FE9339" : "#C23934";

                return (
                  <div
                    key={doc.id}
                    onClick={() => handleDocumentClick(doc.id)}
                    style={{
                      border: isSelected
                        ? "2px solid var(--slds-g-color-brand-base-50, #0176D3)"
                        : "1px solid var(--slds-g-color-border-1, #C9C9C9)",
                      borderRadius: "var(--slds-g-radius-border-3, 12px)",
                      padding: "var(--slds-g-spacing-4, 16px)",
                      backgroundColor: "var(--slds-g-color-neutral-base-100, #FFFFFF)",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.15s ease-in-out",
                    }}
                  >
                    {/* Badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--slds-g-spacing-1, 4px)",
                        marginBottom: "var(--slds-g-spacing-3, 12px)",
                      }}
                    >
                      {isKeep ? (
                        <>
                          <div
                            style={{
                              backgroundColor: "var(--slds-g-color-brand-base-50, #0176D3)",
                              borderRadius: "var(--slds-g-radius-border-1, 4px)",
                              padding: "2px var(--slds-g-spacing-1, 4px)",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "var(--slds-g-font-scale-neg-2, 12px)",
                                fontWeight: "var(--slds-g-font-weight-6, 590)",
                                lineHeight: "14px",
                                color: "#FFFFFF",
                              }}
                            >
                              Keep
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              backgroundColor: "#8B4513",
                              borderRadius: "var(--slds-g-radius-border-1, 4px)",
                              padding: "2px var(--slds-g-spacing-1, 4px)",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <ArchiveIcon size={12} color="#FFFFFF" />
                            <span
                              style={{
                                fontSize: "var(--slds-g-font-scale-neg-2, 12px)",
                                fontWeight: "var(--slds-g-font-weight-6, 590)",
                                lineHeight: "14px",
                                color: "#FFFFFF",
                              }}
                            >
                              Archive
                            </span>
                          </div>
                        </>
                      )}

                      {/* Selected Indicator */}
                      {isSelected && (
                        <div
                          style={{
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircleIcon size={20} color="var(--slds-g-color-brand-base-50, #0176D3)" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "var(--slds-g-font-scale-1, 14px)",
                        fontWeight: "var(--slds-g-font-weight-6, 590)",
                        lineHeight: "19px",
                        color: "var(--slds-g-color-on-surface-3, #03234d)",
                        margin: "0 0 var(--slds-g-spacing-1, 4px) 0",
                      }}
                    >
                      {doc.title}
                    </h3>

                    {/* Type */}
                    <p
                      style={{
                        fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                        fontWeight: "var(--slds-g-font-weight-4, 400)",
                        lineHeight: "17px",
                        color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                        margin: "0 0 var(--slds-g-spacing-2, 8px) 0",
                      }}
                    >
                      {doc.type}
                    </p>

                    {/* Trust Score */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--slds-g-spacing-1, 4px)",
                        marginBottom: "var(--slds-g-spacing-3, 12px)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                          fontWeight: "var(--slds-g-font-weight-4, 400)",
                          lineHeight: "17px",
                          color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                        }}
                      >
                        Trust
                      </span>
                      <span
                        style={{
                          fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                          fontWeight: "var(--slds-g-font-weight-6, 590)",
                          lineHeight: "17px",
                          color: trustColor,
                        }}
                      >
                        {doc.trustScore}%
                      </span>
                    </div>

                    {/* Highlighted Text */}
                    <div
                      style={{
                        backgroundColor: isKeep
                          ? "rgba(1, 118, 211, 0.1)"
                          : "rgba(194, 57, 52, 0.1)",
                        borderLeft: `3px solid ${isKeep ? "#0176D3" : "#C23934"}`,
                        padding: "var(--slds-g-spacing-2, 8px)",
                        borderRadius: "var(--slds-g-radius-border-1, 4px)",
                        marginTop: "var(--slds-g-spacing-2, 8px)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                          fontWeight: "var(--slds-g-font-weight-4, 400)",
                          lineHeight: "17px",
                          color: "var(--slds-g-color-on-surface-3, #03234d)",
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {doc.highlightedText}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expert Reviewer Section */}
            {expertReviewer && (
              <div
                style={{
                  padding: "var(--slds-g-spacing-3, 12px)",
                  backgroundColor: "var(--slds-g-color-neutral-base-95, #F3F3F3)",
                  borderRadius: "var(--slds-g-radius-border-2, 8px)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                    fontWeight: "var(--slds-g-font-weight-4, 400)",
                    lineHeight: "17px",
                    color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                    margin: 0,
                  }}
                >
                  Expert Reviewer {expertReviewer.name} ({expertReviewer.role})
                </p>
              </div>
            )}

            {/* Data Health Bar Chart Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--slds-g-spacing-2, 8px)",
              }}
            >
              {/* Horizontal Bar Chart */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  height: "49px",
                  width: "100%",
                }}
              >
                {/* 45% Orange Bar */}
                <div
                  style={{
                    backgroundColor: "#FE9339",
                    height: "33px",
                    width: "39%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--slds-g-radius-border-1, 4px) 0 0 var(--slds-g-radius-border-1, 4px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                      fontWeight: "var(--slds-g-font-weight-6, 590)",
                      lineHeight: "17px",
                      color: "#FFFFFF",
                    }}
                  >
                    45%
                  </span>
                </div>
                {/* 55% Lighter Orange Bar */}
                <div
                  style={{
                    backgroundColor: "#FFC99C",
                    height: "33px",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0 var(--slds-g-radius-border-1, 4px) var(--slds-g-radius-border-1, 4px) 0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                      fontWeight: "var(--slds-g-font-weight-6, 590)",
                      lineHeight: "17px",
                      color: "var(--slds-g-color-on-surface-2, #2e2e2e)",
                    }}
                  >
                    55%
                  </span>
                </div>
              </div>

              {/* Nested Card - Health Indicators */}
              <div
                className="slds-card"
                style={{
                  border: "1px solid var(--slds-g-color-border-1, #C9C9C9)",
                  borderRadius: "var(--slds-g-radius-border-3, 12px)",
                  backgroundColor: "var(--slds-g-color-neutral-base-100, #FFFFFF)",
                  padding: "12px var(--slds-g-spacing-3, 12px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Health Indicator */}
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--slds-g-spacing-2, 8px)",
                      alignItems: "center",
                      flex: "1 0 0",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                        fontWeight: "var(--slds-g-font-weight-6, 590)",
                        lineHeight: "17px",
                        color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Health indicator
                    </span>
                    <span className="slds-badge slds-theme_warning">
                      Medium
                    </span>
                  </div>

                  {/* Issues Detected */}
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--slds-g-spacing-2, 8px)",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                        fontWeight: "var(--slds-g-font-weight-6, 590)",
                        lineHeight: "17px",
                        color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      14 Issues Detected
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: "var(--slds-g-spacing-2, 8px)",
                        alignItems: "center",
                      }}
                    >
                      {/* High Severity */}
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--slds-g-spacing-2, 8px)",
                          alignItems: "center",
                        }}
                      >
                        <span className="slds-badge slds-theme_error">6</span>
                        <span
                          style={{
                            fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                            fontWeight: "var(--slds-g-font-weight-4, 400)",
                            lineHeight: "17px",
                            color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                          }}
                        >
                          High Severity
                        </span>
                      </div>
                      {/* Medium Severity */}
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--slds-g-spacing-2, 8px)",
                          alignItems: "center",
                        }}
                      >
                        <span className="slds-badge slds-theme_warning">8</span>
                        <span
                          style={{
                            fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                            fontWeight: "var(--slds-g-font-weight-4, 400)",
                            lineHeight: "17px",
                            color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                          }}
                        >
                          Medium Severity
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Health Over Time Chart */}
            <div
              className="slds-card"
              style={{
                border: "1px solid var(--slds-g-color-border-1, #C9C9C9)",
                borderRadius: "var(--slds-g-radius-border-3, 12px)",
                backgroundColor: "var(--slds-g-color-neutral-base-100, #FFFFFF)",
                padding: "var(--slds-g-spacing-4, 16px)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--slds-g-font-scale-3, 20px)",
                  fontWeight: "var(--slds-g-font-weight-4, 400)",
                  lineHeight: "28px",
                  color: "var(--slds-g-color-on-surface-3, #03234d)",
                  margin: "0 0 var(--slds-g-spacing-4, 16px) 0",
                }}
              >
                Data Health Over Time
              </h3>
              <div style={{ height: "200px", width: "100%" }}>
                <DataHealthLineChart
                  data={[
                    { date: "02/10/26", value: 15 },
                    { date: "02/15/26", value: 25 },
                    { date: "02/20/26", value: 30 },
                    { date: "02/25/26", value: 35 },
                    { date: "03/01/26", value: 40 },
                    { date: "03/05/26", value: 42 },
                    { date: "03/10/26", value: 45 },
                  ]}
                  currentValue={45}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="slds-modal__footer"
            style={{
              padding: "var(--slds-g-spacing-4, 16px) var(--slds-g-spacing-5, 24px)",
              borderTop: "1px solid var(--slds-g-color-border-1, #C9C9C9)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              className="slds-button slds-button_neutral"
              onClick={onClose}
              style={{
                fontSize: "var(--slds-g-font-scale-1, 14px)",
                fontWeight: "var(--slds-g-font-weight-6, 590)",
                lineHeight: "19px",
                padding: "0 var(--slds-g-spacing-4, 16px)",
                height: "32px",
              }}
            >
              Close
            </button>
            <div style={{ display: "flex", gap: "var(--slds-g-spacing-2, 8px)" }}>
              {onSendToExpert && (
                <button
                  type="button"
                  className="slds-button slds-button_outline-brand"
                  onClick={handleSendToExpert}
                  style={{
                    fontSize: "var(--slds-g-font-scale-1, 14px)",
                    fontWeight: "var(--slds-g-font-weight-6, 590)",
                    lineHeight: "19px",
                    padding: "0 var(--slds-g-spacing-4, 16px)",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--slds-g-spacing-1, 4px)",
                  }}
                >
                  <PlusIcon size={14} color="var(--slds-g-color-brand-base-50, #0176D3)" />
                  Send to Expert
                </button>
              )}
              <button
                type="button"
                className="slds-button slds-button_brand"
                onClick={handleSave}
                style={{
                  fontSize: "var(--slds-g-font-scale-1, 14px)",
                  fontWeight: "var(--slds-g-font-weight-6, 590)",
                  lineHeight: "19px",
                  padding: "0 var(--slds-g-spacing-4, 16px)",
                  height: "32px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
