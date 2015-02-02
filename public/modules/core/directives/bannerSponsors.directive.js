'use strict';

var core = angular.module('core');

core.directive('bannerSponsors', function(){
    return  {
        restrict: 'E',
        replace: true,
        templateUrl: '/modules/core/views/sponsors.view.html',
        scope:{
            sponsors : '='
        }
    };
});

