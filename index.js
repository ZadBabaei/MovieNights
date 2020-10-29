function onLoad(){
  let voteButton=document.getElementById("vote");
  function onVoteButtonCliked (){
    let user=prompt("please enter your name")
  }
  voteButton.addEventListener("click",onVoteButtonCliked)
  let movieList=[
    "1","11","111"
  ]
  $( "#searchTerm" ).autocomplete({
    source: movieList
  });


}
window.onload=onLoad;
