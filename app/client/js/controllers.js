appControllers.controller('SVNctrl', ['$scope', '$location','$window','SvnService',
    function SVNctrl($scope,$location,$window,SvnService) {

        $scope.isShow=true;
        $scope.listAllrespositorydata="";
        $scope.listAlluserdata="";

        $scope.popupaction = function() {

            $scope.isShow = true;
        }

        $scope.connectsvn=function (){

            var svnparentpath = $scope.svnparentpath;
            var authuserfile = $scope.AuthUserFile;

            SvnService.connectSvn(svnparentpath,authuserfile).success(function(data) {
                 
                 

                 if(data.success==0){

                     $scope.message=data.message;
                     console.log(data.success);
                     $scope.isShow=false;
                 }else{

                    $window.sessionStorage.svnparentpath=svnparentpath;
                    $window.sessionStorage.authuserfile=authuserfile;

                    $location.path('/addrepository');
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.deleterespository=function(){

          
            SvnService.deleterespository($scope.respositoryname,$window.sessionStorage.svnparentpath).success(function(data) {

                 console.log(data);
                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{

                    $window.location.reload();
                    //  $location.path('/addrepository');
                   
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }


        $scope.respositorydetails=function(){

          
            SvnService.newrespository($scope.respositoryname,$window.sessionStorage.svnparentpath).success(function(data) {

              
                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{

                    $window.location.reload();
                    //  $location.path('/addrepository');
                   
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }
        $scope.newrespository=function(){

          
            SvnService.newrespository($scope.respositoryname,$window.sessionStorage.svnparentpath).success(function(data) {

              console.log(data);
                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{

                    $window.location.reload();
                    //  $location.path('/addrepository');
                   
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }

        $scope.listAllrespository=function(){

            SvnService.listAllrespository($window.sessionStorage.svnparentpath).success(function(data) {

                console.log(data);
                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{
                     $scope.listAllrespositorydata=data;
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }

        $scope.listAlluser=function(){

            SvnService.listAlluser($window.sessionStorage.authuserfile).success(function(data) {

                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{
                     $scope.listAlluserdata=data;
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }


         $scope.adduser=function(){

           
            SvnService.adduser($scope.username,$scope.password,$window.sessionStorage.authuserfile).success(function(data) {

                 console.log(data);

                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{
                    
                    $window.location.reload();                   
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }

        $scope.deleteuser=function(){

           
            SvnService.deleteuser($scope.username,$window.sessionStorage.authuserfile).success(function(data) {

                 console.log(data);

                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{
                    
                    $window.location.reload();                   
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }


        if($window.sessionStorage.svnparentpath!=undefined){

            $scope.listAllrespository();
            $scope.listAlluser();     
        }
       
    }
]);
