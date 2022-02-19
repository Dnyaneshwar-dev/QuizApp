import Countdown from "react-countdown";
import React from "react";
const Completionist = () => <span>You are good to go!</span>;
const CountDownTimer = ({ minutes, handleExpire, style }) => {
  return (
    <div
      style={
        ({
          marginTop: 100,
        },
        style)
      }
    >
      <Countdown
        date={Date.now() + 60000 * minutes}
        onComplete={() => {
          handleExpire();
        }}
      >
        {}
      </Countdown>
    </div>
  );
};

export default CountDownTimer;
