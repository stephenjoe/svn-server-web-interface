appControllers.controller('SVNctrl', ['$scope', '$location','$window','SvnService',
    function SVNctrl($scope,$location,$window,SvnService) {

        $scope.isShow=true;
        $scope.listAllrespositorydata="";
        $scope.listAlluserdata="";

       // 

        $scope.popupaction = function() {

            $scope.isShow = true;
        }
        $scope.connectsvn=function (){


            SvnService.connectSvn($scope.svnparentpath,$scope.AuthUserFile).success(function(data) {
                 
                 console.log(data);

                 if(data.success==0){

                     $scope.message=data.message;
                     console.log(data.success);
                     $scope.isShow=false;
                 }else{
                    $location.path('/addrepository');
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });
        }
        $scope.newrespository=function(){

            console.log($scope.respositoryname);
            SvnService.newrespository($scope.respositoryname).success(function(data) {

              
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

            SvnService.listAllrespository().success(function(data) {

                 if(data.success==0){

                     $scope.message=data.message;
                     $scope.isShow=false;

                 }else{
                     $scope.listAllrespositorydata=data;
                  //  console.log($scope.listAllrespositorydata);
                   
                 }

            }).error(function(data, status) {
                console.log(status);
                console.log(data);
            });


        }

        $scope.listAlluser=function(){

            SvnService.listAlluser().success(function(data) {

              
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

           
            SvnService.adduser($scope.username,$scope.password).success(function(data) {

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


        $scope.listAllrespository();
        $scope.listAlluser();
    }
]);
