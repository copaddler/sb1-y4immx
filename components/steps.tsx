import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-muted">
        <div
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full border-2 
                  ${isCompleted ? 'border-primary bg-primary text-primary-foreground' : 
                    isCurrent ? 'border-primary bg-background' : 'border-muted bg-background'}
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium">{step.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}