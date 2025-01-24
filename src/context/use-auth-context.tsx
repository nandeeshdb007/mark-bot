"use client"
import { createContext, useContext, useState } from "react";

type InitalValuesProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const initialValues: InitalValuesProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const authContext = createContext<InitalValuesProps>(initialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    initialValues.currentStep
  );

  const values = {
    currentStep,
    setCurrentStep,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = useContext(authContext);
  return state;
};
