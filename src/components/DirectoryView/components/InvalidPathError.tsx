import { WarningCircle } from "@phosphor-icons/react";

export const InvalidPathError = () => {
  return (
    <div className="p-4 flex justify-center">
      <WarningCircle size={80} />
    </div>
  );
};
