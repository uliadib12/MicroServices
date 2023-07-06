import React from 'react'
import Transitions from './Transitions'

function LoginContainer({children}) {
  return (
    <Transitions>
      <div class="flex flex-col items-center justify-center">
          <div class="bg-white shadow-md rounded px-14 py-14 mb-4">
              {children}
          </div>
      </div>
    </Transitions>
  )
}

export default LoginContainer