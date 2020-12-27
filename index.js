function onLoad() {
  let userName = "";
  let state = "selection";
  let counter_vote = 0;

  console.log(state); // cheking the starting sate
  /*
  start---> selection------>voting----->result 
  */
  let movieList2 = [
    { label: "chernobyl(2019)", value: "01" },
    { label: "the boys", value: "02" },
    { label: "good omens", value: "03" },
    { label: "carnival row", value: "04" },
    { label: "the dark knight", value: "05" },
    { label: "lord of the ring-the return of the king", value: "07" },
    { label: "forrest gump", value: "08" },
    { label: "the star wars sage continues", value: "09" },
    { label: "seven", value: "10" },
    { label: "life is beautiful", value: "11" },
    { label: "the silence of the lamb", value: "12" },
    { label: "saving private Ryan", value: "13" },
    { label: "green mile", value: "14" },
    { label: "leon the profetional", value: "15" },
    { label: "interstalar", value: "16" },
    { label: "the pianist", value: "17" },
    { label: "gladiator", value: "18" },
    { label: "joker", value: "19" },
  ];

  $("#searchTerm").autocomplete({
    source: movieList2,
  });

  let selectedMovieList = [];

  $("#searchTerm").autocomplete({
    select: function (event, ui) {
      let selected = ui.item.value;
      if (selectedMovieList.includes(selected)) {
        alert(" The movie is already selected");
        return;
      }
      if (selectedMovieList.length >= 6) {
        alert("you have reached your limit");
        return;
      }
      selectedSerchBox(selected);
      selectedMovieList.push(selected);
      $("#searchTerm").autocomplete("search", "");
      console.log(state); // to check if we are changeing the state
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
    // console.log(state); // cheking if the state is changing
    let theDiv = '<div id="user-01"><h2>' + user + "</h2></div>";
    document.getElementById("container-users").innerHTML =
      document.getElementById("container-users").innerHTML ;
    for (let index = 0; index < movieIndex; index++) {
      document
        .getElementById("thumbnail" + index)
        .addEventListener("click", onClickedImage);
    }
  }
  // console.log(users);

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
        // console.log(clickedToVote);
        votes[usersIndex].push(clickedToVote);
        // console.log("this is inside the voted list" + votes[usersIndex]);
        // console.log(e.target.nextSibling.getAttribute("id"));

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
    // console.log(state); // cheking if the state is changing
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

    // console.log("this will print my list:  " + myList);
    // console.log("this will print movie ides:  " + movieIds);
    // console.log(
    //   "this will prit the nymber of accurance in the list :  " + numberOfClicked
    // );

    // console.log(Math.max.apply(null, numberOfClicked));
    let theMostAccured = Math.max.apply(null, numberOfClicked);
    // console.log(movieIds[numberOfClicked.indexOf(theMostAccured)]);
    return movieIds[numberOfClicked.indexOf(theMostAccured)]
  }

  let finishButton = document.getElementById("finish");
  // this function will find the winner movie and print that movie on the screen
  function onFinishButtonClicked() {
    console.log("finish button cliked");
    let myNode = document.getElementById("movieHolder");
    myNode.innerHTML = " ";  // to remove all the elements of the movie-container 
    let flattenedVotes = votes.flat();
    console.log("this is the flattened list", flattenedVotes);
    let winner_movie =findTheMostaccuranced(flattenedVotes);
    $(".container-movies").append(
      "<div><h2 id='theWinner'>The winner is </h2><img class='thumbnail-01' id='theWinner' src='Imges/" +
        winner_movie +
        ".jpg' --data-movieId='" +
        winner_movie +
        "' ><p style='font-size:30px'; id='" +
        winner_movie +
        "'></p>"
    );

    let winner_user=[] 
    for (i=0;i<votes.length;i++){
      if(votes[i].includes(winner_movie)){
        winner_user.push(users[i])
      }

    }
    console.log("this is the users who vote for the wiiner movie"+winner_user)
    
        for (i=0;i<winner_user.length;i++){
          let currentName = document.getElementById(winner_movie).innerHTML;
          let spacer = currentName.length > 0 ? ", " : "";
          document.getElementById(winner_movie).innerHTML=
           currentName + spacer + winner_user[i];
        }
       
  }

  finishButton.addEventListener("click", onFinishButtonClicked);
}

window.onload = onLoad;
