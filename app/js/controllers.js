'use strict';

/* Controllers */


function WelcomeCtrl() {
}
//MyCtrl1.$inject = ['$scope', '$http'];


function GameCtrl($scope, Problem) {
  var problems = Problem.query(function(problems){
     chooseProblemAtRandom(); 
     initDisplayedPhrase(); 
  });

  $scope.pickProblem = function(){
    chooseProblemAtRandom(); 
    initDisplayedPhrase();
  }
  
  var chooseProblemAtRandom = function(){
    var randomnumber=Math.floor(Math.random()*problems.length);
    $scope.pickedProblem = problems[randomnumber];
   
  }

 var initDisplayedPhrase = function(){
    $scope.displayedPhrase = $scope.pickedProblem.phrase.split('');
    for(var i=0; i<$scope.displayedPhrase.length; i++){
      var letter = $scope.displayedPhrase[i].toUpperCase();
      if(letter >= "A" && letter <= "Z"){
        $scope.displayedPhrase[i]='_';
      }
    }    
    $scope.errorLeft = $scope.pickedProblem.errorallowed;
    $scope.gameStatus = "inGame";
    $scope.selected = new Object();
  }

  $scope.updateDisplay = function(input){
    if(!$scope.selected[input]){
      $scope.selected[input]=true;
      if($scope.gameStatus == "inGame"){
        var hit = false;
        for(var i=0; i<$scope.displayedPhrase.length; i++){
          var letter = $scope.displayedPhrase[i];
          if(letter == '_' && $scope.pickedProblem.phrase.charAt(i).toUpperCase() == input.toUpperCase()){
            $scope.displayedPhrase[i]=$scope.pickedProblem.phrase.charAt(i);
            hit = true;
          }
        }
        if(hit && isWin()){
          $scope.gameStatus = "win";        
        }
        if(!hit){
          $scope.errorLeft--;
          if($scope.errorLeft == 0){
            $scope.gameStatus = "fail";
          } 
        }
      }
    }
  }

  $scope.showAnswer = function(){
     $scope.displayedPhrase = $scope.pickedProblem.phrase.split('');
  }
  
  $scope.getStatusText = function(){
    if($scope.gameStatus == "win"){
      return "You got it! Congrats!";
    }
    if($scope.gameStatus == "fail"){
      return "Sorry, try again!";
    }
  }

  var isWin = function(){
    return $scope.displayedPhrase.toString() == $scope.pickedProblem.phrase.split('').toString();
  }
 
}
//MyCtrl2.$inject = ['$scope', 'Problem'];
