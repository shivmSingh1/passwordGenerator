
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const genratePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) {
      str += "~!@#$%^&*()_+{}?/-"
    }
    if (numberAllowed) {
      str += "0123456789"
    }
    for (let i = 0; i < length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(ch)
    }
    setPassword(pass)
  }, [length, charAllowed, numberAllowed, setPassword])

  useEffect(() => {
    genratePassword()
  }, [length, numberAllowed, charAllowed, genratePassword])

  const passwordRef = useRef(null)
  const copy = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
  }

  return (
    <>
      <div className="card">
        <h2 id='cardTitle'>Password<span style={{ color: "violet" }}>Generator</span></h2>
        <div className="inputAndCopy">
          <input type="text" placeholder='Password' id='inputText' value={password} readOnly ref={passwordRef} />
          <button onClick={copy}>copy</button>
        </div>
        <div className="additional">
          <input type="range" min='0' max='100' id='length' value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label htmlFor="length">Length {length}</label>
          <label htmlFor="number">
            <input type="checkbox" id='number' checked={numberAllowed} onChange={() => setNumberAllowed(!numberAllowed)} /> Number</label>
          <label htmlFor="char">
            <input type="checkbox" id='char' checked={charAllowed} onChange={() => setCharAllowed(!charAllowed)} /> Character</label>
        </div>
      </div>
    </>
  )
}

export default App
