import React from 'react'

function DownloadApp() {
  return (
    <div className='download-app-container'>
        <div className='download-app-image-container'>
            <img src="https://cdn2.allevents.in/transup/c3/acf13b4ac84d5cb7471b2583005208/ae1-02.webp" alt="" />
        </div>
        <div className='download-app-text-container'>
            <h1>Discover Events.</h1>
            <h1>Anywhere, Anytime. </h1>
            <span>Download the AllEvents app to never miss out on the best events near you! </span>
            <div className='qr-code'>
                <img src="https://cdn2.allevents.in/transup/2e/1723178e244d7c8a3946a247219666/qr-code.png" alt="" srcset="" />
            </div>
            <h3>Or</h3>
            <div className='download'>
                <img src="https://cdn2.allevents.in/transup/33/4fcdc12a954b04b02f742ce3265692/Google-Play-Icon.png" alt="" />
                <img src="https://cdn2.allevents.in/transup/0a/caa241b4e3479abed19e9ffd00690c/App-Store-Icon.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default DownloadApp
