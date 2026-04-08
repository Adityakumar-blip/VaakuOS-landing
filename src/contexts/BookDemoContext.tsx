import React, { Suspense, createContext, lazy, useContext, useState } from "react";

interface BookDemoContextType {
  openBookDemo: () => void;
  closeBookDemo: () => void;
}

const BookDemoDialog = lazy(() => import("@/components/BookDemoDialog"));

const BookDemoContext = createContext<BookDemoContextType | undefined>(undefined);

export const BookDemoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openBookDemo = () => setIsOpen(true);
  const closeBookDemo = () => setIsOpen(false);

  return (
    <BookDemoContext.Provider value={{ openBookDemo, closeBookDemo }}>
      {children}
      <Suspense fallback={null}>
        {isOpen ? (
          <BookDemoDialog open={isOpen} onOpenChange={setIsOpen} />
        ) : null}
      </Suspense>
    </BookDemoContext.Provider>
  );
};

export const useBookDemo = () => {
  const context = useContext(BookDemoContext);
  if (!context) {
    throw new Error("useBookDemo must be used within a BookDemoProvider");
  }
  return context;
};
