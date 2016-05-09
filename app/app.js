var app = angular.module('app', ['ngStorage']);


app.controller('presetCtrl', ['$scope', '$localStorage', '$rootScope', function ($scope, $localStorage, $rootScope) {
    $scope.presets = $localStorage.presets;

    $scope.select = function(index) {

        if($localStorage.activePreset != null)
            $scope.presets[$localStorage.activePreset].active = "";

        $scope.presets[index].active = "active";

        $localStorage.activePreset = index;

        $rootScope.$broadcast('update', {});

    };

    $scope.remove = function(index) {
        if($scope.presets.length == 1){
            alert('삭제 불가');
            return;
        }

        if(index < ($scope.presets.length-1)){
            $scope.presets[index+1].active = "active";
        }else {
            $scope.presets[index-1].active = "active";
            $localStorage.activePreset -= 1;
        }

        $scope.presets.splice(index, 1);

        $rootScope.$broadcast('update', {});

    };

    $scope.add = function() {
        var preset = {"name":"이름없는 프로필", "active":"active", "selectSize" : "auto", "customWidth" : "", "customHeight" : "", "version": "3", "tagType" : "iframe", "vq" : "auto", "theme" : "dark", "autohide" : "2", "controls" : "1", "autoplay" : 0, "loop" : 0, "rel" : 0, "showinfo" : 1, "private" : "www.youtube.com", "html5" : 0, "iv_load_policy" : 3, "cc_load_policy" : 0, "disablekb": 0, "modestbranding" : 0, "fs" : 1};
        //vg는 auto면 안넣음. 상단바 숨김은 true 하면 0,
        if($scope.presets == null){
            $scope.presets = [];
        }
        $scope.presets.push(preset);

        $localStorage.presets = $scope.presets;

        $scope.select($scope.presets.length-1);

        $rootScope.$broadcast('update', {});

    }
}]);

app.controller('controllerCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.preset = $localStorage.presets[$localStorage.activePreset];

    $scope.$on('update', function() {
        $scope.preset = $localStorage.presets[$localStorage.activePreset];
    });

    $scope.changeHtml = function () {
        if($scope.preset.html5 == "1"){
            $('#tagType').addClass('disabled');
        }else {
            $('#tagType').removeClass('disabled');
        }
    };
}]);
