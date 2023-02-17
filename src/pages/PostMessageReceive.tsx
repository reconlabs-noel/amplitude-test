import React, { useEffect, useRef, useState } from "react";

type PostMessageReceiveProps = {};

type ChatBubbleType = {
  message: string;
  type: "me" | "you";
};

const PostMessageReceive = (props: PostMessageReceiveProps) => {
  const [initMessage, setInitMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatBubbleType[]>([]);
  const chatId = useRef<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const opener = window.opener;
    opener.postMessage("열렸습니당~!", window.location.origin);
  }, []);

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event: MessageEvent) {
      if (event.origin === window.location.origin) {
        const data = event.data;
        if (data.init) {
          setInitMessage(data.init);
        } else if (data.chatMessage) {
          if (!chatId.current.includes(data.chat_id)) {
            chatId.current = [...chatId.current, data.chat_id];
            setChat((prev) => [...prev, { message: event.data.chatMessage, type: "you" }]);
          }
        }
      }
    }
  }, []);

  const sendMessage = (message: string) => {
    setChat((prev) => [...prev, { message: message, type: "me" }]);
    window.opener.postMessage({ chatMessage: message, chat_id: nanoid(16) }, window.location.origin);
  };

  const nanoid = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((t, e) => (t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_"), "");

  return (
    <div>
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

export default PostMessageReceive;
