function onLoad() {
  let ClickedImage=null;
  let userName="abbas";
  let state="start"
  console.log(state)   // cheking the starting sate
  // start---> selection------>voting----->result
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
 $( "#searchTerm" ).autocomplete( "search", "" );
     state= "selection"
     console.log(state)   // to check if we are changeing the state
    },
  });


  // voting state


  let users = [];
  let voteButton = document.getElementById("vote");
  function onVoteButtonCliked() {
    let user = prompt("please enter your name ? ");
    users.push(user);
     state="voting";
    console.log(state); // cheking if the state is changing
    let theDiv = '<div id="user-01"><h2>' + user + "</h2></div>";
    document.getElementById("container-users").innerHTML =
      document.getElementById("container-users").innerHTML + theDiv;
      ClickedImage.addEventListener("click", onClickedImage);
      
  }
  console.log(users)

  voteButton.addEventListener("click", onVoteButtonCliked);
let usersIndex=0
function onClickedImage(){
  if (state==="voting") {
    userName=users[usersIndex]
    console.log("this is the user name",userName)  
  }else {
    console.log("not in voting");
  }
}

 


function selectedSerchBox(selectedImage) {
  $(".container-movies").append(
    "<div><img class='thumbnail-01' id='thumbnail'"+usersIndex+" src='Imges/" + selectedImage + ".jpg' >"
    
  );
  
  ClickedImage=document.getElementById("thumbnail"+toString(usersIndex));
  
}

// next button:
let nextButton = document.getElementById("next");
  function onNextButtonCliked() {
    let user = prompt("please enter your name ? ");
    users.push(user);
     state="voting";
    console.log(state); // cheking if the state is changing
    usersIndex++;
    let theDiv = '<div id="user-01"><h2>' + user + "</h2></div>";
    document.getElementById("container-users").innerHTML =
      document.getElementById("container-users").innerHTML + theDiv;
      // ClickedImage.addEventListener("click", onClickedImage);
      
  }
  nextButton.addEventListener("click", onNextButtonCliked);



}

window.onload = onLoad;
