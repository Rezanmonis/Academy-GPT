"use client"

import Modal from "react-modal"
import { useEffect } from "react"

export default function CustomModal({ isOpen, onClose, title, children }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      ariaHideApp={false} // Add this to prevent errors in development
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="bg-white rounded-lg shadow-lg w-[96vw] sm:w-[50vw] max-h-[90vh] overflow-y-auto p-4 outline-none"
      overlayClassName="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <div className="border-b pb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="">{children}</div>
    </Modal>
  )
}
