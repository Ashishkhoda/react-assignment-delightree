import React, { createContext, useState } from "react";
import { FormData } from "../types";

interface FormDataContextType {
  formData: FormData | null;
  updateFormData: (newData: FormData) => void;
}

const defaultContextValue: FormDataContextType = {
  formData: null,
  updateFormData: () => {},
};

export const FormDataContext =
  createContext<FormDataContextType>(defaultContextValue);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const updateFormData = (newData: FormData) => {
    setFormData(newData);
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
