import React from 'react'

function BackgroundPage({children}) {
    return (
        <div class="h-screen flex items-center justify-center bg-gray-200">
          <div class="max-h-full overflow-y-auto">
            {children}
          </div>
        </div>
      )
}

export default BackgroundPage