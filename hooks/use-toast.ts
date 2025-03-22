"use client"; // Ensure this is a client component since hooks require client-side execution

import { useCallback } from "react";
import { toast as sonnerToast } from "sonner";

// Define the ToastAction type to match ShadCN's toast action
export interface ToastAction {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  altText?: string; // Optional for accessibility
}

// Define the ToastProps to match ShadCN's toast interface
export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "info" | "warning";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: any;
  duration?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional props for flexibility
}

// Define the return type of the hook
export interface UseToastReturn {
  toast: (props: ToastProps) => string | number; // Sonner returns an ID
  dismiss: (toastId?: string | number) => void;
}

// The useToast hook
export function useToast(): UseToastReturn {
  const toast = useCallback(
    ({
      title,
      description,
      variant,
      action,
      duration,
      ...rest
    }: ToastProps) => {
      // Map ShadCN variants to Sonner styles
      let sonnerType: "success" | "error" | "info" | "warning" | undefined;
      switch (variant) {
        case "success":
          sonnerType = "success";
          break;
        case "destructive":
          sonnerType = "error";
          break;
        case "info":
          sonnerType = "info";
          break;
        case "warning":
          sonnerType = "warning";
          break;
        default:
          sonnerType = undefined; // Default Sonner toast
      }

      // Call Sonner toast with mapped options
      return sonnerToast(sonnerType ? sonnerType : title || "Notification", {
        description: description || undefined,
        duration: duration || 4000, // Default duration like ShadCN
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
        ...rest, // Spread any additional props
      });
    },
    []
  );

  const dismiss = useCallback((toastId?: string | number) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss(); // Dismiss all toasts if no ID provided
    }
  }, []);

  return { toast, dismiss };
}
