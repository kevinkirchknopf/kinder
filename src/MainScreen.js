import React, { useState, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./MainScreen.css";

const MainScreen = () => {
  const [people, setPeople] = useState([
    { id: 1, name: "Anna, 24", url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "John, 27", url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Sophia, 26", url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ]);

  const [swipedRightList, setSwipedRightList] = useState([]);
  
  // Create an array of refs
  const childRefs = useRef([]);

  useEffect(() => {
    // Recreate refs array when people change
    childRefs.current = people.map(() => React.createRef());
  }, [people]);

  const onSwipe = (direction, person) => {
    console.log(`You swiped ${direction} on ${person.name}`);
    if (direction === "right") {
      setSwipedRightList((prev) => [...prev, person]);
    }
  };

  const onCardLeftScreen = (id) => {
    console.log(`${id} left the screen`);
    setPeople((prev) => prev.filter((person) => person.id !== id));
  };

  // Swipe function to manually trigger a swipe
  const swipe = (dir) => {
    const lastIndex = people.length - 1;
    if (lastIndex >= 0 && childRefs.current[lastIndex].current) {
      childRefs.current[lastIndex].current.swipe(dir);
    }
  };

  return (
    <div className="main-screen-container">
      <h1>Találd meg a párod! 💘</h1>
      <div className="card-container">
        {people.map((person, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            key={person.id}
            className="swipe"
            onSwipe={(dir) => onSwipe(dir, person)}
            onCardLeftScreen={() => onCardLeftScreen(person.id)}
            preventSwipe={["up", "down"]}
            flickOnSwipe={true} // Ensures swiping works smoothly
          >
            <div className="card" style={{ backgroundImage: `url(${person.url})` }}>
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="swipe-controls">
        <button 
          className="swipe-button swipe-button--left" 
          onClick={() => swipe("left")}
          disabled={people.length === 0}
        >
          ✕
        </button>
        <button 
          className="swipe-button swipe-button--right" 
          onClick={() => swipe("right")}
          disabled={people.length === 0}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
