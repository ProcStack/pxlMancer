var whiteList=['pxlV7'];
this.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(whiteList[0]).then(function(cache){
			return cache.addAll([
				'index.php',
				'trans.png',
				'pxlLogo.png',
				'pxlQR.png',
				'pixelmancer.css',
				'jquery-1.11.0.min.js',
				'loaders/duelSpin.7.png',
				'js/brushTools.js',
				'js/canvasEffects.js',
				'js/colorSphere.js',
				'js/dialogues.js',
				'js/drawTouch.js',
				'js/imby.js',
				'js/interface.js',
				'js/loader.js',
				'js/math.js',
				'js/menu.js',
				'js/prePostTouch.js',
				'js/variables.js',
				'js/howTo.js',
				'js/selectTool.js',
				'js/boot.js'
			]);
		})
	);
});
this.addEventListener('fetch', function(e){
	/*if(e.request.headers.get('Accept').indexOf('text/html') !== -1){
		e.respondWith(
			fetch(e.request).then(function(responce){
				return caches.open(whiteList[0]).then(function(cache){
					cache.put(e.request, responce.clone());
					return responce;
				});
			}).catch(function() {
				caches.match(e.request).then(function(resp){
					return resp;
				})
			})
		);
		return;
	}*/
	e.respondWith(
		caches.match(e.request).then(function(resp){
			return resp || fetch(e.request).then(function(responce){
				return caches.open(whiteList[0]).then(function(cache){
					cache.put(e.request, responce.clone());
					return responce;
				});
			});
		})
	);
});
this.addEventListener('activate', function(e){
	e.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if(whiteList.indexOf(key) === -1){
					return caches.delete(key);
				}
			}));
		})
	);
});
