import React, { useState, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "../Styles/MainScreen.css";
import { jwtDecode } from "jwt-decode";

const MainScreen = () => {
  const [people, setPeople] = useState([
    { id: 1, name: "Anna, 24", url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "John, 27", url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Sophia, 26", url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ]);

  const [userData, setUserData]=useState({});

  const [swipedRightList, setSwipedRightList] = useState([]);
  

useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
     
      setUserData(decoded);
    }
  }, []);



  
  // Referenciák tömbje
  const childRefs = useRef([]);

  // Referenciák frissítése, amikor a `people` változik
  useEffect(() => {
    childRefs.current = people.map((_, index) => childRefs.current[index] || React.createRef());
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

  // Manuális swipe függvény
  const swipe = (dir) => {
    
    // 1. Az utolsó kártya indexének meghatározása
    const lastIndex = people.length - 1;

    // 2. Ellenőrizzük, hogy van-e még kártya
    if (lastIndex >= 0) {
      // 3. Az utolsó kártyához tartozó referencia lekérése
      const lastCardRef = childRefs.current[lastIndex];
      

      // 4. Ellenőrizzük, hogy a referencia létezik és rendelkezik `current` tulajdonsággal
      if (lastCardRef?.current) {
        // 5. Swipe végrehajtása az utolsó kártyán
        lastCardRef.current.swipe(dir);
        console.log("asdhnawijlhkdk")
      }
    }
  
  };

  return (
    <div className="main-screen-container">
    <h1>Üdv Újra {userData.username ? userData.username : ""}!</h1>
      <h1>Találd meg a párod! 💘</h1>
      <div className="card-container">
        {people.map((person, index) => (
          <TinderCard
            ref={childRefs.current[index]} // Referencia hozzárendelése
            key={person.id}
            className="swipe"
            onSwipe={(dir) => onSwipe(dir, person)}
            onCardLeftScreen={() => onCardLeftScreen(person.id)}
            preventSwipe={["up", "down"]}
            flickOnSwipe={true} // Sima swipe-ot biztosít
          >
            <div className="card" style={{ backgroundImage: `url(${person.url})` }}>
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Gombok vízszintes elrendezése */}
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