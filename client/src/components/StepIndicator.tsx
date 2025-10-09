import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

export default function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4">
      <div className="flex items-start justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-start" style={{ flex: '1 1 0px' }}>
            <div className="flex flex-col items-center w-full">
              {/* Step Circle */}
              <div className="relative z-10">
                <div
                  className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
                    font-semibold text-base md:text-lg transition-all duration-300 border-2
                    shadow-sm
                    ${
                      step.completed
                        ? "bg-primary text-primary-foreground border-primary shadow-primary/20"
                        : step.active
                        ? "bg-primary/10 text-primary border-primary ring-4 ring-primary/10"
                        : "bg-background text-muted-foreground border-border"
                    }
                  `}
                >
                  {step.completed ? (
                    <Check className="h-5 w-5 md:h-6 md:w-6" strokeWidth={3} />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
              </div>

              {/* Step Label */}
              <span
                className={`
                  text-xs md:text-sm mt-3 font-medium text-center px-2
                  transition-colors duration-300
                  ${
                    step.active || step.completed
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 pt-6 md:pt-7 px-2">
                <div
                  className={`
                    h-0.5 w-full transition-all duration-300 rounded-full
                    ${step.completed ? "bg-primary" : "bg-border"}
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
