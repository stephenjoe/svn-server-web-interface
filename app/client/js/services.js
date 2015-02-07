appServices.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }

    return auth;
});

appServices.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
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
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $location.path("/admin/login");
            }

            return $q.reject(rejection);
        }
    };
});

appServices.factory('PostService', function($http) {
    return {
        findAllPublished: function() {
            return $http.get(options.api.base_url + '/post');
        },

        findByTag: function(tag) {
            return $http.get(options.api.base_url + '/tag/' + tag);
        },

        read: function(id) {
            return $http.get(options.api.base_url + '/post/' + id);
        },
        
        findAll: function() {
            return $http.get(options.api.base_url + '/post/all');
        },

        changePublishState: function(id, newPublishState) {
            return $http.put(options.api.base_url + '/post', {'post': {_id: id, is_published: newPublishState}});
        },

        delete: function(id) {
            return $http.delete(options.api.base_url + '/post/' + id);
        },

        create: function(post) {
            return $http.post(options.api.base_url + '/post', {'post': post});
        },

        update: function(post) {
            return $http.put(options.api.base_url + '/post', {'post': post});
        },

        like: function(id) {
            return $http.post(options.api.base_url  + '/post/like', {'id': id});
        },

        unlike: function(id) {
            return $http.post(options.api.base_url  + '/post/unlike', {'id': id}); 
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
            return $http.delete(options.api.base_url + '/deleterespository', {respositoryname: respositoryname,svnparentpath:svnparentpath});
        },
        adduser: function(username,password,authuserfile) {
            return $http.post(options.api.base_url + '/adduser', {username: username,password: password,authuserfile:authuserfile});
        }, 
        listAllrespository: function(svnparentpath) {

            return $http.post(options.api.base_url + '/listAllrespository', {svnparentpath:svnparentpath});
        },
        listAlluser: function(authuserfile) {
            return $http.post(options.api.base_url + '/listAlluser', {authuserfile:authuserfile});
        }
        deleteuser: function(authuserfile,username) {
            return $http.delete(options.api.base_url + '/listAlluser', {username,username,authuserfile:authuserfile});
        }
    }
});

