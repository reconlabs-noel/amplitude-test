import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import "./App.css";
import Second from "./pages/Second";
import Button from "./pages/Button";
import PostMessage from "./pages/PostMessage";
import PostMessageReceive from "./pages/PostMessageReceive";
import InteractiveBackground from "./pages/InteractiveBackground";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/second" element={<Second />} />
        <Route path="/button" element={<Button />} />
        <Route path="/postMessage" element={<PostMessage />} />
        <Route path="/postMessage/receive" element={<PostMessageReceive />} />
        <Route path="/interactivebg" element={<InteractiveBackground />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
