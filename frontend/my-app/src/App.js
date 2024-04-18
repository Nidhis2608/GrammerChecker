// Frontend Code - React.js
import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactComponent as Loader } from './icons/loader.svg';
import { ReactComponent as Undo } from './icons/undo.svg';
import { ReactComponent as Copy } from './icons/copy.svg';

function App() {
  const [text, setText] = useState("");
  const [previousText, setPreviousText] = useState("");
  const [words, setWords] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [correctedText, setCorrectedText] = useState("");

  function handleTextChange(e) {
    const newText = e.target.value;
    setText(newText);
    setWords(newText.split(/\s+/).filter(Boolean).length);
  }

  function handleFixErrors() {
    // Mock function to simulate text correction
    // Replace this with your actual API call to fix errors
    setCorrectedText(text.split(/\s+/).map(word => word + "✓").join(" "));
  }

  // function handleTextChange(e) {
  //   const newText = e.target.value;
  //   setText(newText);
  //   setWords(countWords(newText));
  // }

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

    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dish: text })
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok.');
      return response.json();
    })
    .then(data => {
      setText("");
      setMessage(data.msg + ": " + data.text);
      setWords(countWords(data.text));
      setFixed(false);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error:', err);
      setMessage("Failed to fix errors: " + err.message);
      setLoading(false);
      setFixed(false);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Grammar Checker</h1>
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-6">
        <textarea
          className="resize-none w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter your text"
          value={text}
          onChange={handleTextChange}
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {words} Word{words !== 1 ? 's' : ''}
          </div>
          <div className="space-x-2">
            <CopyToClipboard text={text}>
              <button className="p-2">
                <Copy className="text-gray-500 hover:text-teal-600" />
              </button>
            </CopyToClipboard>
            <button className="p-2" onClick={() => setText("")}>
              <Undo className="text-gray-500 hover:text-teal-600" />
            </button>
            <button
              className="bg-teal-600 text-white rounded-md px-4 py-2 hover:bg-teal-700 transition-colors"
              onClick={handleFixErrors}
            >
              Fix Errors
            </button>
          </div>
        </div>
        {correctedText && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded-md">
            {correctedText}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


