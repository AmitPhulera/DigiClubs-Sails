angular.module('DigiClubs').directive('selectmember', function($compile) {
        
        return {
            link:function(scope, element, attrs) {
                
                element.bind("click", function() {
                    
                    scope.count++;
                    scope.disabled[scope.count]=0;
                    $('#add'+(scope.count-1)).hide();
                    $('#cross'+(scope.count-1)).show();

                    var elem = '<div class="input-field col s12" id="entry' + scope.count + '"> <input ng-disabled="disabled[' + scope.count + ']" id="member" type="text" class="col s10" ng-model="groupDetailsC.newMember[' + scope.count + ']" ng-keyup="(groupDetailsC.newMember[' + scope.count + '].trim().length >= 2) && groupDetailsC.listPeople(groupDetailsC.newMember[' + scope.count + '])"><label for="member">Name/Email</label><div class="col s2" id="add' + scope.count + '"><a style="cursor: pointer" selectmember ng-click="assignMember(list.id,list.name,' + scope.count + ')"><i class="material-icons small" style="margin-top:1.2rem">add</i></a></div> <div class="col s2" id="cross' + scope.count + '" style="display: none"><a style="cursor: pointer" ng-click=groupDetailsC.removeFromMemberList(' + scope.count + '); ><i class="material-icons small red-text" style="margin-top:1.2rem">close</i></a></div></div>';
                    
                    angular.element(document.getElementById('newMembers')).append($compile(elem)(scope));
                });
            }
        }
    });