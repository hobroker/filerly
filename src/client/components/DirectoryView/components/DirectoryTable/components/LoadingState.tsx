import { Spinner } from "@phosphor-icons/react";

export const LoadingState = () => {
  return (
    <div className="flex w-full justify-center">
      <Spinner size={32} className="animate-spin" />
    </div>
  );
};
