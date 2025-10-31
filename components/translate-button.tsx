"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

interface TranslateButtonProps {
  variant: "default" | "outline" | "ghost";
  showText?: boolean;
}

const TranslateButton = ({ variant, showText }: TranslateButtonProps) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      className="w-fit z-1 text-1xl gap-2"
      variant={variant}
    >
      {showText && (
        <span className="font-medium">
          {language === "en" ? "العربية" : "English"}
        </span>
      )}
      <Languages size={16} />
    </Button>
  );
};

export default TranslateButton;
