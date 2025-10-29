import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROPERTY_TYPES_CONFIG, PropertyType } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Building2,
  Home,
  ShoppingCart,
  Store,
  Building,
  UtensilsCrossed,
  Smile,
  Heart,
  Hammer,
  Leaf,
  Factory,
  Wheat,
  Wrench,
  HardHat,
} from "lucide-react";

interface PropertyTypeSelectorProps {
  value: PropertyType;
  onChange: (value: PropertyType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-8 w-8" />,
  Home: <Home className="h-8 w-8" />,
  ShoppingCart: <ShoppingCart className="h-8 w-8" />,
  Store: <Store className="h-8 w-8" />,
  Building: <Building className="h-8 w-8" />,
  UtensilsCrossed: <UtensilsCrossed className="h-8 w-8" />,
  Smile: <Smile className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  Hammer: <Hammer className="h-8 w-8" />,
  Leaf: <Leaf className="h-8 w-8" />,
  Factory: <Factory className="h-8 w-8" />,
  Wheat: <Wheat className="h-8 w-8" />,
  Wrench: <Wrench className="h-8 w-8" />,
  HardHat: <HardHat className="h-8 w-8" />,
};

export default function PropertyTypeSelector({
  value,
  onChange,
}: PropertyTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedConfig = PROPERTY_TYPES_CONFIG[value];
  const selectedIcon = iconMap[selectedConfig.icon as keyof typeof iconMap];

  return (
    <div className="space-y-2">
      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`${selectedConfig.color.split(" ")[2]}`}>
            {selectedIcon}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-muted-foreground">Geselecteerd</p>
            <p className="font-semibold text-foreground">{selectedConfig.label}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.button>

      {/* Expandable Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(PROPERTY_TYPES_CONFIG).map(([key, config]) => {
                  const isSelected = value === key;
                  const iconKey = config.icon as keyof typeof iconMap;
                  const icon = iconMap[iconKey];

                  return (
                    <motion.button
                      key={key}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onChange(key as PropertyType);
                        setIsOpen(false);
                      }}
                      className={`
                        p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2
                        ${
                          isSelected
                            ? `${config.color} border-current shadow-md`
                            : `border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50`
                        }
                      `}
                      data-testid={`option-${key}`}
                    >
                      <div className={isSelected ? config.color.split(" ")[2] : "text-gray-600"}>
                        {icon}
                      </div>
                      <span className={`text-xs font-medium text-center ${isSelected ? "font-bold" : ""}`}>
                        {config.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
