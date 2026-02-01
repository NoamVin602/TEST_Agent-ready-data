"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    title: string;
    content: string;
    type?: string;
    detectedText?: string;
    authoritativeText?: string;
  };
}

/**
 * SLDS Modal Component for Document Preview
 * Based on Salesforce Lightning Design System Modal blueprint
 * Uses only SLDS classes - no inline styles except for animations
 */
export function DocumentPreviewModal({
  isOpen,
  onClose,
  document: documentData,
}: DocumentPreviewModalProps) {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      window.document.body.style.overflow = "hidden";
    }

    return () => {
      window.document.removeEventListener("keydown", handleEscape);
      window.document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
            className="slds-modal slds-fade-in-open slds-modal_small"
            role="dialog"
            aria-labelledby="document-preview-title"
            aria-describedby="document-preview-description"
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
          >
            <div className="slds-modal__container" style={{ maxHeight: "90vh", width: "100%" }}>
              {/* Header */}
              <header className="slds-modal__header">
                <button
                  className="slds-button slds-button_icon slds-button_icon-small slds-modal__close"
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  title="Close"
                >
                  <svg
                    className="slds-button__icon"
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8 7.29289L3.85355 3.14645C3.65829 2.95118 3.34171 2.95118 3.14645 3.14645C2.95118 3.34171 2.95118 3.65829 3.14645 3.85355L7.29289 8L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L8 8.70711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.70711 8L12.8536 3.85355Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="slds-assistive-text">Close</span>
                </button>
                <h2
                  id="document-preview-title"
                  className="slds-modal__title slds-hyphenate"
                >
                  {documentData.title}
                </h2>
                {documentData.type && (
                  <p
                    id="document-preview-description"
                    className="slds-m-top_x-small"
                    style={{
                      fontSize: "var(--slds-g-font-scale-base)",
                      fontWeight: "var(--slds-g-font-weight-4)",
                      color: "var(--slds-g-color-on-surface-1)",
                      marginTop: "var(--slds-g-spacing-1)",
                    }}
                  >
                    {documentData.type}
                  </p>
                )}
              </header>

              {/* Body */}
              <div className="slds-modal__content slds-p-around_medium">
                {/* Detected vs Authoritative Comparison */}
                {(documentData.detectedText || documentData.authoritativeText) && (
                  <div
                    className="slds-grid slds-grid_vertical"
                    style={{ gap: "var(--slds-g-spacing-3)", marginBottom: "var(--slds-g-spacing-4)" }}
                  >
                    {documentData.detectedText && (
                      <div className="slds-grid" style={{ gap: "var(--slds-g-spacing-2)", alignItems: "center" }}>
                        <span className="slds-badge slds-badge_detected">
                          Detected
                        </span>
                        <span
                          style={{
                            fontSize: "var(--slds-g-font-scale-base)",
                            fontWeight: "var(--slds-g-font-weight-4)",
                            color: "var(--slds-g-color-on-surface-2)",
                            fontFamily: "var(--slds-g-font-family)",
                            lineHeight: "var(--slds-g-line-height-body-base)",
                          }}
                        >
                          {documentData.detectedText}
                        </span>
                      </div>
                    )}
                    {documentData.authoritativeText && (
                      <div className="slds-grid" style={{ gap: "var(--slds-g-spacing-2)", alignItems: "center" }}>
                        <span className="slds-badge slds-badge_authoritative">
                          Authoritative
                        </span>
                        <span
                          style={{
                            fontSize: "var(--slds-g-font-scale-base)",
                            fontWeight: "var(--slds-g-font-weight-4)",
                            color: "var(--slds-g-color-on-surface-2)",
                            fontFamily: "var(--slds-g-font-family)",
                            lineHeight: "var(--slds-g-line-height-body-base)",
                          }}
                        >
                          {documentData.authoritativeText}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Document Content */}
                <div
                  className="slds-card"
                  style={{
                    border: "1px solid var(--slds-g-color-border-1)",
                    borderRadius: "var(--slds-g-radius-border-2)",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <div className="slds-card__body slds-card__body_inner">
                    <div
                      style={{
                        fontSize: "var(--slds-g-font-scale-1)",
                        fontWeight: "var(--slds-g-font-weight-4)",
                        lineHeight: "var(--slds-g-line-height-body)",
                        color: "var(--slds-g-color-on-surface-2)",
                        fontFamily: "var(--slds-g-font-family)",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {documentData.content}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="slds-modal__footer">
                <button
                  type="button"
                  className="slds-button slds-button_neutral"
                  onClick={onClose}
                >
                  Close
                </button>
              </footer>
            </div>
          </motion.section>
    </>
  );

  return createPortal(modalContent, window.document.body);
}
