'use strict';

var core = angular.module('core');

core.filter('galleryFilter',function() {
    return function (items, filter) {
        if(filter == 'ALL'){
            return items;
        }
        return items.filter(function(item){
            return item.filter === filter;
        });
    }
});

core.directive('gallery',function(){
    return{
        restrict : 'AE', //attribute element
        replace: true,
        templateUrl: '/modules/core/views/gallery.view.html',
        scope: {
            filters: '=',
            album: '='
        },

        controller: function($scope,$filter){
            $scope.selectedFilter = $scope.filters[0];


            $scope.selectFilter = function($selectedFilter){
                $scope.selectedFilter = $selectedFilter;
            }
        }
    };
});
