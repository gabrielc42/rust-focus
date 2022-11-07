import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import React from "react";

function App() {
  const [content, setContent] = React.useState('')
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await invoke('add_task', { content })
    }
  }

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return <div>
    <div className="row">
      <input type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-[800px] h-[80px] bg-[#222] text-2xl text-white px-6" />

      <div>
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="button" onClick={() => greet()}>
          button
        </button>
      </div>
    </div>
    <p>{greetMsg}</p>

  </div>
}

export default App;
