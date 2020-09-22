// TODO

// POST PROCESS EFFECT
// BLUR/BLOOM SECOND CYLINDER
// DEPTH OF FIELD FIRST CYLINDER
// SHAKING CAMERA
// MOVE CAMERA TO BOTTOM
// GOD-RAYS FROM 0 TO 1 opacitu with max density
// BACKGROUND TO WHITE SLOWLY THEN FAST

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

let clock = new THREE.Clock();
let cylinderRadiusTop = 1
let cylinderRadiusBottom = 1
let cylinderHeight = 20
let cylinderRadiusSegments = 32
let cylinderHeightSegments = 3
let cylinderOpenEnded = true

const texture = new THREE.TextureLoader().load("/images/dark.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);
const geometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderRadiusSegments,
    cylinderHeightSegments,
    cylinderOpenEnded
)
const material = new THREE.MeshPhongMaterial({ transparent: true, side: THREE.DoubleSide, map: texture, blending: THREE.AdditiveBlending })
const cylinder = new THREE.Mesh(geometry, material)


// second cylinder
const secondTexture = new THREE.TextureLoader().load("/images/colorfull.jpg");
secondTexture.wrapS = THREE.RepeatWrapping;
secondTexture.wrapT = THREE.RepeatWrapping;
secondTexture.repeat.set(1, 1);
const secondGeometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderRadiusSegments,
    cylinderHeightSegments,
    cylinderOpenEnded
)
const secondMaterial = new THREE.MeshPhongMaterial({ transparent: true, side: THREE.DoubleSide, map: secondTexture, blending: THREE.AdditiveBlending, opacity: 0.4 })
const secondCylinder = new THREE.Mesh(secondGeometry, secondMaterial)


scene.add(cylinder)
scene.add(secondCylinder)

camera.position.x = 0
camera.position.y = 10
camera.position.z = 0
camera.lookAt(0, 0, 0)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
const color = 0xFFFFFF
const intensity = 1
const light = new THREE.AmbientLight(color, intensity)
scene.add(light)


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight

    //camera.updateProjectMatrix()
})

function animate() {
    requestAnimationFrame(animate)
    cylinder.rotation.y += 0.001
    texture.offset.y -= 0.0008;
    texture.offset.x -= 0.0008;

    secondCylinder.rotation.y += 0.001
    secondTexture.offset.y -= 0.0018;
    secondTexture.offset.x -= 0.0008;
    //texture.offset.y %= 1;
    //texture.needsUpdate = true;
    // TODO => cant change geometry after its created
    //cylinder.geometry.parameters.radiusBottom += 1
    renderer.render(scene, camera)
}
window.scene = scene
animate()

// dat gui
var gui = new dat.GUI()
var cameraGui = gui.addFolder('camera position')
cameraGui.add(camera.position, 'x')
cameraGui.add(camera.position, 'y')
cameraGui.add(camera.position, 'z')
cameraGui.open()

var cameraGui = gui.addFolder('camera projection')
cameraGui.add(camera, 'fov')
cameraGui.open()

var lightGui = gui.addFolder('light position')
lightGui.add(light.position, 'x')
lightGui.add(light.position, 'y')
lightGui.add(light.position, 'z')
lightGui.open()

var cylinderGui = gui.addFolder('cylinder')

cylinderGui.add(cylinder.position, 'x')
cylinderGui.add(cylinder.position, 'y')
cylinderGui.add(cylinder.position, 'z')
cylinderGui.open()