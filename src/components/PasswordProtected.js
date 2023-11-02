import { useState } from 'react'

export default function PasswordProtected({ onAuthentication }) {
  const [password, setPassword] = useState("")

  const handleAuthentication = (e) => {
    e.preventDefault()

    if (password === 'waterpere123!') {
      onAuthentication(true)
    }
    else {
        alert('Incorrect password')
        setPassword("")
        onAuthentication(false)
    }
  };

  return (
    <main className="min-h-screen bg-stone-200 p-48">
      <form onSubmit={handleAuthentication}>
        <label for="password" className="mb-4 text-sm font-medium text-gray-900">Password protected</label>
        <div className="relative">
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2" placeholder="Password" />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Authenticate</button>
        </div>
      </form>
    </main>
  )
};