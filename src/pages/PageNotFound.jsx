import React from 'react'
import { useNavigate } from 'react-router'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-center max-w-md mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  )
}

export default PageNotFound