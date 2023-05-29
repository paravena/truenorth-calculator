import { ReactNode } from 'react';

type CircularButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

const CircularButton = ({ children, onClick }: CircularButtonProps) => (
  <button
    type="button"
    className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={onClick}
  >
    {children}
  </button>
);

export default CircularButton;
