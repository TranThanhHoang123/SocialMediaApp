import React, { useState } from "react";
import ChatSide from "./messSide";
import ChatDetail from "./messDetail";

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="flex h-screen">
      <MessSide selectChat={setSelectedChatId} />
      <MessDetail selectedChatId={selectedChatId} />
    </div>
  );
};

export default ChatPage;
