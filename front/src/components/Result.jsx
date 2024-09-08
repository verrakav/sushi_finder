function Result({result}) {
  const resultList = result.map(sushi => {
    return (
      <li key={sushi._id}>
        <h4>
          {sushi.name} - {sushi.calories}
        </h4>
        <span>{sushi.ingredients}</span>
      </li>
    );
  });

  return (
    <div>
      <h3>Our pick for you</h3>
      <div>{resultList}</div>
    </div>
  );
}

export default Result;
