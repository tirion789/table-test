import { ReactNode } from 'react';

export interface ButtonProps {
  onClick: () => void;
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  className?: string;
}
