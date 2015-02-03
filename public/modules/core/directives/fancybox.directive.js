'use strict';

angular.module('core').
    directive('fancyboxer', function(){
        return  {
            restrict: 'A',
            scope:{
                fancyboxerImages : '='
            },
            link: function($scope,element) {
                var openFancyBox = function () {
                    $.fancybox.open($scope.fancyboxerImages.slice(),{
                        prevEffect: 'none',
                        nextEffect: 'none',

                        closeBtn: true,
                        arrows: true,
                        nextClick: true,

                        helpers: {
                            thumbs: {
                                width: 50,
                                height: 50
                            }
                        }
                    });
                };
                $scope.openFancyBox = openFancyBox;
                var refs = $(element).find('a');
                refs.bind('click', openFancyBox);
                $(element).bind('click', openFancyBox);
            }
        };
    });

