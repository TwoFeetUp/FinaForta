import { motion } from "framer-motion";
import { AMORTIZATION_TYPES, AmortizationType } from "@/lib/utils";

interface AmortizationTypeSelectorProps {
  value: AmortizationType;
  onChange: (value: AmortizationType) => void;
}

export default function AmortizationTypeSelector({
  value,
  onChange,
}: AmortizationTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(AMORTIZATION_TYPES).map(([key, config]) => {
        const isSelected = value === key;

        return (
          <motion.button
            key={key}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(key as AmortizationType)}
            className={`
              p-4 rounded-lg border-2 transition-all text-left
              ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 bg-card"
              }
            `}
            data-testid={`option-${key}`}
          >
            <p className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
              {config.label}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {config.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
