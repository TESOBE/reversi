/* Copyright 2012 TESOBE/Music Pictures Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License */




var i = 1; //i=angeklicktes Feld
for (var y = 0; y<= 7; y++) { //Aufbau der x-Achse  
  document.write("<tr>"); 
for (var x = 0; x<= 7; x++) { //Aufbau der y-Achse
  document.write("<td>");       
  if (x==3 && y==3 || x==4 && y==4) {
    document.write("<img id='" +  i +"' src ='white.png'>");} //ID-vergabe eines der Anfangsfelder in der Mitte
  else if (x==4 && y==3 || x==3 && y==4) {
    document.write("<img id='" +  i +"' src ='black.png'>");} //ID-vergabe eines der Anfangsfelder in der Mitte
  else{
    document.write("<img id='" +  i +"' src ='empty.png'>");}	//ID-vergabe der emptyen Felder
  document.write("</td>"); 
  i++;  
}
document.write("</tr>");
} 
var player = 1;
var player1 = (player === 1)
var player2 = (player === 2) 
$(document).ready(function(){
  $("#Feld").on({
    mouseenter: function() {
      if ($(this).attr("src") === "empty.png"){
        $(this).addClass("transparent");        
      }      
    },
    mouseleave: function() {
      if ($(this).attr("src") === "empty.png") {
        $(this).removeClass("transparent");
      }
    }   
  }, "");                                                                                      

	$("#Field").find("img").click(function(event){ //wenn das Feld angeklickt wird passieren folgende Sachen
  console.log ("bild clicked")	;
  if (player != 1) {
    return
  }     
    
 

var i = parseInt($(this).attr("id")); //macht alle Werte zu Zahlen 
    

    var correctdirections = check(player, i);      
    if (correctdirections.length === 0) { //falls der Zug nicht als gültig deklariert worden ist, dann
      alert("incorrect move"); //wird der player gewarnt         
    }
    else { 
      zug(mycolor(player), othercolor(player), this,correctdirections); //falls der Zug gültig ist, dann werden die entsprechenden Steine gesetzt 
      player = 2; //und der other player ist dran
      console.log(mycolor(player) + "before calculatemove"); 
      window.setTimeout(calculatemove,1000)
    }
  })
})

var zug = function(color, playercolor, element, correctdirections)  { // Variable Zug wird definiert
      console.log(element);
      if ($(element).attr("src") === "empty.png") {  //wenn ein emptyes Feld angeklickt wird, dann           
        $("h2").text(playercolor + "'s turn"); //ändert sich die Überschrift 
        $(element).attr("src", color + ".png").removeClass("transparent");; //und die color
        $.each(correctdirections, function(k, direction) {
          var otherId = parseInt($(element).attr("id"))+direction          
          while ($("#" + otherId).attr("src") == playercolor + ".png") {
            $("#" + otherId).attr("src", color + ".png");
            otherId  +=  direction
          }
        })
      }     
    }


var mycolor = function(p) {  
   
    if (p === 1){ //falls der player den Wert 1 hat, dann
      return "white" //ist seine color white
    }
    else if (p === 2){ //falls der player den Wert 2 hat, dann
      return "black" //ist seine color black
    }
  }
  
  var othercolor = function(p) {  
   
    if (p === 1){ //falls der player den Wert 1 hat, dann
      return "black" //ist seine color white
    }
    else if (p === 2){ //falls der player den Wert 2 hat, dann
      return "white" //ist seine color black
    }
  }


var check = function (player, i){ //neue funktion
      if ($("#" + i).attr("src") === "black.png"){ //falls ein blacker Stein angeklickt wird, dann
        if (player === 1) {
          alert("There's already a black stone on this field!"); //erscheint diese Warnung
        }
        return new Array ();
      }  
      else if ($("#" + i).attr("src") === "white.png" ){ //falls ein whiteer Stein angeklickt wird, dann
        if (player === 1) {
          alert("There's already a white stone on this field!"); //erscheint diese Warnung
        }
        return new Array ();
      }
      console.log("checkingfeld" + i)
    var directions = new Array(-9,-8,-7,-1,1,7,8,9); //neuer Array mit den acht directions
    if (i == 1) {
      directions = new Array(1,8,9)      
    }
    else if (i == 8) {
      directions = new Array(-1,7,8)      
    }
    else if (i == 57) {
      directions = new Array(1,-8,-7)      
    }
    else if (i == 64) {
      directions = new Array(-1,-9,-8)      
    }
    else if (i % 8 == 0) {
      directions = new Array(-9,-8,-1, 7,8)
    }
    else if (i % 8 == 1) {
      directions = new Array(-8,-7,1,8,9)
    }
    correctdirections = new Array(); //emptyer Array, der correcte Spielzüge aufnehmen soll
    $.each(directions, function(k, direction){ //alle directions in diesen Werten
      var $imageindirection = $("#" + (i + direction)).attr("src");
      if ($imageindirection === mycolor(player) + ".png" ) { //falls in der direction my color liegt, dann
        console.log("direction " + direction + " incorrect " + mycolor(player)); //ist die direction ungültig
      }
      else if ($imageindirection === "empty.png" ) { //falls in der direction ein emptyes Feld liegt, dann
        console.log("direction " + direction + "  incorrect" + "empty.png"); //ist die direction ungültig
      }
      else if ($imageindirection === othercolor(player)+ ".png") { //falls in der direction eine other color liegt, dann
        console.log("othercolor:" + othercolor(player))
        var limit = 7;
        if (direction === -1) {
          limit = (i+ 7) % 8;
        }
        else if  (direction === 1){
          limit = 7 - ((i+7)% 8);
        }
        for (var m = 2;m<=limit; m++) { //soll in der direction weitergeprüft werden
          var $checkoutdirection = $("#" + (i + m*direction)).attr("src");
          if ($checkoutdirection === mycolor(player) + ".png") { //falls my color in der direction liegt, dann
            console.log("direction " + direction + " correct " + mycolor(player)) //soll  sie als correct deklariert 
            correctdirections.push(direction) //und sie in den Array correctdirections geschoben werden
            break //und dann muss die Schleife aufhören
          }
          else if ($checkoutdirection === "empty.png") { //falls in der direction ein emptyes Feld liegt, dann 
            console.log("direction " + direction + " incorrect empty") //soll sie als incorrect deklariert werden 
            break//und dann muss die Schleife aufhören
          }
          else if ($checkoutdirection === othercolor(player) + ".png") { //falls in der direction eine weitere other other color ist, dann 
            console.log("direction " + direction + " still correct..." + othercolor(player)) //soll in der direction weiter geprüft werden                          
          }
        }
      }
    })
    return correctdirections
    }



function calculatemove() {
      console.log("KI am Zug");
      for (var c=1; c<= 64; c++) {
          var correctdirections = check(player, c); 
          console.log(c)          
          if (correctdirections.length > 0){
            zug(mycolor(player), othercolor(player), $("#" + c), correctdirections)
             player = 1
            break
          }
      }
    }


var skip = function() {
  player =  3-player
  var playercolor = mycolor(player);
  console.log(player);
  $("h2").text(playercolor + "s move");
  window.setTimeout(calculatemove,1000)
}





