import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_img from '../assets/image.svg'

export const ImageGenerator = () => {

  const [image_url, setImage_url] = useState("/")
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false);

  const imageGenerater = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true)
    const response = await fetch("https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "256x256",
        }),
      }
    );
    let data = await response.json();
    console.log(data)
    // let array_data = data.data
    // setImage_url(array_data[0].url)
    setLoading(false)
  }



  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className='img-loading'>
        <div className='image'> <img src={image_url === "/" ? default_img : image_url} alt="" /></div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
        <div className="generate-btn" onClick={() => { imageGenerater() }}>Generate</div>
      </div>
    </div>
  )
}
