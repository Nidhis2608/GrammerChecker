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
    <div className="w-screen h-screen flex justify-center items-center flex-col px-2 sm:px-40 py-16 sm:py-28">
      <div className="w-full h-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-2 sm:p-4">
        <form className="flex flex-col h-full gap-4" onSubmit={handleSubmit}>
          <textarea className="resize-none w-full h-full bg-white dark:bg-neutral-800 border-none focus:ring-0 placeholder-neutral-400"
            placeholder="Enter your text"
            onChange={handleTextChange}
            value={text}
          />
          <div className="grid grid-cols-3 justify-between w-full">
            <div className="flex gap-4 place-self-start self-center">
              <p className="self-center whitespace-nowrap">{words} Words</p>
              <span className={`${words ? 'bg-green-500' : 'bg-neutral-500'} w-1.5 h-1.5 rounded-full self-center invisible sm:visible`}/>
              <p className={`${words ? 'hidden' : 'invisible sm:visible'} self-center`}>Write something amazing!</p>
            </div>
            <div className="place-self-center self-center">
              <button type="submit"
                disabled={!words}
                className={`${words ? 'bg-teal-600 dark:bg-teal-800 hover:bg-teal-700 dark:hover:bg-teal-900' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed'} rounded-full px-3 py-1.5 font-bold w-32 flex justify-center`}>
                  {!loading ? <span>Fix All Errors</span> : <Loader />}
              </button>
            </div>
            <div className="flex place-self-end self-center gap-4">
              <button type="button" onClick={handleUndo}>
                <Undo />
              </button>
              <CopyToClipboard text={text} onCopy={handleCopy}>
                <button type="button">
                  <Copy />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full my-4">
        {message ? <span className="bg-teal-700 text-white rounded-lg px-2 py-2 pr-6">{message}</span> : <span className="text-gray-200 dark:text-neutral-900">This is invisible</span>}
      </div>
    </div>
  );
}

export default App;

