//ALTO Y ANCHO DE LA VENTANA
var width = window.innerWidth;
var height = window.innerHeight;

//INICIALIZACION DEL RENDERER, DE TAMA;O DE LA VENTANA
var renderer = new THREE.WebGLRenderer({antialias:true,alpha: true,transparent : true});
renderer.setSize(width,height);
//AGREGAR A LA WP EL RENDERER
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

//SKYBOX (APRENDER A PONERLE TEXTURA)
let texture = new THREE.TextureLoader().load( 'assets/tex/cielo.jpg' );
let skyboxGeometry = new THREE.SphereGeometry( 70, 32, 32 );;
let skyboxMaterial = new THREE.MeshLambertMaterial({ map: texture, side: THREE.BackSide });
let skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

var grua = new THREE.Group();

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
//POSICION Y A DONDE VE
camera.position.y = 5;
camera.position.z = 15;

//AGREGAR LA CAMARA
scene.add(camera);

var ambient = new THREE.AmbientLight(0xFFFFFF, 1.0);
scene.add(ambient);

control = new THREE.OrbitControls(camera, renderer.domElement);

//HACEMOS LA BASE
var baseGe = new THREE.CubeGeometry(2, 0.5, 2);
var baseMa = new THREE.MeshPhongMaterial({ color: 0x3a3838 }); //COLOR
var base = new THREE.Mesh(baseGe, baseMa); //MESH CUBO CON SU MATERIAL
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

var p2Geo = new THREE.CylinderGeometry( 0.34, 0.34, 4, 32, 8 );
var p2Mat = new THREE.MeshPhongMaterial( {color: 0x3a3838} );
var p2 = new THREE.Mesh( p2Geo, p2Mat );
p2.position.y += 3;
p1.add( p2 );

var c1Geo = new THREE.SphereGeometry( 0.5, 32, 32 );
var c1Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var c1 = new THREE.Mesh( c1Geo, c1Mat );
c1.position.y += 2;
p2.add( c1 );

var p3Geo = new THREE.CylinderGeometry( 0.34, 0.34, 4, 32, 8 );
var p3Mat = new THREE.MeshPhongMaterial( {color: 0x3a3838} );
var p3 = new THREE.Mesh( p3Geo, p3Mat );
p3.position.y += 2;
c1.add( p3 )

var c2Geo = new THREE.SphereGeometry( 0.5, 32, 32 );
var c2Mat = new THREE.MeshPhongMaterial( {color: 0xf2f405} );
var c2 = new THREE.Mesh( c2Geo, c2Mat );
c2.position.y += 2;
p3.add( c2 );

grua.scale.set(0.5,0.5,0.5);
grua.position.y += 1.5;

scene.add(grua)

let loader2 = new THREE.ObjectLoader();
loader2.load(
	"assets/modelos/isla.json",
	function(object2){
		object2.scale.set(0.7,0.7,0.7);
		object2.position.y -=7;
		scene.add(object2);
		console.log("Isla");
	}
);

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
scene.add( directionalLight );

var light = new THREE.AmbientLight( 0x404040, 0.4 );
scene.add( light );


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

var loop = function(){
  requestAnimationFrame(loop);
  render();
};

loop();
