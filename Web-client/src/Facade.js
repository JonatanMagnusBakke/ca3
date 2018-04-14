class Facade {
    fetchPerson = () => {
        var URL = "https://swapi.co";
        var number = Math.floor(Math.random() * 88);
        return fetch(URL + "/api/info/people/" + number).then(res => res.json);
    }
}

const facade = new Facade();
export default facade;


/*
fetch("https://swapi.co/api/people/1/")
.then(response => response.json())
.then(data => {
  const person = data;
  */