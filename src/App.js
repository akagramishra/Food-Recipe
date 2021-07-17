import Axios from "axios";
import { useState } from "react";
import "./App.css";
import RecipeTile from "./RecipeTile";

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthlabel, sethealthlabel] = useState("vegan")

  const YOUR_APP_ID = `e00b06a3`;
  const YOUR_APP_KEY = "2a18866925e7cbb4f5577f814d49caa4";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthlabel}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Foodistan - Health is Priority</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
        required
          className="app__input"
          type="text"
          placeholder="Enter Your Favorite Ingredient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />

        <select className="app__healthLabels">
          <option>--Default--</option>
          <option onClick={() => sethealthlabel("vegan")}>Vegan</option>
          <option onClick={() => sethealthlabel("vegetarian")}>Vegetarian</option>
          <option onClick={() => sethealthlabel("wheat-free	")}>Wheat-free</option>
          <option onClick={() => sethealthlabel("red-meat-free")}>Red-meat-free</option>
          <option onClick={() => sethealthlabel("peanut-free")}>Peanut-free</option>
          <option onClick={() => sethealthlabel("paleo")}>Paleo</option>
          <option onClick={() => sethealthlabel("pork-free")}>Pork-free</option>
          <option onClick={() => sethealthlabel("alcohol-free	")}>Alcohol-free</option>
          <option onClick={() => sethealthlabel("immuno-supportive")}>Immuno-supportive</option>
          <option onClick={() => sethealthlabel("dairy-free")}>Dairy-free</option>
          <option onClick={() => sethealthlabel("egg-free")}>Egg-free</option>
          <option onClick={() => sethealthlabel("gluten-free")}>Gluten-free</option>
        </select>
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;