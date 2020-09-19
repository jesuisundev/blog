const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

const geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const material = new THREE.MeshBasicMaterial({ wireframe: true })
const cylinder = new THREE.Mesh(geometry, material)
var light = new THREE.PointLight(0xFFFF00);
light.position.set(0, 0, 0);
scene.add(light);


scene.add(cylinder)

camera.position.z = 0
camera.position.x = 0
camera.position.y = 15
camera.lookAt(0, 0, 0)

cylinder.flipSided = true
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight

    camera.updateProjectMatrix()
})

function animate() {
    requestAnimationFrame(animate)
    cylinder.rotation.y += 0.01;
    renderer.render(scene, camera)
}

animate()