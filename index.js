function onLoad(){
  let voteButton=document.getElementById("vote");
  function onVoteButtonCliked (){
    let user=prompt("please enter your name")
  }
  function onClickedSerchedItem(){
    let changeImg=document.getElementsByClassName("thumbnail-01").src="Imges/01.jpg";

  }
  voteButton.addEventListener("click",onVoteButtonCliked)
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
  $( ".selector" ).on( "autocompletefocus", onClickedSerchedItem( ) );


}
window.onload=onLoad;
