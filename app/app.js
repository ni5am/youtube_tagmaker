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
        var preset = {"name":"Untitled Profile", "active":"active", "autoplay": false, "loop": false}; // 디폴트 세팅이 여기에 박힐거얌

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
}]);
