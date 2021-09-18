const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: false, stencil: false, depth: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 0)
renderer.domElement.id = 'wormhole'

document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.set(0, 10, 0)
camera.lookAt(0, 0, 0)

let wormhole = {
    CameraPositionIndex: 0,
    speed: 1500
}

function animate() {
    updatePositionInWormhole()
    requestAnimationFrame(animate)
}

function generateWormhole () {
    wormhole.shape = new THREE.Curves.TorusKnot(500)

    const wireframedStarsSpeederMaterial = new THREE.MeshBasicMaterial({
      map: null,
      transparent: false,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      wireframe: true
    })
    const wormholeGeometry = new THREE.TubeGeometry(wormhole.shape, 800, 5, 12, true)
    const wormholeTubeMesh = THREE.SceneUtils.createMultiMaterialObject(wormholeGeometry, [
      wireframedStarsSpeederMaterial
    ])

    scene.add(wormholeTubeMesh)
}

//   async animate () {
//     this.wormholeTimeline = gsap.timeline()

//     // initial massive boost at wormhole enter
//     this.wormholeTimeline
//       .to(this.starsSpeederMaterial, { duration: 7, opacity: 1 }, 0)
//       .to(this.wireframedStarsSpeederMaterial, { duration: 7, ease: 'expo.out', opacity: 1 }, 0)
//       .to(this.auraSpeederMaterial, { duration: 7, ease: 'expo.out', opacity: 1 }, 0)
//       .to(window.wormhole, { duration: 7, ease: 'expo.out', speed: 2500 }, 0)

//     // adding speed and noises
//     this.wormholeTimeline
//       .to(this.clusterSpeederMaterial, { duration: 6, opacity: 1 }, 7)
//       .to(this.auraSpeederMaterial, { duration: 2, opacity: 0 }, 7)
//       .to(window.wormhole, { duration: 6, speed: 2000 }, 7)

//     // adding speed and nebula distorded
//     this.wormholeTimeline
//       .to(this.nebulaSpeederMaterial, { duration: 6, opacity: 1 }, 13)
//       .to(this.clusterSpeederMaterial, { duration: 6, opacity: 0 }, 13)
//       .to(this.auraSpeederMaterial, { duration: 6, opacity: 0.7 }, 13)
//       .to(window.wormhole, { duration: 6, speed: 1800 }, 13)

//     if (!window.isMobileOrTabletFlag) {
//       window.controls.velocity.x = 0
//       window.controls.velocity.z = 0
//     }

//     return this.wormholeTimeline.then(() => true)
//   }

function updatePositionInWormhole () {
    wormhole.CameraPositionIndex++

    if (wormhole.CameraPositionIndex > wormhole.speed) {
        wormhole.CameraPositionIndex = 0
    }

    const wormholeCameraPosition = wormhole.shape.getPoint(wormhole.CameraPositionIndex / wormhole.speed)
    const wormholeCameraRotation = wormhole.shape.getTangent(wormhole.CameraPositionIndex / wormhole.speed)

    camera.position.x = wormholeCameraPosition.x
    camera.position.y = wormholeCameraPosition.y
    camera.position.z = wormholeCameraPosition.z

    camera.rotation.x = wormholeCameraRotation.x
    camera.rotation.y = wormholeCameraRotation.y
    camera.rotation.z = wormholeCameraRotation.z

    camera.lookAt(wormhole.shape.getPoint((wormhole.CameraPositionIndex + 1) / wormhole.speed))

    renderer.render(scene, camera)
}

generateWormhole()
animate()