import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
//ModalProps.
interface ModalProps {
  isOpen: boolean;
  onclose: () => void;
  children: string;
  id?: string;
}
//Modal component for user information on the question marks in the app. 
export const InfoModal: React.FC<ModalProps> = ({
  isOpen,
  onclose,
  children,
}) => {
  const overlayRef = useRef(null);
  const handeOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target == overlayRef.current) {
      onclose();
    }
  };
  return isOpen ? (
    <div className="fixed -inset-5 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-0 overflow-y-auto ">
        <div
          ref={overlayRef}
          onClick={handeOverlayClick}
          className="flex min-h-full max-w-[375px] items-center mx-auto p-4 text-center"
        >
          <div className="h-full w-full transform rounded-[25px] bg-white px-3 align-middle shadow-[0_6px_6px_1px_rgba(0,0,0,0.3)] transition-all">
            <button
              className="w-full flex justify-end pt-2"
              type="button"
              onClick={() => onclose()}
            >
              <XMarkIcon className="w-[15px] h-[15px]"/>
            </button>
            <div className="h-full pb-4 text-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
