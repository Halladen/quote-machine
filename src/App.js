import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

import "./App.css";

function App() {
  const [color, setColor] = useState("");
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  const getRandomColor = () => {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);

    const randomColor = `rgb(${randomRed},${randomGreen},${randomBlue})`;
    if (randomColor !== color) {
      setColor(randomColor);
    }
  };

  useEffect(() => {
    getRandomColor();
    randomquote();
  }, []);

  const randomquote = async () => {
    try {
      const res = await fetch(
        "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
        {
          method: "GET", // GET is the default, but you can explicitly specify it
          headers: {
            "x-rapidapi-host": "quotes15.p.rapidapi.com", // API host header
            "x-rapidapi-key":
              "c350f3e337msh1922901a7cc003ap14086bjsn3ffd46bda532", // API key header
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setQuote(data.content);

      const authorName = data["originator"].name;
      setAuthor(authorName);
    } catch (err) {
      console.log(err);
    }
  };

  const newQouteBtn = () => {
    randomquote();
    getRandomColor();
  };

  return (
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: color }}
    >
      <div
        className="d-flex-column border  rounded bg-white p-5"
        style={{ width: "500px", color: color }}
      >
        <div className="">
          <h3 className="text-central">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              size="lg"
              style={{ color: color }}
            />
            <span className="m-3">{quote}</span>
          </h3>

          <p className="text-end">- {author}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <a
              className="btn btn-light "
              style={{ backgroundColor: color }}
              href="#"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              className="btn btn-light"
              style={{ backgroundColor: color }}
              href="#"
            >
              <FontAwesomeIcon icon={faTumblr} />
            </a>
          </div>

          <div className="">
            <button
              className="btn btn-light"
              style={{ backgroundColor: color }}
              onClick={newQouteBtn}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-white">- by Halladen Coder</p>
      </div>
    </div>
  );
}

export default App;
