---
title: Welcome to Highlight
slug: 9fDE-welcome-to-highlight
createdAt: 2021-09-10T17:54:08.000Z
updatedAt: 2022-08-18T22:36:12.000Z
---

## What's Highlight?

Highlight is a tool that helps teams reproduce end-to-end user sessions to better understand their application.

With Highlight, **engineering teams** can replay errors with high precision, which includes a complete session replay, outgoing network requests, dense stack traces and insight into the app's state management system (redux, apollo's cache, etc.). At the same time, **product teams** can analyze user activity, collaborate with engineering teams and find the reason for user drop offs to gain insight into UX.

```html
<style>
  .archbee-editor {
    white-space: initial !important;
  }

  .custom-hero-image {
    width: 100%;
    grid-area: main;
    transition: all 0.4s ease-in-out;
  }

  .hero-container {
  	max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: "main";
    align-items: center;
    justify-items: center;
    cursor: pointer;
    border-radius: 8px;
    background: black;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	}

  .hero-container:hover .custom-hero-image {
    opacity: 0.5;
  }

  .hero-container:hover .jay-container,
  .hero-container:hover .controls-container .card {
    opacity: 1;
  }

  .hero-container:hover .controls-container button {
    transform: scale(1.1);
  }

  .hero-container > * {
    box-sizing: border-box;
  }

  .controls-container {
    grid-area: main;
    z-index: 9;
    position: relative;
    width: 220px;
    display: flex;
    justify-content: center;
    top: -45px;
  }

  .controls-container button {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 4px solid #aa94e2;
    background: #5629c6;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 9;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
  }

  .controls-container button svg {
    height: 28px;
    width: 28px;
    color: white;
    fill: white;
    margin-left: 4px;
  }

  .controls-container .card {
    background: white;
    border: 0.819549px solid #d9dde0;
    border-radius: 81.9549px;
    padding: 12px 27px;
    text-align: center;
    position: absolute;
    width: 275px;
    top: 73px;
    transition: all 0.4s ease-in-out;
    opacity: 0;
  }

  .controls-container .watch-now {
    color: #5629c6;
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    margin-left: 4px;
    font-weight: 500;
  }

  .controls-container .watch-now svg {
    height: 14px;
    width: 14px;
  }

  .controls-container h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
  }

  .controls-container p {
    margin-top: 0;
    margin-bottom: 0;
    color: #bababa;
    font-size: 12px;
  }

  .controls-container .jay-container {
    position: absolute;
    z-index: 10;
    height: 26px;
    width: 26px;
    display: flex;
    right: 29%;
    bottom: 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
  }

  .controls-container .jay-container img {
    height: 100%;
    width: 100%;
    border: 1px solid white;
    border-radius: 50%;
  }

  .modal {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    left: 0;
    top: 0;
  }

  .modal.show {
    opacity: 1;
    z-index: 9999999;
    pointer-events: all;
  }

  .modal-contents {
    display: flex;
    position: relative;
    width: fit-content;
  }

  .modal-close-button {
    border: 0;
    background-color: transparent;
    color: white;
    position: absolute;
    top: -24px;
    transform: translateY(-100%);
    right: 0;
    padding: 0;
    cursor: pointer;
  }

  .modal video {
    width: 70vw;
  }
</style>


  <div class="hero-container">
    <div class="modal">
      <div class="modal-contents">
        <video controls class="hero-video">
          <source
            src="https://res.cloudinary.com/highlight-run/video/upload/v1639287025/highlight-recording-v4_aphslg.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
    <img
      class="custom-hero-image"
      src="https://uploads-ssl.webflow.com/60a2acace1fd91aae61c497d/61a70d9cfa8cdfd53b5c9a1d_hero-without-margin.png"
    />

    <div class="controls-container">
      <div class="jay-container">
        <img
          src="https://uploads-ssl.webflow.com/60a2acace1fd91aae61c497d/61a6c66b9cfca80bd18f9ed3_IMG_2824%201.png"
          alt=""
        />
      </div>
      <button>
        <svg
          width="25"
          height="29"
          viewBox="0 0 25 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.0252 12.7389C25.2704 13.4578 25.2704 15.2551 24.0252 15.9741L3.01234 28.1058C1.76714 28.8248 0.210629 27.9261 0.210629 26.4883L0.210629 2.22471C0.210629 0.786875 1.76714 -0.111775 3.01234 0.607145L24.0252 12.7389Z"
            fill="white"
          />
        </svg>
      </button>
      <div class="card">
        <h3>Watch Jay demo Highlight</h3>
        <p>
          2 mins
          <span class="watch-now"
            >Watch Now
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13.75 6.75L19.25 12L13.75 17.25"
              ></path>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19 12H4.75"
              ></path>
            </svg>
          </span>
        </p>
      </div>
    </div>
  </div>

  <script>
    console.log('hello')
    const modal = document.querySelector(".modal");
    const heroImage = document.querySelector(".custom-hero-image");
    const video = document.querySelector(".hero-video");
    const card = document.querySelector(".card");
    const controlsContainer = document.querySelector(".controls-container");
    const watchNow = document.querySelector(".watch-now");
    
    
document.addEventListener('keyup', e => {
 if (e.key === 'Escape' && modal.classList.contains("show")) {
modal.classList.remove("show")
video.pause();
}
})

    const playerToggleHandler = () => {
      if (modal.classList.contains("show")) {
        modal.classList.remove("show");
        video.pause();

      } else {
        modal.classList.add("show");
        video.play();
      }
    };

    modal.addEventListener("click", () => {
      playerToggleHandler();
    });

    card.addEventListener("click", () => {
      playerToggleHandler();
    });

    controlsContainer.addEventListener("click", () => {
      playerToggleHandler();
    });

    heroImage.addEventListener("click", () => {
      playerToggleHandler();
    });

    watchNow.addEventListener("click", () => {
      playerToggleHandler();
    });

    video.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  </script>
```


