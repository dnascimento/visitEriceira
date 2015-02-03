'use strict';

angular.module('core').
    directive('bannerSponsors', function(){
        return  {
            restrict: 'E',
            replace: true,
            templateUrl: '/modules/core/views/sponsors.view.html',
            scope:{
                sponsors : '='
            }
        };
    });

