import { cn } from "@/lib/utils";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between flex-col items-center md:flex-row   border-gray-200 space-x-2 space-y-2">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                "p-2 w-56  rounded-full text-center text-sm",
                index === current ? "bg-slate-400 " : ""
              )}
            >
              {step}
            </div>
            {step !== "Place Order" && (
              <div className="h-1 w-16 bg-gray-200  mx-2" />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
