var app=angular.module('myApp',['ngRoute']);

const {remote}=require('electron')

//part2
app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'./select.html',
        controller:'selectCtrl'
    })
    .when('/edit',{
        templateUrl:'./edit.html',
        controller:'editCtrl'
    })
    .otherwise({
        template:'Page Not Found'
    })
})

app.controller('frameCtrl',function($scope){

    var win=remote.getCurrentWindow();
    $scope.close=function(){
        win.close();
    }
    $scope.max=function(){
        if(win.isMaximized()){
            win.unmaximize()
        }else{
            win.maximize()
        }
    }
    $scope.min=function(){
        win.minimize();
    }

});

//part2
app.controller('selectCtrl',function($scope,$location){
    $scope.imageSelect=function(){
        var {dialog}=remote;

        dialog.showOpenDialog({
            properties:['OpenFile'],
            filters:[{
                name:'Images',
                extensions:['jpg','jpeg','png']
            }]
        },function(file){
            if(!!file){
                var path=file[0];
                $location.path('/edit');
                $scope.$apply();
            }
        })
    }
});