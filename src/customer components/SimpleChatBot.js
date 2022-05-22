import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";

function SimpleChatBot() {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {}, [toggle]);

  const handleEnd = ({ steps, values }) => {
    console.log(values);
    if (values[1] === 1) {
      window.location.href = "/food-order";
    } else if (values[1] === 2) {
      window.location.href = "/book-halls";
    } else if (values[1] === 3) {
      window.location.href = "/book-marquees";
    }
  };
  return (
    <div className="chat-bot-container">
      <a className="chat-bot-logo" onClick={() => setToggle(!toggle)}>
        <svg
          height={24}
          width={24}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </a>
      <div className={`chat-bot ${toggle ? "toggle-fn" : ""}`}>
        <div className="chat-close-btn" onClick={() => setToggle(!toggle)}>
          X
        </div>
        <ChatBot
          handleEnd={handleEnd}
          steps={[
            {
              id: "1",
              message: "What is your name?",
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              trigger: "3",
            },
            {
              id: "3",
              message: "Hi {previousValue}, nice to meet you!",
              trigger: "4",
            },
            {
              id: "4",
              message: "Select From the Options",
              trigger: "5",
            },
            {
              id: "5",
              options: [
                { value: 1, label: "Food order", trigger: "6" },
                { value: 2, label: "Book Hall", trigger: "7" },
                { value: 3, label: "Book Marquee", trigger: "8" },
              ],
            },
            {
              id: "6",
              message: ({ previousValue, steps }) =>
                "You selected {previousValue}",
              end: true,
            },
            {
              id: "7",
              message: ({ previousValue, steps }) =>
                "You selected {previousValue}",
              end: true,
            },
            {
              id: "8",
              message: ({ previousValue, steps }) =>
                "You selected {previousValue}",
              end: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default SimpleChatBot;
