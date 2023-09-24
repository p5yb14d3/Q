/*********************************
* author: p5yb14d3
*********************************/

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild( renderer.domElement );
document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.overflow = "hidden";

var TAU = Math.PI * 2;

function Q(selector) {
	if (selector == "") {
		return Q3.scenes;
	}
	else if (Q3.indexer.hasOwnProperty(selector)) {
		if (Object.keys(Q3.indexer[selector]).length == 1) {
			// alert("1111 selector:"+selector+" returning:"+Q3.indexer[selector][0]);
			return Q3.indexer[selector][0];
		}
		else {
			// alert("2222 selector:"+selector+" returning:"+Q3.indexer[selector]);
			return Q3.indexer[selector][Object.keys(Q3.indexer[selector]).length];
		}
	}
}

var Q3 = new classQ3();

function classQ3() {

	this.indexer = {};
	this.scenes = new classScenes();
	this.clock = new THREE.Clock();
	
	this.plus = function(x) {
		alert(x);
	}
	
	this.minus = function(x) {
		alert(x);
	}

	function classScenes() {
		this.collection = {};
		this.add = function(scene_name) {
			var scene = new classScene(scene_name);
			insertValue(Q3.indexer, scene_name, scene);
			insertValue(this.collection, scene_name, scene);
			return scene;
		};
	}

	function classScene(scene_name) {
		this.THREEscene = new THREE.Scene();
		this.name = scene_name;
		this.objects = new classObjects(this);
		this.THREEbackground;
		this.THREEcamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
		this.THREEcontrols;
		
		// SET DEFAULT
		this.THREEcamera.position.z = 4;
		
		// this.THREEcamera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
		// this.THREEcamera.position.z = 10;
		// this.renderer = new THREE.WebGLRenderer();
		// this.renderer.setSize(window.innerWidth, window.innerHeight);
		
		this.camera = function(key, value) {
			switch(key.toLowerCase()) {
				case "perspective": 
					if (value.length == 0) value = [1, window.innerWidth / window.innerHeight, 0.5, 10000]
					this.THREEcamera = new THREE.PerspectiveCamera(value[0],value[1], value[2], value[3]);
					// this.THREEcamera.position.set( 1000, 50, 1500 ); // FOR WORLD VIEW
					this.THREEcamera.position.z = 15;
					break;
				default:
					return this.camera;
			}
		}
		
		this.background = function(key, value) {
			switch(key.toLowerCase()) {
				case "image": 
					this.THREEbackground =  new THREE.TextureLoader().load(value);
					break;
				case "color":
					this.THREEbackground = new THREE.Color(value);
					break;
				default:
					return this.background;
			}
			this.THREEscene.background = this.THREEbackground;
		}
		
		this.fog = function(param) {
			if (param.constructor === Array) {
				if (param.length == 0) param =  [0xcce0ff, 500, 10000]
				this.THREEscene.fog = new THREE.Fog(param[0], param[1], param[2]);
			}
			else if (typeof param !== "undefined") {
				this.THREEscene.fog = new THREE.Fog(param);
			}
			else {
				return this.fog;
			}
		}
		
		
		// var loader = new THREE.TextureLoader();
		// bgTexture = loader.load("testtexture/stars.jpg",
			// function ( texture ) {
				// var img = texture.image;
				// bgWidth= img.width;
				// bgHeight = img.height;
				// resize();
			// } );
		// this.THREEscene.background = bgTexture;
		// bgTexture.wrapS = THREE.MirroredRepeatWrapping;
		// bgTexture.wrapT = THREE.MirroredRepeatWrapping;
		
		var light, materials;

		// this.THREEscene.add( new THREE.AmbientLight( 0x666666 ) );

		// light = new THREE.DirectionalLight( 0xdfebff, 1 );
		// light.position.set( 50, 200, 100 );
		// light.position.multiplyScalar( 1.3 );

		// light.castShadow = true;

		// light.shadow.mapSize.width = 1024;
		// light.shadow.mapSize.height = 1024;

		// var d = 300;

		// light.shadow.camera.left = - d;
		// light.shadow.camera.right = d;
		// light.shadow.camera.top = d;
		// light.shadow.camera.bottom = - d;

		// light.shadow.camera.far = 1000;

		// this.THREEscene.add( light );

		
		this.controls = function(key) {
			switch(key.toLowerCase()) {
				case "trackball": 
					this.THREEcontrols = new THREE.TrackballControls(this.THREEcamera);
					break;
				case "fly":
					this.THREEcontrols = new THREE.FlyControls(this.THREEcamera);
					this.THREEcontrols.movementSpeed = 1000;
					this.THREEcontrols.domElement = renderer.domElement;
					this.THREEcontrols.rollSpeed = 0.5;
					this.THREEcontrols.autoForward = false;
					this.THREEcontrols.dragToLook = false;
					break;
				case "orbit":
					this.THREEcontrols = new THREE.OrbitControls( this.THREEcamera, renderer.domElement );
					this.THREEcontrols.maxPolarAngle = Math.PI * 0.5;
					this.THREEcontrols.minDistance = 1000;
					this.THREEcontrols.maxDistance = 5000;
					break;
			}
		}
		
		// var loader = new THREE.TextureLoader();
		// var groundTexture = loader.load( 'textures/terrain/grasslight-big.jpg' );
		// groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		// groundTexture.repeat.set( 25, 25 );
		// groundTexture.anisotropy = 16;

		// var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

		// var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
		// mesh.position.y = - 250;
		// mesh.rotation.x = - Math.PI / 2;
		// mesh.receiveShadow = true;
		// this.THREEscene.add( mesh );
		
		this.add = new classAdd(this);
		
		// this.lights = new classLight(this, "ambient");
		this.lights = new classLights(this);
		
		this.render = function() {
			renderer.render(this.THREEscene, this.THREEcamera);
		}
	}

	function classAdd(scene) {
		this.scene = scene;
		this.object = function(value, param) {
			var cObject = new classObject(this.scene);
			var object = cObject.geometry(value, param);
			console.log("!!!!!!!!", this.scene);
			this.scene.THREEscene.add(object.THREEmesh);
			
			insertValue(Q3.indexer, value, object);
			insertValue(this.scene.objects.collection, value, object);
			return object;
		}
		this.light = function(object_name) {
			var object = new classLight(object_name);
			this.scene.THREEscene.add(object.light);
			insertValue(Q3.indexer, object_name, object);
			insertValue(this.scene.lights.collection, object_name, object);
			return object;
		}
	}

	function classSet(Qobject) {
		this.Qobject = Qobject;
		this.material = function(material_name) {
			var QMaterial = new classMaterial(material_name);
			this.Qobject.mesh.material = QMaterial.material;
		}
	}

	function classObjects(scene) {
		this.scene = scene;
		this.collection = {};
		this.add = function(type, value) {
			var cObject = new classObject(scene);
			var object = cObject.geometry(value);
			insertValue(Q3.indexer, value, object);
			insertValue(this.collection, value, object);
			return object;
		};
	}

	function classObject(scene) {
		this.scene = scene;
		this.THREEgeometry;
		this.THREEmaterial;
		this.THREEtexture;
		this.THREEmesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial(this.material_settings));
		this.THREEposition = this.THREEmesh.position;
		this.name = "";
		this.light;
		this.set = new classSet(this);
		this.material_settings = {};
		this.texture_settings = {};
		
		this.mesh = function() {
			return this.THREEmesh;
		}
		
		this.position = function(param1, param2) {
			// var position = new classPosition(this.THREEmesh);
			
			if (param1.constructor === Array) {
				this.THREEmesh.position.set(param1[0], param1[1], param1[2]);
			}
			else {
				switch (param1.toLowerCase()) {
					case "x":
						this.THREEmesh.position.x = param2;
						break;
					case "y":
						this.THREEmesh.position.y = param2;
						break;
					case "z":
						this.THREEmesh.position.z = param2;
						break;
				}
			}
			return this.THREEmesh.position;
		}

		this.degOrRad = function(value, unit) {
			if (typeof unit === "undefined") {
				if (value < 7) {
					return value;
				}
				else {
					return THREE.Math.degToRad(value);
				}
			}
			else if (unit == "rad") {
				return value;
			}
			else {
				return THREE.Math.degToRad(value);
			}
		}
		
		this.rotate = function(param1, param2, param3) {
			
			if (param1.constructor === Array) {
				param1[0] = this.degOrRad(param1[0], param2);
				param1[1] = this.degOrRad(param1[1], param2);
				param1[2] = this.degOrRad(param1[2], param2);
				this.THREEmesh.rotation.x = param1[0];
				this.THREEmesh.rotation.y = param1[1];
				this.THREEmesh.rotation.z = param1[2];
			}
			else {
				param2 = this.degOrRad(param2, param3);
				switch(param1.toLowerCase()) {
					case "x":
						this.THREEmesh.rotation.x = param2;
						break;
					case "y":
						this.THREEmesh.rotation.y = param2;
						break;
					case "z":
						this.THREEmesh.rotation.z = param2;
						break;
				}
			}
		}
		
		this.rotateAround = function(parent) {
			// pivots
			var pivot = new THREE.Object3D();
			parent.THREEmesh.add(pivot);
			pivot.add(this.THREEmesh);
		}
		
		this.texture = function(key, value) {
			switch(key.toLowerCase()) {
				case "image": 
					this.THREEtexture =  new THREE.TextureLoader().load(value);					
					break;
				case "repeat":
					this.THREEtexture.wrapS = this.THREEtexture.wrapT = THREE.RepeatWrapping;
					this.THREEtexture.repeat.set(value[0],value[1]);
					// texture.repeat.set(value[0],value[1]);
					break;
				default:
					this.THREEtexture[key] = value;
			}
			this.material_settings["map"] = this.THREEtexture;
			this.THREEmaterial = new THREE.MeshLambertMaterial(this.material_settings);
			this.THREEmesh.material  = this.THREEmaterial;
		}
		
		this.is = function (value) {
			switch(value.toLowerCase()) {
				case "grass":
					this.texture("image", "textures/terrain/grasslight-big.jpg");
					this.texture("repeat", [25,25]);
					break;
				case "checkered":
					this.texture("image", "textures/floors/FloorsCheckerboard_S_Diffuse.jpg");
					this.texture("repeat", [6,6]);
					break;
				case "dirt":
					this.texture("image", "textures/terrain/backgrounddetailed6.jpg");
					this.texture("repeat", [60,60]);
					break;
			}
		}
		
		this.color = function(value) {
			this.material("color", value);
		}
		
		this.wireframe = function(value) {
			this.material("wireframe", value);
		}

		this.material = function(type, value, param) { // ACCEPTS ("map", "src") OR ({"map":"src", "...","..."})
			if (typeof param === "undefined") {
				type = type.toLowerCase();
				if (type != "type") this.material_settings[type] = value;
			}
			else if (param.constructor == Object) {
				this.material_settings = param;
			}
			
			switch(type) {
				case "type":
					switch(value.toLowerCase()) {
						case "phong":
							// alert("phong");
							this.THREEmesh.material = this.THREEmaterial = new THREE.MeshPhongMaterial(this.material_settings); 
							break;
						case "lambert":
							this.THREEmesh.material = this.THREEmaterial = new THREE.MeshLambertMaterial(this.material_settings); 
							break;
						case "basic":
							this.THREEmesh.material = this.THREEmaterial = new THREE.MeshBasicMaterial(this.material_settings); 
							break;
						case "normal":
							this.THREEmesh.material = this.THREEmaterial = new THREE.MeshNormalMaterial(this.material_settings); 
							break;
						default:
							this.THREEmesh.material = this.THREEmaterial = new THREE.MeshPhongMaterial(this.material_settings); 
					}
					break;
				case "color":
					if (value == "random") value = Math.random() * 0xffffff;
					this.THREEmesh.material.color = new THREE.Color(value);
					break
				case "emmisive":
					this.THREEmesh.material.emmisive = new THREE.Color(value);
					break
				case "alphaMap":
					this.THREEmesh.material.alphaMap = QImage(value);
					break;
				case "aoMap":
					this.THREEmesh.material.aoMap = QImage(value);
					break;
				case "bumpMap":
					this.THREEmesh.material.bumpMap = QImage(value);
					break;
				case "displacementMap":
					this.THREEmesh.material.displacementMap = QImage(value);
					break;
				case "emissiveMap":
					this.THREEmesh.material.emmisiveMap = QImage(value);
					break;
				case "map":
					var texture = new THREE.TextureLoader().load(value);
					this.THREEmesh.material.map = texture;
					break;
				case "normalMap":
					this.THREEmesh.material.normalMap = QImage(value);
					break;
				case "normalScale":
					this.THREEmesh.material.normalScale = QImage(value);
					break;
				case "side":
					switch(value.toLowerCase()) {
						case "front":
							this.THREEmesh.material.side = THREE.FrontSide;
							break;
						case "back":
							this.THREEmesh.material.side = THREE.BackSide;
							break;
						case "double":
							this.THREEmesh.material.side = THREE.DoubleSide;
							break;
					}
				default:
					this.THREEmesh.material[type] = value;
			}
			return this;
		};
		
		this.geometry = function(value, param=[]) {
			this.scene.THREEscene.remove(this.THREEmesh);
			this.THREEmesh = undefined;
			switch (value.toLowerCase()) {
				case "box":
					this.THREEgeometry = new THREE.BoxGeometry(param[0], param[1], param[2], param[3], param[4], param[5]);
					break;
				case "circle":
					this.THREEgeometry = new THREE.CircleGeometry(param[0], param[1], param[2], param[3]);
					break;
				case "cone":
					this.THREEgeometry = new THREE.ConeGeometry(param[0], param[1], param[2], param[3], param[4], param[5], param[6]);
					break;
				case "cylinder":
					this.THREEgeometry = new THREE.CylinderGeometry(param[0], param[1], param[2], param[3], param[4], param[5], param[6], param[7]);
					break;
				case "dodecahedron":
					this.THREEgeometry = new THREE.DodecahedronGeometry(param[0], param[1]);
					break;
				case "edges":
					this.THREEgeometry = new THREE.EdgesGeometry(param[0], param[1]);
					break;
				case "extrude":
					this.THREEgeometry = new THREE.ExtrudeGeometry(param[0], param[1]);
					break;
				case "icosahedron":
					this.THREEgeometry = new THREE.IcosahedronGeometry(param[0], param[1]);
					break;
				case "lathe":
					this.THREEgeometry = new THREE.LatheGeometry(param[0], param[1], param[2], param[3]);
					break;
				case "octahedron":
					this.THREEgeometry = new THREE.OctahedronGeometry(param[0], param[1]);
					break;
				case "parametric":
					this.THREEgeometry = new THREE.ParametricGeometry(param[0], param[1], param[2]);
					break;
				case "plane":
					this.THREEgeometry = new THREE.PlaneGeometry(param[0], param[1], param[2], param[3]);
					break;
				case "polyhedron":
					this.THREEgeometry = new THREE.PolyhedronGeometry(param[0], param[1], param[2], param[3]);
					break;
				case "ring":
					this.THREEgeometry = new THREE.RingGeometry(param[0], param[1], param[2], param[3], param[4], param[5]);
					break;
				case "shape":
					this.THREEgeometry = new THREE.ShapeGeometry(param[0], param[1]);
					break;
				case "sphere":
					this.THREEgeometry = new THREE.SphereGeometry(param[0], param[1], param[2], param[3], param[4], param[5], param[6]);
					break;
				case "tetrahedron":
					this.THREEgeometry = new THREE.TetrahedronGeometry(param[0], param[1]);
					break;
				case "text":
					this.THREEgeometry = new THREE.TextGeometry(param[0], param[1]);
					break;
				case "torus":
					this.THREEgeometry = new THREE.TorusGeometry(param[0], param[1], param[2], param[3], param[4]);
					break;
				case "torusknot":
					this.THREEgeometry = new THREE.TorusKnotGeometry(param[0], param[1], param[2], param[3], param[4]);
					break;
				case "tube":
					this.THREEgeometry = new THREE.TubeGeometry(param[0], param[1], param[2], param[3], param[4]);
					break;
				case "wireframe":
					this.THREEgeometry = new THREE.WireframeGeometry(param[0]);
					break;
				case "pyramid":
					if (param.length == 0) param = [0, 1, 1, 4, 1];
					this.THREEgeometry = new THREE.CylinderBufferGeometry(param[0], param[1], param[2], param[3], param[4]);
					break;
				case "ground": // param: radius, height, segments
					if (param.length == 0) param = [20000];
					// this.THREEgeometry = new THREE.CylinderGeometry(param[0], param[0], param[1], param[2]);
					this.THREEgeometry = new THREE.PlaneBufferGeometry(param[0], param[0]);
					
					var loader = new THREE.TextureLoader();
					var groundTexture = loader.load( '' ); // textures/floors/FloorsCheckerboard_S_Diffuse.jpg
					groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
					groundTexture.repeat.set( 6, 6 );
					groundTexture.anisotropy = 16;

					var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
					this.THREEmaterial = groundMaterial;
					
					// if (typeof this.THREEmaterial === "undefined") this.THREEmaterial = new THREE.MeshLambertMaterial(this.material_settings);
					this.THREEmesh = new THREE.Mesh(this.THREEgeometry, this.THREEmaterial);
					// var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
					this.THREEmesh.position.y = - 250;
					this.THREEmesh.rotation.x = - TAU/4;
					this.THREEmesh.receiveShadow = true;
					break;
				case "floor": // param: width, length, widthSegments, heightSegments
					if (param.length == 0) param = [20, 20, 10, 10];
					this.THREEgeometry = new THREE.PlaneGeometry(param[0], param[1], param[2], param[3]);
					// this.wireframe(true);
					if (typeof this.THREEmaterial === "undefined") this.THREEmaterial = new THREE.MeshPhongMaterial(this.material_settings);
					this.THREEmesh = new THREE.Mesh(this.THREEgeometry, this.THREEmaterial);
					// this.rotate("x", -90, "deg");

					this.THREEmesh.position.y = - 250;
					this.THREEmesh.rotation.x = - TAU/4;
					this.THREEmesh.receiveShadow = true;

					
					break;
				default:
					if (param.length == 0) param = { radius:1, widthSegments:50, heightSegements:50 };
						this.THREEgeometry = new THREE.SphereGeometry(param);
			}
			
			if (typeof this.THREEmesh === "undefined") {
				if (typeof this.THREEmaterial === "undefined") {
					this.THREEmaterial = new THREE.MeshPhongMaterial(this.material_settings);
				}
				this.THREEmesh = new THREE.Mesh(this.THREEgeometry, this.THREEmaterial);
			}
			this.scene.THREEscene.add(this.THREEmesh);

			// this.THREEscene.add(this.THREEmesh);
			return this;
		};	
	}

	function QImage(value) {
		return THREE.ImageUtils.loadTexture(value);
	}


	function classLights(Qscene) {
		this.collection = {};
		
		this.add = function(object_name) {
			var object = new classLight(object_name);
			Qscene.scene.add(object.light);
			insertValue(this.collection, object_name, object);
		};
		

	}

	function classLight(object_name, param1, param2) {
		this.name = object_name;
		this.light;
		
		if (object_name == "ambient") {
			this.light = new THREE.AmbientLight(param1, param2); 
		}
		else if (object_name == "directional") {
			this.light = new THREE.DirectionalLight(param1, param2);
		}
		else if (object_name == "point") {
			this.light = new THREE.PointLight(param1, param2);
		}
		
		this.color = function(colorName) {
			this.light.color = new THREE.Color(colorName);
		};
		this.intensity = function(value) {
			this.light.intensity = value;
		};
		
		this.position = function(param1, param2) {
			// var position = new classPosition(this.THREEmesh);
			
			if (param1.constructor === Array) {
				this.light.position.set(param1[0], param1[1], param1[2]);
			}
			else {
				switch (param1.toLowerCase()) {
					case "x":
						this.light.position.x = param2;
						break;
					case "y":
						this.light.position.y = param2;
						break;
					case "z":
						this.light.position.z = param2;
						break;
				}
			}
			return this.light.position;
		}
	}
		
	function insertValue(object, key, value) {
		if (object.hasOwnProperty(key)) {
			object_array = object[key]; // RETRIEVE ARRAY FROM OBJECT
			console.log("1111...inserting into "+object.name+"['"+key+"']["+object_array.length+"] = "+value);
			object_array[object_array.length] = value;
			object[key] = object_array;
		}
		else {
			var object_array = []; // MAKE SURE IT IS A CLEAN ARRAY
			console.log("2222...inserting into dict['"+key+"']["+object_array.length+"] = "+value);
			object_array[object_array.length] = value; // USED THE ARRAY THAT IS PASSED IN
			object[key] = object_array;
		}

	}

} // end classQ3

function QFrame() {
	// blank placeholder. user can overide this with their own.
}

function Qloop() {
	requestAnimationFrame(Qloop);
	QFrame();
}

function onWindowResize() {
	// camera.aspect = window.innerWidth / window.innerHeight;
	// camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function setListeners() {
	// WINDOW ON RESIZE
	window.addEventListener( 'resize', onWindowResize, false );
}
