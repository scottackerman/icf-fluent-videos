angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router'
])


.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http, $modal ) {
    
    var ModalCtrl = function ($scope, $modalInstance, video) {
        $scope.video = video;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if ( angular.isDefined( toState.data.pageTitle ) ) {
            $scope.pageTitle = toState.data.pageTitle + ' | ICF' ;
        }
    });

    $scope.app = {};
    $scope.lectureType = 'all';

    $scope.app.openVideoModal = function (video) {
        var modalInstance = $modal.open({
            templateUrl: 'home/modal.tpl.html',
            controller: ModalCtrl,
            backdrop: 'static',
            size: 'lg',
            resolve: {
                video: function () {
                    return video;
                }
            }
        });
    };
    
    $scope.app.setLectureType = function (lectureType) {
      $scope.lectureType = lectureType;
    };
    
    $scope.app.getLectureType = function (lectureType) {
      return $scope.lectureType === lectureType;
    };

    $http({method: 'GET', url: 'assets/videos.json'})
        .success(function (data) {
            var videoPath = data.videoPath,
                videos = data.videos,
                available;

            _.each(videos, function (video) {
                // Construct the url
                video.url = videoPath + video.filename;
                video.thumb = video.url + '.png';
                video.mp4 = video.url + '.mp4';
                video.ogv = video.url + '.oggtheora.ogv';
                video.webm = video.url + '.webmsd.webm';
            });

            available = _.filter(videos, function (video) {
                return video.filename;
            });

            // Put videos with a filename at the top of the list.
            $scope.app.videos = available.concat(_.difference(videos, available));
            $scope.app.downloadsPath = data.filesPath;
        
        })
        .error(function (data) {

        });
});

