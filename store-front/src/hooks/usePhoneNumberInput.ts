import { useState } from "react";

const usePhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    const formattedPhoneNumber = cleaned.replace(
      /(\d{3})(\d{0,3})(\d{0,4})/,
      (_, p1, p2, p3) => {
        const parts = [p1];
        if (p2) parts.push(`-${p2}`);
        if (p3) parts.push(`-${p3}`);
        return parts.join("");
      }
    );

    setPhoneNumber(formattedPhoneNumber);
  };

  return { phoneNumber, handlePhoneNumberChange };
};
export default usePhoneNumberInput;
