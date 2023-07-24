import { ChangeEvent, ReactNode } from 'react';
export interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: 'text';
  inputMod?: 'text' | 'search';
  isDisabled?: boolean;
  icon?: ReactNode;
  className?: string;
}
