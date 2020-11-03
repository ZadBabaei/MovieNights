function onLoad(){
  let users=[]
  let voteButton=document.getElementById("vote");
  function onVoteButtonCliked (){
    let user=prompt("please enter your name ? ")
    users.push(user)
    

    
  

    console.log(users)
  }
  voteButton.addEventListener("click",onVoteButtonCliked)
  function onClickedSerchedItem(){
    let changeImg=document.getElementsByClassName("thumbnail-01").src="Imges/01.jpg";

  }
  let movieList=[
    "chernobyl",
    "the boys",
    "good omens",
    "carnival row",
    "the dark knight",
    "lord of the ring-the return of the kig",
    "forrest gump",
    "the star wars sage continues",
    "seven",
    "life is beautiful",
    "the silence of the lambs",
    "saving private ryan",
    "green mile",
    "leon the profetional",
    "interstellar",
    "the pianist",
    "gladiator",
    "joker",


  ]
  $( "#searchTerm" ).autocomplete({
    source: movieList
  });
  


}
window.onload=onLoad;
