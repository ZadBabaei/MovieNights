function onLoad() {
  let userName = "";
  let state = "selection";
  let counter_vote = 0;

  /*
  start---> selection------>voting----->result 
  */

  function source(req, callback) {
    const apiKey = "10b0cac006c85b52e64463b5977f8b8c";
    const baseUrl = "https://api.themoviedb.org/3/search/movie";
    let TmdbResponse = 0;
    axios
        .get(
          baseUrl +
            "?api_key=" +
            apiKey +
            "&language=en-US&page=1&query= "+req.term + "&include_adult=false"
        )
        .then((response) => {
          TmdbResponse = response.data.results;
          console.log(TmdbResponse);

          let result = TmdbResponse.map((item) => {
            const newobj = {
              label: item.original_title + " " + item.release_date,
              value: item.id,
            };
            return newobj;
          });
          console.log("in result", result);
          callback(result);
        });

    console.log(req.term);
    // make api call with req.term
    // put responses in an array of objects
    // each object should have a label (movie's name + year + director) and value (movie id)

    // callback([
    //   { label: "chernobyl (2019) felani", value: "1293812093" },
    //   { label: "the boys", value: "02" },
    //   { label: "good omens", value: "03" },
    //   { label: "carnival row", value: "04" },
    //   { label: "the dark knight", value: "05" },
    //   { label: "lord of the ring-the return of the king", value: "07" },
    //   { label: "forrest gump", value: "08" },
    //   { label: "the star wars sage continues", value: "09" },
    //   { label: "seven", value: "10" },
    //   { label: "life is beautiful", value: "11" },
    //   { label: "the silence of the lamb", value: "12" },
    //   { label: "saving private Ryan", value: "13" },
    //   { label: "green mile", value: "14" },
    //   { label: "leon the profetional", value: "15" },
    //   { label: "interstalar", value: "16" },
    //   { label: "the pianist", value: "17" },
    //   { label: "gladiator", value: "18" },
    //   { label: "joker", value: "19" },
    // ]);
  }

  $("#searchTerm").autocomplete({
    source: source,
  });

  let selectedMovieList = [];

  $("#searchTerm").autocomplete({
    select: function (event, ui) {
      let selectedMovieId = ui.item.value;
      if (selectedMovieList.includes(selectedMovieId)) {
        alert(" The movie is already selected");
        return;
      }
      if (selectedMovieList.length >= 6) {
        alert("you have reached your limit");
        return;
      }
      selectedSerchBox(selectedMovieId);
      selectedMovieList.push(selectedMovieId);
      $("#searchTerm").autocomplete("search", "");
    },
  });

  /*
  voting state
   */

  let users = [];
  let votes = [];
  let voteButton = document.getElementById("vote");
  function onVoteButtonCliked() {
    let user = prompt("please enter your name ? ");
    users.push(user);
    votes.push([]);
    state = "voting";
    let theDiv = '<div id="user-01"><h2>' + user + "</h2></div>";
    document.getElementById(
      "container-users"
    ).innerHTML = document.getElementById("container-users").innerHTML;
    for (let index = 0; index < movieIndex; index++) {
      document
        .getElementById("thumbnail" + index)
        .addEventListener("click", onClickedImage);
    }
  }

  voteButton.addEventListener("click", onVoteButtonCliked);
  let usersIndex = 0;

  /* 
  defining what happens when an imege been clicked
   */
  function onClickedImage(e) {
    let clickedToVote = e.target.getAttribute("--data-movieId");
    if (state === "voting" && counter_vote < 3) {
      if (votes[usersIndex].includes(clickedToVote)) {
        alert("same movie must not be voted more than once");
        return;
      } else {
        userName = users[usersIndex];
        votes[usersIndex].push(clickedToVote);

        /*  
        using the next sibiling to add the name under the images
        
        */
        let currentName = e.target.nextSibling.innerHTML;
        let spacer = currentName.length > 0 ? ", " : "";
        e.target.nextSibling.innerHTML =
          currentName + spacer + users[usersIndex];
        counter_vote++; // counts the number of votes for each user
      }
    } else {
      document.getElementById("vote").disabled = true;
      alert("you have reached the limit");
    }
  }

  let movieIndex = 0;
  function selectedSerchBox(movieId) {
    if (state == "selection") {
      let posterPath = "?";
      $(".container-movies").append(
        "<div><img class='thumbnail-01' id='thumbnail" +
          movieIndex +
          "' src='Imges/" +
          movieId +
          ".jpg' --data-movieId='" +
          movieId +
          "' ><p id='" +
          movieIndex +
          "'></p>"
      );
      movieIndex++;
    }
  }

  // next button:
  let nextButton = document.getElementById("next");
  function onNextButtonCliked() {
    document.getElementById("vote").disabled = true;
    counter_vote = 0;
    let user = prompt("please enter your name ? ");
    users.push(user);
    votes.push([]);
    state = "voting";
    usersIndex++;
    // let theDiv = '<div id="user-01"><h2>' + user + "</h2></div>";
    // document.getElementById("container-users").innerHTML =
    //   document.getElementById("container-users").innerHTML + theDiv;
    // ClickedImage.addEventListener("click", onClickedImage);
  }
  nextButton.addEventListener("click", onNextButtonCliked);

  // this is the function that recievs an array and returns the number of occurance of each element
  function findTheMostaccuranced(myList) {
    let movieIds = [];
    let numberOfClicked = [];
    let inNumberOfClicked = 1;
    myList.sort((a, b) => a - b);
    for (i = 0; i < myList.length; i++) {
      if (myList[i + 1] === myList[i]) {
        inNumberOfClicked++;
      } else {
        movieIds.push(myList[i]);
        numberOfClicked.push(inNumberOfClicked);
        inNumberOfClicked = 1;
      }
    }

    let theMostAccured = Math.max.apply(null, numberOfClicked);
    return movieIds[numberOfClicked.indexOf(theMostAccured)];
  }

  let finishButton = document.getElementById("finish");
  // this function will find the winner movie and print that movie on the screen
  function onFinishButtonClicked() {
    let myNode = document.getElementById("movieHolder");
    myNode.innerHTML = " "; // to remove all the elements of the movie-container
    let flattenedVotes = votes.flat();
    let winner_movie = findTheMostaccuranced(flattenedVotes);
    $(".container-movies").append(
      "<div><h2 id='theWinnerText'>the winner is: </h2><img class='thumbnail-01' id='theWinner' src='Imges/" +
        winner_movie +
        ".jpg' --data-movieId='" +
        winner_movie +
        "' ><p style='font-size:30px'; id='" +
        winner_movie +
        "'></p>"
    );

    let winner_user = [];
    for (i = 0; i < votes.length; i++) {
      if (votes[i].includes(winner_movie)) {
        winner_user.push(users[i]);
      }
    }

    for (i = 0; i < winner_user.length; i++) {
      let currentName = document.getElementById(winner_movie).innerHTML;
      let spacer = currentName.length > 0 ? ", " : "";
      document.getElementById(winner_movie).innerHTML =
        currentName + spacer + winner_user[i];
    }
  }

  finishButton.addEventListener("click", onFinishButtonClicked);
}

window.onload = onLoad;
