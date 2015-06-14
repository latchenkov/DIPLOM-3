adsManagementApp.factory('Informer', function ($timeout) {
    
return {
        
    show: function ($rootScope, status, message){
        $rootScope.informer = {};
            if (status === 'success'){
                $rootScope.informer.status = 'alert-success';
            }
            else if (status === 'error'){
                $rootScope.informer.status = 'alert-danger';
            }
            else if (status === 'warning'){
                $rootScope.informer.status = 'alert-warning';
            }
            $rootScope.informer.text = message;
                $rootScope.informer.show = true;
                    $timeout(function(){
                        $rootScope.informer.show = false;
                    }, 2000
                    );
    }
    }; 
});


