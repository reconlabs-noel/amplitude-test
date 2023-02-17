import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type PostMessageProps = {};

type ChatBubbleType = {
  message: string;
  type: "me" | "you";
};

const PostMessage = (props: PostMessageProps) => {
  const location = useLocation();
  let openerRef = useRef<Window | null>(null);
  const [initMessage, setInitMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const chatId = useRef<string[]>([]);
  const [chat, setChat] = useState<ChatBubbleType[]>([]);

  const openAndPost = async () => {
    const opener = window.open(location.pathname + "/receive");
    openerRef.current = opener;
  };

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event: MessageEvent) {
      if (event.origin === window.location.origin) {
        if (event.data === "열렸습니당~!") {
          openerRef.current?.postMessage({ init: "Chat started" }, window.location.origin);
          setInitMessage("Chat Started");
        } else if (event.data.chatMessage) {
          if (!chatId.current.includes(event.data.chat_id)) {
            chatId.current = [...chatId.current, event.data.chat_id];
            setChat((prev) => [...prev, { message: event.data.chatMessage, type: "you" }]);
          }
        }
      }
    }
  }, []);

  const sendMessage = (message: string) => {
    setChat((prev) => [...prev, { message: message, type: "me" }]);
    openerRef.current?.postMessage({ chatMessage: message, chat_id: nanoid(16) }, window.location.origin);
  };

  const nanoid = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((t, e) => (t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_"), "");

  return (
    <div>
      <button onClick={openAndPost} style={{ display: "block" }}>
        Open New Window and Post Message
      </button>
      <div>{initMessage}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(inputValue);
        }}
      >
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
        <button>Send</button>
      </form>
      <div>
        {chat.map((bubble: ChatBubbleType) => {
          if (bubble.type === "me") return <div style={{ color: "blue" }}>{bubble.message}</div>;
          else return <div style={{ color: "red" }}>{bubble.message}</div>;
        })}
      </div>
    </div>
  );
};

export default PostMessage;
