# xpak-app
xpak-app

This is a full stack application writing with Ruby and rails framework (API) and ReactJs (Frontend)

To start the application use the following docker commands
## To start the API Run ```docker-compose -f docker-compose.api.yml up```
## To start the Frontend Run ```docker-compose up```

visit http://localhost:5174 on the browser to view the UI 


The API exposes endpoints for carrying out crud operations on the State and Vehicle resources. These State resources are the various states a Vehicle resource resource can have. The order field of the state model tells which order each state is of.

The API runs on the root url http://localhost:8000/api/v1 

Get to "/states" gives you list of available states.
Post to "/states" adds a new state.
Put to "/states/{id}" updates state with specified id.

Get to "/vehicles" gives you list of available vehicles.
Post to "/vehicles" adds a new vehicle.
Put to "/vehicles/{id}" updates the state of the vehicle with specified id.




