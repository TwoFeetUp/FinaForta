import { motion } from "framer-motion";
import { PROPERTY_USAGE_CONFIG, PropertyUsage } from "@/lib/utils";
import { Home, Building2, Layers, TrendingUp } from "lucide-react";

interface PropertyUsageSelectorProps {
  value: PropertyUsage;
  onChange: (value: PropertyUsage) => void;
}

const iconMap = {
  Home: Home,
  Building2: Building2,
  Layers: Layers,
  TrendingUp: TrendingUp,
} as const;

export default function PropertyUsageSelector({
  value,
  onChange,
}: PropertyUsageSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(PROPERTY_USAGE_CONFIG).map(([key, config]) => {
        const isSelected = value === key;
        const IconComponent = iconMap[config.icon as keyof typeof iconMap];

        return (
          <motion.button
            key={key}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(key as PropertyUsage)}
            className={`
              p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 text-center
              ${
                isSelected
                  ? `${config.color} shadow-lg`
                  : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
              }
            `}
            data-testid={`option-${key}`}
          >
            <div
              className={`
                p-3 rounded-lg transition-colors
                ${isSelected ? "bg-white/50" : "bg-gray-100"}
              `}
            >
              <IconComponent
                className={`h-8 w-8 ${isSelected ? "" : "text-gray-600"}`}
              />
            </div>
            <p
              className={`font-bold text-base ${
                isSelected ? "" : "text-foreground"
              }`}
            >
              {config.label}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
