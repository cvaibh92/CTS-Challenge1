
	
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
	var db, images;
	total=0;
	var img = [];	 
    var app = angular.module("Code", ["angularUtils.directives.dirPagination"]);
	var items = [];
	function check(callback){
		
		var trans = db.transaction("websites_new7");
		 var objectStore = trans.objectStore("websites_new7");
				//console.log("hello1");
				 trans.oncomplete = function(event) {  
        callback(items);
    };
				 objectStore.openCursor().onerror = function(error) {
        console.log(error);
    };
				objectStore.openCursor().onsuccess = function(event) {
				   var cursor = event.target.result;
				   if (cursor) {
					  items.push(cursor.value);
						for(var x in images)
						{	//console.log(images[x].language);
							if(cursor.value.language == images[x].language)
							{
								img.push(images[x].icon);
							}
							
						}
						total++;
						
					  cursor.continue();
				   }
				   
				   else {
					  //alert("No more entries!");
				   }
				};
         }
																																						
	app.controller("CodeController", function($scope, $http) {
	//console.log($scope);
	$http({
			method : 'GET',
			url : 'https://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_compiler_image'
			}).then(function successCallback(response) {
			images = response.data;
				}, function errorCallback(response) {
			console.log(response.statusText);
		});
			
	$http({
			method : 'GET',
			url : 'https://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1'
			}).then(function successCallback(response) {
			const web = response.data.websites;
			//console.log(web);
			
			
         var request = window.indexedDB.open("newDatabase", 23);
         
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
			
            console.log("success: "+ db);	
			//console.log($scope);
			check(function (items) {
				$scope.$apply(function(){
					$scope.values=items;
					$scope.imgvalues=img;
					$scope.tot = total;
				});
				//console.log(total);
				
			});
			var la = top_five_languages();
			$scope.topfive=la;
			var two = top_two();
			$scope.toptwo = two;
			var perlevel = sub_perlevel();
			$scope.code_level = perlevel;
			
			
         };
		 
		 request.onupgradeneeded = function(event) {
		 console.log("kak");
            var db = event.target.result;
            var objectStore = db.createObjectStore("websites_new7", {keyPath: "id"});
            console.log(web + "sa");
            for (var i in web) {
               objectStore.add(web[i]);
			   //console.log(i);
            }
         }
			
			
			}, function errorCallback(response) {
			console.log(response.statusText);
		});
		
		
		$scope.includeFilter = function(filter) {
		var newitems = [];
	
		if($scope.lol && $scope.lol1 && $scope.lol2)
		{
		$scope.values=items;
		
		}
		else if(!($scope.lol) && !($scope.lol1) && !($scope.lol2))
		{
		$scope.values=items;
		
		}
		else if($scope.lol)
		{	
			if($scope.lol1 && !($scope.lol2))
			{
				for(item in items)
				{	
			
					if(items[item].compiler_status == "Accepted" || items[item].compiler_status.includes("Wrong"))
					newitems.push(items[item]);
				}
			}
			else if(!($scope.lol1) && $scope.lol2)
			{
				for(item in items)
				{	
			
					if(items[item].compiler_status == "Accepted" || items[item].compiler_status.includes("Time limit") )
					newitems.push(items[item]);
				}
			}
			else
			{
				for(item in items)
				{	
					if(items[item].compiler_status == "Accepted" )
					newitems.push(items[item]);
				}
				
			}
			$scope.values=newitems;
		}
		else if($scope.lol1)
		{	
			if($scope.lol && !($scope.lol2))
			{
				for(item in items)
				{	
			
					if(items[item].compiler_status == "Accepted" || items[item].compiler_status.includes("Wrong"))
					newitems.push(items[item]);
				}
			}
			else if(!($scope.lol) && $scope.lol2)
			{
				for(item in items)
				{	
			
					if(items[item].compiler_status.includes("Wrong") || items[item].compiler_status.includes("Time limit") )
					newitems.push(items[item]);
				}
			}
			else
			{
				for(item in items)
				{	
					if(items[item].compiler_status.includes("Wrong"))
					newitems.push(items[item]);
				}
				
			}
			$scope.values=newitems;
		
		}
		else if($scope.lol2)
		{	
			if($scope.lol && !($scope.lol1))
			{
				for(item in items)
				{	
			
					if(items[item].compiler_status == "Accepted" || items[item].compiler_status.includes("Time limit"))
					newitems.push(items[item]);
				}
			}
			else if(!($scope.lol) && $scope.lol1)
			{
				for(item in items)
				{	
			
					if(items[item].compiler_status.includes("Wrong") || items[item].compiler_status.includes("Time limit") )
					newitems.push(items[item]);
				}
			}
			else
			{
				for(item in items)
				{	
					if(items[item].compiler_status.includes("Time limit"))
					newitems.push(items[item]);
				}
				
			}
			$scope.values=newitems;
			
		}
		
    }
	
	$scope.statusFilter = function() {
        
        return $scope.values;
    }
		//
				
		
	});

			function top_five_languages()
			{
				var lang = [];
				var trans = db.transaction("websites_new7");
				var objectStore = trans.objectStore("websites_new7");
				 objectStore.openCursor().onerror = function(error) {
					console.log(error);
				};
				objectStore.openCursor().onsuccess = function(event) {
				   var cursor = event.target.result;
				   if (cursor) {
				   var count =0;
						for(var x in lang)
						{
							if(cursor.value.language == lang[x].language)
							{
								var m = lang[x].times +1;
								lang[x].times = m;
								count =1;
								break;
							}
							
						}
						if(count == 0)
						{	
							lang.push({language:cursor.value.language,times:1});
						}
					
					
					  cursor.continue();
				   }
				   
				   
				};
				return lang;
			}

			function top_two()
			{
				var ques = [];
				var trans = db.transaction("websites_new7");
				var objectStore = trans.objectStore("websites_new7");
				 objectStore.openCursor().onerror = function(error) {
					console.log(error);
				};
				objectStore.openCursor().onsuccess = function(event) {
				   var cursor = event.target.result;
				   if (cursor) {
				   var count =0;
				   
						for(var x in ques)
						{
							if(cursor.value.title == ques[x].title)
							{
								var m = ques[x].occ +1;
								ques[x].occ = m;
								count =1;
								break;
							}
							
						}
						if(count == 0)
						{	
							ques.push({title:cursor.value.title,occ:1});
						}
					
					
					  cursor.continue();
				   }
				   
				   
				};
				return ques;
			}
			function sub_perlevel(){
				var level = [];
				level.push({lev:"Easy",occ:0});
				level.push({lev:"Medium",occ:0});
				level.push({lev:"Hard",occ:0});
				var trans = db.transaction("websites_new7");
				var objectStore = trans.objectStore("websites_new7");
				 objectStore.openCursor().onerror = function(error) {
					console.log(error);
				};
				objectStore.openCursor().onsuccess = function(event) {
				   var cursor = event.target.result;
				   if (cursor) {
				   //var count =0;
				   
						for(var x in level)
						{
							if(cursor.value.metadata.level == level[x].lev)
							{
								var m = level[x].occ +1;
								level[x].occ = m;
								//count =1;
								break;
							}
							
						}
					
					  cursor.continue();
				   }
				   
				   
				};
				return level;
			
			}
	
	
	
	
	
	
