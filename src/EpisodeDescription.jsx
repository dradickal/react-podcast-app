import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import captureKeyboardEvent from './util/captureKeyboardEvent';
import './EpisodeDescription.css';

export function EpisodeDescription({ episode, isOpen, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();
      
      // Trap focus within modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (captureKeyboardEvent(e.nativeEvent, 'Escape')) {
      onClose();
    }
  };

  if (!isOpen || !episode) {
    return null;
  }

  return (
    <div 
      className="episode-description-overlay"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="episode-description-title"
      aria-describedby="episode-description-content"
    >
      <div className="episode-description-modal" ref={modalRef}>
        <div className="episode-description-header">
          <h2 id="episode-description-title">{episode.title}</h2>
          <button 
            ref={closeButtonRef}
            className="episode-description-close"
            onClick={onClose}
            aria-label="Close episode description"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="episode-description-content" id="episode-description-content">
          <ReactMarkdown>{episode.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}