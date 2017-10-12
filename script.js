var searchButton 		= document.getElementById('searchButton'),
 	searchBar 			= document.getElementById('searchBar'),
 	topBar 				= document.getElementById('topBar'),
 	form 				= document.getElementById('form')
 	resultsContainer	= document.getElementById('resultsContainer');


function getResults(searchText){
	$.ajax({
		url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchText+"&limit=11&namespace=0&format=json",
		jsonp: "callback",
		dataType: "jsonp",
		})
			.done(function(response) {
				var titlesArray = response[1].slice(1);
				var descripArray = response[2].slice(1);
				var linkArray = response[3].slice(1);
				resultsContainer.innerHTML = ""
				titlesArray.forEach(function(e, i) {
					resultsContainer
						.appendChild(document.createElement('div'))
							.setAttribute('id', i)
				var idiv = document.getElementById(i);
				idiv.innerHTML = '<h3>'+e+'</h3><br><p>'+descripArray[i]+'</p>';
				idiv.addEventListener('click', function(){window.open(linkArray[i], '_blank' )})
				})
			})
}


function activate(){
	if (searchBar.value){
		topBar.setAttribute('style', 'height:0px');
		getResults(searchBar.value);
	};
}

searchButton.addEventListener('click', activate);
