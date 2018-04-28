app.service('MyVideosService', function ($http) {
    //gets all videos that are uploaded by the logged user
    this.getMyVideos = function () {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:3000/myVideos')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(err => reject(err));
        });
    };


    //deletes selected video
    this.deleteVideo = function (id) {
        return new Promise(function (resolve, reject) {
            $http.delete('http://localhost:3000/myVideos/' + id)
                .then(function (response) {
                    var deletedVideo = response;
                    if (!!deletedVideo) {
                        resolve(deletedVideo);
                    } else {
                        throw new Error('There is no such ID');
                    }
                })
                .catch(err => reject(err));
        });
    };

});