import React, {useState, useEffect} from "react";
import Joke from "../Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "./index.css";

function JokeList({numJokesToGet = 10}) {
  const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem("jokes") || "[]"));
  const [loading, setLoading] = useState(false);
  const [seenJokes, setSeenJokes] = useState(new Set(jokes.map(j => j.text)));

  useEffect(()=>{
    if (jokes.length === 0) getJokes();
  }, [])

  useEffect(() => {
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes])
  
  useEffect(() => {
    if(loading) getJokes();
  }, [loading])
  
  const getJokes = async () => {
    try {
      let newJokes = [];
      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });
        let newJoke = res.data.joke;
        if (!seenJokes.has(newJoke)) {
          newJokes.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
          console.log(newJoke);
        }
      }
      setLoading(false);
      setJokes(prev => [...prev, ...newJokes])
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  }

  const handleVote = (id, delta) => {
    setJokes(prev => prev.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j));
  }

  const handleClick = () => {
    setLoading(true);
  }

  if(loading) {
    return (
      <div className='JokeList-spinner'>
        <i className='far fa-8x fa-laugh fa-spin' />
        <h1 className='JokeList-title'>Loading...</h1>
      </div>
    );
  }
  let sortedJokes = jokes.sort((a, b) => b.votes - a.votes);
  return (
    <div className='JokeList'>
      <div className='JokeList-sidebar'>
        <h1 className='JokeList-title'>
          <span>Dad</span> Jokes
        </h1>
        <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
        <button className='JokeList-getmore' onClick={handleClick}>
          Fetch Jokes
        </button>
      </div>

      <div className='JokeList-jokes'>
        {sortedJokes.map(j => (
          <Joke
            key={j.id}
            votes={j.votes}
            text={j.text}
            upvote={() => handleVote(j.id, 1)}
            downvote={() => handleVote(j.id, -1)}
          />
        ))}
      </div>
    </div>
  );
}
export default JokeList;
