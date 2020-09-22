// TODO

// PARTICLE
// SHAKING CAMERA
// MOVE CAMERA TO BOTTOM
// BACKGROUND TO WHITE SLOWLY THEN FAST

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

scene.fog = new THREE.FogExp2(0xe4dcff, 0.05)

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
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture })
const cylinder = new THREE.Mesh(geometry, material)


scene.add(cylinder)

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