import React from "react";
import "./CheckoutSteps.css";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ currentStep }) => {

  const steps = [
    {
      label: <Typography>Shipping Info</Typography>,
      icon: <LocalShippingIcon />
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    width: "70%",
    margin: "0 auto",
    marginTop: "40px",
  };

  return (
    <>
      <Stepper activeStep={currentStep} style={stepStyles} className='stepper'>
        {steps.map((curr, index) => (
          <Step
            active={currentStep === index ? true : false}
            completed={currentStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: currentStep >= index ? "lightcoral" : "rgba(0,0,0,0.649)",
              }}
              icon={curr.icon}
            >
              <span
                style={{
                  color: currentStep >= index ? "lightcoral" : "rgba(0,0,0,0.649)",
                }}
              >
                {curr.label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
