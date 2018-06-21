function removeActionItem(reviewId){
	angular.element(document.getElementById("actionItemCtrlID")).scope().actionItem.removeActionItem(reviewId);
}

(function(){
	
	function ActionItemsCtrl($http){
		var self = this;
		
		self.actionItems = [];
		
		self.message = false;
		self.messageText = '';
		
		self.removeActionItem = function(reviewId) {
			$http.post("removeActionItem",{"reviewId":reviewId}).then(function(response){
				self.message = true;
				self.messageText = response.data.success==true?"Action Item removed successfully":"Action does not exits.It may be already removed or being removed. Please try after sometime.";
				self.actionItems = [];
				self.init();
			});
		}
		
		self.downloadPDF = function(){ alert('download PDF');}
		self.shareActionItems = function(){ alert('share action Item');}
		
		self.init = function(){
			$http.get("getActionItems").then(function(response){
				
				angular.forEach(response.data.data,function(data){
					self.actionItems.push(data);
				});
				
				if(self.actionItems.length==0){
					self.message = true;
					self.messageText = "TIPS: You don't have any action items. You can add your cusomer review/opinion from Manage Reviews tab. It will help you to improvise your business.";
					
				}
				
			});
		}
	}
	angular.module('pixeladmin')
    .controller('ActionItemsCtrl',['$http', ActionItemsCtrl]);
})();