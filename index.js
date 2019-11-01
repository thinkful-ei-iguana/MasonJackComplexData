
//Base URL: developer.nps.gov/api/v1/parks

//get the information from the right search and put that information into .searchResults
//returns a json object from the right api

const apiKey = 'hbg8PEDQ1nKJMAMMYT5DvE3xBdXLKXev8ea5OOuu';

//turns the jsonObj into stuff we care about seeing 
function displayResults(jsonObj){
    let finalString = '';
    jsonObj.data.forEach(element => {
        console.log(element.fullName);
        finalString += `
        <ul>
            <li>${element.fullName}</li>
            <li>${element.description}</li>
            <li><a href=${element.url}>${element.url}</a></li>
        </ul>
        `
    });
    $('.searchResults').html(finalString);
}

/*function makeHTML(jsonObj) {
  
    
    return finalString;
}*/

//stateCode=${park}
function getResults(states, numResults) {
    
    if(numResults === 0){ numResults = 10;}
    let url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&limit=${numResults}`;
    states.forEach(element => url += `&stateCode=${element}`);
    fetch(url)
    .then(response => response.json())
    .then(responseJson =>{
        //display results 
        displayResults(responseJson);
    });
}



function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let numResults = Number($(event.currentTarget).find('#resultNum').val());
      let states = $(event.currentTarget).find('#state').val().split(" ");
      getResults(states, numResults);
    });
  }
  
  $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });