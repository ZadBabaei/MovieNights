function onLoad(){
  let users=[]
  let voteButton=document.getElementById("vote");
  function onVoteButtonCliked (){
    let user=prompt("please enter your name ? ")
    users.push(user)
    let theDiv="<div id=\"user-01\"><h3>"+user+"</h3></div>"
  
   document.getElementById("container-users").innerHTML=document.getElementById("container-users").innerHTML+theDiv

    
  

    
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
    source: movieList,
    select: function( event, ui ) {
      var selected = ui.item.value;
      selectedSerchBox(selected); 
    }
  });
  


}

var whichSquare = 1;
function selectedSerchBox(x) {
  $(".container-movies").append("<img class='thumbnail-01' src='Imges/"+x+".jpg' >");
  whichSquare++;
}

window.onload=onLoad;
