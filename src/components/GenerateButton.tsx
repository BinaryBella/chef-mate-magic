import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GenerateButton = ({ onClick, disabled }: GenerateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-brand-primary w-full hover:bg-brand-primary/90 text-white font-bold px-8 py-3 rounded-lg text-lg"
    >
      Generate Smart Recipes
    </Button>
  );
};

export default GenerateButton;