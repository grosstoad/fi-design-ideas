import { useEffect, useId, useRef } from "react";
import "./responsive-dialog.css";

/**
 * A controlled, native dialog that presents as a centred modal on larger
 * screens and a bottom sheet on smaller screens.
 */
export function ResponsiveDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeLabel = "Close dialog",
  initialFocusRef,
  className = "",
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return undefined;

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    const focusTarget = initialFocusRef?.current ?? closeButtonRef.current;
    focusTarget?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      if (dialog.open) dialog.close();

      const trigger = triggerRef.current;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      triggerRef.current = null;
    };
  }, [initialFocusRef, isOpen]);

  function requestClose(reason) {
    onCloseRef.current(reason);
  }

  function handleCancel(event) {
    event.preventDefault();
    requestClose("escape");
  }

  function handleScrimClick(event) {
    if (event.target === event.currentTarget) requestClose("scrim");
  }

  const classes = ["responsive-dialog", className].filter(Boolean).join(" ");

  return (
    <dialog
      ref={dialogRef}
      className={classes}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={handleCancel}
      onClick={handleScrimClick}
    >
      <div className="responsive-dialog__surface">
        <header className="responsive-dialog__header">
          <div className="responsive-dialog__heading-group">
            <h2 className="responsive-dialog__title" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="responsive-dialog__description" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <button
            ref={closeButtonRef}
            className="responsive-dialog__close"
            type="button"
            aria-label={closeLabel}
            onClick={() => requestClose("button")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <div className="responsive-dialog__body">{children}</div>
      </div>
    </dialog>
  );
}

export default ResponsiveDialog;
