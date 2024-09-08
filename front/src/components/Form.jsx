import {useState} from "react";
import Result from "./Result";

function Form() {
  const [ingredients, setIngredients] = useState([]);
  const [calories, setCalories] = useState(null);
  //passed on to the result component
  const [result, setResult] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    //constructing query
    const query = new URLSearchParams();
    if (ingredients) query.append("ingredients", ingredients);
    if (calories) query.append("calories", calories);

    try {
      //sending request to backend
      const response = await fetch(
        `http://localhost:5000/sushi/?${query.toString()}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      Form div
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredients">
          Ingredients
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
          />
        </label>

        <label htmlFor="calories">
          Calories
          <input
            type="number"
            id="calories"
            value={calories}
            onChange={e => setCalories(e.target.value)}
          />
        </label>
        <button type="submit">Hungry</button>
      </form>
      <Result result={result} />
    </>
  );
}

export default Form;
