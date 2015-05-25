slasherNews
  .controller('CommentController', ['$rootScope','$scope', '$state', 'Comment', 'post',
    function($rootScope, $scope, $state, Comment, post) {
    
    $rootScope.post = post;

    $scope.initNewComment = function(){
      $scope.newcomment = {body: ""};
    };

    $scope.createComment = function(){
      new_comment = Comment.create($rootScope.post.id, $scope.newcomment);
      $rootScope.post.comments.push(new_comment);
      $state.go('post');
      $scope.initNewComment();
    };

    $scope.upvoteComment = function(comment){
      if (!$rootScope.current_user){
        alert("You need to be logged in to vote");
      }else{
        if (comment.voters.indexOf($rootScope.current_user.id.toString()) < 0){
          comment.upvotes += 1;
          comment.voters.push($rootScope.current_user.id.toString());
          Comment.upvote(comment.post_id, comment.id)
        };
      }
    };

    $scope.deleteComment = function(comment){
      Comment.delete(comment.post_id, comment.id);
      var index = $rootScope.post.comments.indexOf(comment);
      $rootScope.post.comments.splice(index, 1);
    };
  }]);