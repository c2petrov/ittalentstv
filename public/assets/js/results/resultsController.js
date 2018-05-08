app.controller('ResultsController', function($scope, $window, $location, ResultsService) {
    var searchQuery = $location.search().search_query;
    if ((typeof searchQuery != "string") || !searchQuery) {
        $location.url('/');
        return;
    }

    $scope.videos = [];
    $scope.options = [
        {description: 'Most Popular', value: '-viewCount'},
        {description: 'Title', value: 'title'},
        {description: 'Likes', value: '-likedByUserIDs.length'},
        {description: 'Upload Date', value: '-uploadDate'}
    ];

    $scope.sortSelect = '';
    $scope.sortedBy = '';

    $scope.changeOption = function(option){
        $scope.sortedBy = option.description;
        $scope.sortSelect = option.value;
    };

    ResultsService.getVideos(searchQuery)
        .then(function (videos) {
            $scope.$apply(function () {
                $scope.videos = videos;
            });
        })
        .catch(err => console.log(err));

});