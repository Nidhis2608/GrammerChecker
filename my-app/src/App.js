import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactComponent as Loader } from './icons/loader.svg';
import { ReactComponent as Undo } from './icons/undo.svg';
import { ReactComponent as Copy } from './icons/copy.svg';
import "./newApp.css"
import Navbar from './Navbar';


function App() {
  const [text, setText] = useState("");
  const [previousText, setPreviousText] = useState("");
  const [words, setWords] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);

  function handleTextChange(e) {
    const newText = e.target.value;
    setText(newText);
    setWords(countWords(newText));
  }

  function countWords(str) {
    const matches = str.match(/[\w\d\’\'-]+/gi);
    return matches ? matches.length : 0;
  }

  function handleCopy() {
    setMessage("Copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function handleUndo() {
    setMessage("Undo successful!");
    setText(previousText);
    setWords(countWords(previousText));
    setTimeout(() => setMessage(""), 2000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    setFixed(true);
    setLoading(true);

    fetch(
      // 'http://localhost:3000/add'
      "https://grammerchecker.onrender.com/add"
      , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dish: text })
    })
    .then(response => response.json())
    .then(data => {
      setText("");
      setMessage(data.msg + ": " + data.text);
      setWords(countWords(data.text));
      setFixed(false);
      setLoading(false);
    })
    .catch(err => {
      setMessage("Failed to fix errors: " + err.message);
      setLoading(false);
      setFixed(false);
    });
  }

  return (
    <>
    <Navbar />
    <div className='main-container'>
        {/* <h1 className="text-3xl font-bold text-center mb-4" style={{padding:"30px",margin:"30px", textAlign:"center", fontSize:"Bolder"}}>Grammar Checker</h1> */}
        <div className="container">
  <form className="form" onSubmit={handleSubmit}>
    <textarea
      className="textarea"
      placeholder="Enter your text"
      onChange={handleTextChange}
      value={text}
    />
    <div className="grid">
      <div className="word-count">
        <p className="word-count-text">{words} Words</p>
        <span className={`${words ? 'green-dot' : 'neutral-dot'}`} />
        <p className={`${words ? 'hidden' : 'show'}`}>Write something amazing!</p>
      </div>
      <div className="button-container">
        <button
          type="submit"
          disabled={!words}
          className={`${words ? 'fix-button' : 'disabled-button'}`}
        >
          {!loading ? <span>Fix All Errors</span> : <Loader />}
        </button>
      </div>
      <div className="action-buttons">
    <button type="button" onClick={handleUndo} style={{ padding: '5px 10px', fontSize: '12px' }}>
      <Undo />
      Undo
    </button>
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <button type="button" style={{ padding: '5px 10px', fontSize: '5px' }}>
        <Copy />
        Copied to clipboard
      </button>
    </CopyToClipboard>
</div>

    </div>
  </form>
</div>
<div className="message-container">
  {message ? (
    <span className="message">{message}</span>
  ) : (
    <span className="invisible-message">This is invisible</span>
  )}
</div>
</div>
    </>
  );
}

export default App;
