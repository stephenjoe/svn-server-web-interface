

appServices.factory('TokenInterceptor', function ($q, $window, $location) {
    return {
        request: function (config) {

            var currentpath = $location.path();

            /*if($window.sessionStorage.svnparentpath==undefined){

                if(currentpath!='/'&&currentpath!='/connectsvn'){

                    console.log("parentpath"+$window.sessionStorage.svnparentpath);
                    console.log("location.path()"+$location.path());
         
                }
            }*/
           
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            

            return $q.reject(rejection);
        }
    };
});



appServices.factory('SvnService', function ($http) {
    return {
        connectSvn: function(svnparentpath, AuthUserFile) {
            return $http.post(options.api.base_url + '/connectsvn', {svnparentpath: svnparentpath, AuthUserFile: AuthUserFile});
        },
        newrespository: function(respositoryname,svnparentpath) {
            return $http.post(options.api.base_url + '/newrespository', {respositoryname: respositoryname,svnparentpath:svnparentpath});
        },
        respositorydetails: function(respositoryname,svnparentpath) {
            return $http.post(options.api.base_url + '/respositorydetails', {respositoryname: respositoryname,svnparentpath:svnparentpath});
        }, 
        deleterespository: function(respositoryname,svnparentpath) {
            return $http.post(options.api.base_url + '/deleterespository', {respositoryname: respositoryname,svnparentpath:svnparentpath});
        },
        adduser: function(username,password,authuserfile) {
            return $http.post(options.api.base_url + '/adduser', {username: username,password: password,authuserfile:authuserfile});
        }, 
        listAllrespository: function(svnparentpath) {

            return $http.post(options.api.base_url + '/listAllrespository', {svnparentpath:svnparentpath});
        },
        listAlluser: function(authuserfile) {
            return $http.post(options.api.base_url + '/listAlluser', {authuserfile:authuserfile});
        },
        deleteuser: function(username,authuserfile) {
            return $http.post(options.api.base_url + '/deleteuser', {username:username,authuserfile:authuserfile});
        },
    }
});

