app.controller('MyVideosController', function ($scope, $window, $location, MyVideosService) {
    $scope.myVideos = [];

    MyVideosService.getMyVideos()
        .then(function (videos) {
            $scope.$apply(function () {
                $scope.myVideos = videos;
            });
        })
        .catch(err => alert(err.data.err));


    $scope.deleteVideo = function (video) {
        var videoId = video._id;

        MyVideosService.deleteVideo(videoId)
            .then(function () {
                MyVideosService.getMyVideos()
                    .then(function (videos) {
                        $scope.$apply(function () {
                            $scope.myVideos = videos;
                        });
                    })
                    .catch(err => alert(err.data.err));
            })
            .catch(err => alert(err.data.err));
    };


    $scope.openLink = function (video) {
        $location.path(video._id);
    };

    $scope.editVideo = function (video) {
        angular.element('#title-edit').val(video.title);
        angular.element('#description-edit').val(video.description);
        angular.element('#tags-edit').val(video.tags.toString());
        angular.element('#tags-edit').tagsinput('refresh');


        angular.element('#save').on('click', function () {
            video.title = angular.element('#title-edit').val();
            video.description = angular.element('#description-edit').val();
            video.tags = angular.element('#tags-edit').val();


            console.log(video.title);
            console.log(video.description);
            console.log(video.tags);
        })
    }


});
