import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DogList from "./DogList";
import DogDetails from "./DogDetails";

function Routes({dogs}) {
  const getDog = props => {
    let name = props.match.params.name;
    let currentDog = dogs.find(
      dog => dog.name.toLowerCase() === name.toLowerCase()
    );
    return <DogDetails {...props} dog={currentDog} />;
  };
  
  return (
    <Switch>
      <Route
        exact
        path='/dogs'
        render={() => <DogList dogs={dogs} />}
      />
      <Route exact path='/dogs/:name' render={getDog} />
      <Redirect to='/dogs' />
    </Switch>
  );
}
export default Routes;
