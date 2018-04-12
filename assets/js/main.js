Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

//ALTO Y ANCHO DE LA VENTANA
var width = window.innerWidth;
var height = window.innerHeight;
var water, isla, cajas = [], vacio = true;
var adelante = THREE.Vector3(0,2,0);

let renderer = new THREE.WebGLRenderer({antialias:true,alpha: true,transparent : true});
let container = document.getElementById('canvas');
let w = container.offsetWidth;
let h = container.offsetHeight;
renderer.setSize(w, h);
container.appendChild(renderer.domElement);


var scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3( 0, -30, 0));

//SKYBOX (APRENDER A PONERLE TEXTURA)
let texture = new THREE.TextureLoader().load( 'assets/tex/cielo.jpg' );
let skyboxGeometry = new THREE.SphereGeometry( 150, 32, 32 );
let skyboxMaterial = new THREE.MeshLambertMaterial({ map: texture, side: THREE.BackSide });
let skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

//piso
var piso_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0xe7c496, transparent:true, opacity:0.7, wireframe:false }),.2,.3);
var piso = new Physijs.BoxMesh(new THREE.CubeGeometry(200, 0.1, 200), piso_material, 0 );
piso.position.y += 0.5;
piso.__dirtyPosition = true;

scene.add( piso );

//ISLA
var g = new THREE.CylinderGeometry( 10, 12, 1.5, 64, 8 );
var m = Physijs.createMaterial(
	new THREE.MeshLambertMaterial({ color: 0xe7c496, transparent:true, opacity:1, wireframe:false }),.5,.1);
isla = new Physijs.CylinderMesh(g,m, 0);
isla.position.y += 1;
isla.__dirtyPosition = true;
scene.add(isla);

//grua
var geoGrua = new THREE.BoxGeometry( 1, 2, 1 );
var gruaMat = Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0x888888, transparent:true, opacity:1, wireframe:true }),.3,.1);
grua = new Physijs.BoxMesh(geoGrua,gruaMat, 100);
scene.add(grua);
grua.position.y += 5;
grua.__dirtyPosition = true;

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
//POSICION Y A DONDE VE
camera.position.y = 20;
camera.position.z = 40;

//AGREGAR LA CAMARA
scene.add(camera);

var ambient = new THREE.AmbientLight(0xFFFFFF, 1.0);
scene.add(ambient);

control = new THREE.OrbitControls(camera, renderer.domElement);

//HACEMOS LA BASE
var baseGe = new THREE.CubeGeometry(2, 0.5, 2);
var baseMa = new THREE.MeshPhongMaterial({ color: 0x3a3838 }); //COLOR
var base = new THREE.Mesh(baseGe, baseMa); //MESH CUBO CON SU MATERIAL
base.position.y -=0.9;
base.scale.set(0.5,0.5,0.5)
grua.add(base);

var gGeo = new THREE.CylinderGeometry( 0.7, 0.6, 0.2, 32, 8 );
var gMat = new THREE.MeshPhongMaterial( {color: 0x000000} );
var g = new THREE.Mesh( gGeo, gMat );
g.position.y += 0.26;
base.add( g );

var p1Geo = new THREE.CylinderGeometry( 0.35, 0.6, 4, 32, 8, true );
var p1Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var p1 = new THREE.Mesh( p1Geo, p1Mat );
p1.position.y += 2;
base.add( p1 );

var p2Geo = new THREE.CylinderGeometry( 0.34, 0.34, 6, 32, 8 );
var p2Mat = new THREE.MeshPhongMaterial( {color: 0x3a3838} );
var p2 = new THREE.Mesh( p2Geo, p2Mat );
p2.position.y += 3;
p1.add( p2 );

var c1Geo = new THREE.SphereGeometry( 0.5, 32, 32 );
var c1Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var c1 = new THREE.Mesh( c1Geo, c1Mat );
c1.position.y += 3;
p2.add( c1 );

var p3Geo = new THREE.CylinderGeometry( 0.25, 0.34, 4, 32, 8, true );
var p3Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var p3 = new THREE.Mesh( p3Geo, p3Mat );
p3.position.y += 2;
c1.add( p3 );

var p4Geo = new THREE.CylinderGeometry( 0.25, 0.25, 6, 32, 8 );
var p4Mat = new THREE.MeshPhongMaterial( {color: 0x3a3838} );
var p4 = new THREE.Mesh( p4Geo, p4Mat );
p4.position.y += 3;
p3.add( p4 )

var c2Geo = new THREE.SphereGeometry( 0.5, 32, 32 );
var c2Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var c2 = new THREE.Mesh( c2Geo, c2Mat );
c2.position.y += 3;
p4.add( c2 );

var p5Geo = new THREE.CylinderGeometry( 0.20, 0.20, 6, 32, 8 );
var p5Mat = new THREE.MeshPhongMaterial( {color: 0x3a3838} );
var p5 = new THREE.Mesh( p5Geo, p5Mat );
p5.rotation.z -= 1.57;
c2.add( p5 )

var c3Geo = new THREE.CylinderGeometry( 0.7, 0.6, 0.2, 32, 8 );
var c3Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var c3 = new THREE.Mesh( c3Geo, c3Mat );
c3.position.y -= 3;
p5.add( c3 );

c1.rotation.z += 1.57;

scene.add(grua)

//Anadiendo el Barco
var bg2 = new THREE.BoxGeometry( 1.6, 0.7, 7 );
var bm = Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0x888888, transparent:true, opacity:1, wireframe:true }),.5,.3);
barquito = new Physijs.BoxMesh(bg2,bm, 10);
scene.add(barquito);
barquito.position.y += 15;
barquito.position.z += 17;
barquito.__dirtyPosition = true;

let loader = new THREE.ObjectLoader();
loader.load(
	"assets/modelos/ship.json",
	function(object){
		object.scale.set(3.5,3.5,3.5);
		barco = object;
		barco.position.y += 0.5
		barquito.add(barco)
		console.log("Barco");
	}
);

//Anadir cajas iniciales a la escena
addCaja(3,2,7);
addCaja(3.7,2,7);
addCaja(4.4,2,7);
addCaja(5.1,2,7);
addCaja(5.8,2,7);

// let loader2 = new THREE.ObjectLoader();
// loader2.load(
// 	"assets/modelos/isla.json",
// 	function(object2){
// 		object2.traverse( ( child ) => {
// 			if ( child.isMesh ) {
// 				console.log("Hey, un mesh");
// 				var geo = child.geometry;
// 				console.log(geo.isGeometry);
// 				var mat = child.material;
// 				isla = new Physijs.ConvexMesh( geo, mat, 0 );
// 				isla.rotation.set(-3.14/2, 0, 0);
//     		isla.__dirtyRotation = true;
// 				scene.add(isla);
// 			}
// 		} );
// 		console.log("Isla");
// 	}
// );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
scene.add( directionalLight );

var light = new THREE.AmbientLight( 0x404040, 0.4 );
scene.add( light );

var waterGeometry = new THREE.PlaneBufferGeometry( 300, 300 );
water = new THREE.Water(
	waterGeometry,
	{
		textureWidth: 256,
		textureHeight: 256,
		waterNormals: new THREE.TextureLoader().load( 'assets/tex/waternormals.jpg', function ( texture ) {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		}),
		alpha: 0.6,
		sunDirection: light.position.clone().normalize(),
		sunColor: 0xffffff,
		waterColor: 0xc4e6ff,
		distortionScale:  3.7,
		fog: scene.fog !== undefined
	}
);
water.rotation.x = - Math.PI / 2;
water.position.y += 0.7;
scene.add( water );


//COntrolador de colisiones
grua.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
	if (other_object!=isla && vacio){
		other_object.scale.set(2,2,2);
		other_object.rotation.set(0,0,0);
		other_object.position.set(0,-0.7,0);
		c3.add(other_object);
		vacio = !vacio;
	}
});

// movement - please calibrate these values
let xSpeed = 1;
let ySpeed = 1;
let rotSpeed = 0.3;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    let keyCode = event.which;
		if (keyCode==87) {
			var rotation_matrix = new THREE.Matrix4();
			rotation_matrix.extractRotation(barquito.matrix);
			var force_vector = new THREE.Vector3(0, 0, -100);
			var final_force_vector = rotation_matrix.multiplyVector3(force_vector);
			barquito.applyCentralForce(final_force_vector);
		}else if (keyCode==83) {
			var rotation_matrix = new THREE.Matrix4();
			rotation_matrix.extractRotation(barquito.matrix);
			var force_vector = new THREE.Vector3(0, 0, 100);
			var final_force_vector = rotation_matrix.multiplyVector3(force_vector);
			barquito.applyCentralForce(final_force_vector);
		}else if (keyCode==68) {
			barquito.rotateY(-0.1);
    	barquito.__dirtyRotation = true;
		}else if (keyCode==65) {
			barquito.rotateY(0.1);
    	barquito.__dirtyRotation = true;
		}else if (keyCode == 101){
			var rotation_matrix = new THREE.Matrix4();
			rotation_matrix.extractRotation(grua.matrix);
			var force_vector = new THREE.Vector3(-1000, 0, 0);
			var final_force_vector = rotation_matrix.multiplyVector3(force_vector);
			grua.applyCentralForce(final_force_vector);
		}else if (keyCode == 98) {
			var rotation_matrix = new THREE.Matrix4();
			rotation_matrix.extractRotation(grua.matrix);
			var force_vector = new THREE.Vector3(1000, 0, 0);
			var final_force_vector = rotation_matrix.multiplyVector3(force_vector);
			grua.applyCentralForce(final_force_vector);
		}else if (keyCode == 97) {
			grua.rotateY(0.1);
			grua.__dirtyRotation = true;
		}else if (keyCode == 99) {
			grua.rotateY(-0.1);
			grua.__dirtyRotation = true;
		}else if (keyCode == 107) {
			p2.position.y += 0.2;
		}else if (keyCode == 109) {
			p2.position.y -= 0.2;
		}else if (keyCode == 110) {
			p4.position.y += 0.2;
		}else if (keyCode == 96) {
			p4.position.y -= 0.2;
		}else if (keyCode == 104) {
			p5.position.x += 0.2;
		}else if (keyCode == 105) {
			p5.position.x -= 0.2;
		}else if (keyCode == 71) {
			if (!vacio) {
				var posAct = c3.children[0].matrixWorld.getPosition().clone();
				c3.remove(c3.children[0]);
				addCaja(posAct.x, posAct.y, posAct.z);
				vacio = !vacio;
			}else {
				console.log("esta vacio");
			}
		}
}

function addCaja (x, y, z){
	//CAJAS
	let madera = new THREE.TextureLoader().load( 'assets/tex/puerta.png' );
	var cajaGeo = new THREE.BoxGeometry( 0.5, 0.5, 1.2 );
	var cajaMat = Physijs.createMaterial(new THREE.MeshLambertMaterial({ map: madera, color: 0x888888, transparent:true, opacity:1, wireframe:false }),.8,.3);
	caja = new Physijs.BoxMesh(cajaGeo,cajaMat, 1);
	caja.position.x += x;
	caja.position.y += y;
	caja.position.z += z;
	caja.__dirtyPosition = true;
	scene.add(caja);
	cajas.push(caja);
}

function render() {
	scene.simulate(); // run physics
	var time = performance.now() * 0.001;
	water.material.uniforms.time.value += 1.0 / 260.0;
  //requestAnimationFrame(render);
  renderer.render(scene, camera);
};

var loop = function(){
  requestAnimationFrame(loop);
  render();
};

loop();
