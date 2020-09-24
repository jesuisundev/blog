let somnium

preloadTextures()
preloadAudio()
init()

/**
 * Iterate on all the texture and preload them 
 * using Image constructor.
 */
function preloadTextures() {
    const listTextures = ['/images/dark.jpg', '/images/colorfull.jpg', '/images/meteoritniy-dogd-nebo-meteoriti.jpg']
    const images = []

    for (let i = 0; i < listTextures.length; i++) {
        images[i] = new Image();
        images[i].src = listTextures[i];
    }
}

/**
 * Iterate on all the audio and preload them using Howl
 */
function preloadAudio() {
    somnium = new Howl({
        src: ['/audio/thesomnium.mp3']
    });
}
document.getElementById('launch').addEventListener('click', function(ev) {
    event.preventDefault()
    document.getElementById('intro').className = 'fadeOut'
    setTimeout(() => document.getElementById('intro').remove(), 6000)

    somnium.play()
    setTimeout(fadeInWormhole, 35000)
    launchStories()
});

function fadeInWormhole() {
    document.getElementById('wormhole').className = 'fadeIn'
}

function init() {
    setTimeout(fadeInIntro, 3000)
}

function fadeInIntro() {
    document.getElementById('intro').className = 'fadeIn'
}

async function launchStories() {
    console.log('launchStories')
    await fadeInWaitThenFadeOut('firstStory', 8000)
    await fadeInWaitThenFadeOut('secondStory', 7000)
    await fadeInWaitThenFadeOut('thirdStory', 4000)
}

async function fadeInWaitThenFadeOut(currentIdStory, time = 1000) {
    await new Promise(resolve => setTimeout(resolve, 4000))

    document.getElementById(currentIdStory).className = 'fadeIn'

    return await new Promise(resolve => {
        setTimeout(() => {
            console.log(currentIdStory)
            document.getElementById(currentIdStory).className = 'fadeOut'
            resolve()
        }, time)
    })
}

// SETTIMEOUT 28 secondes
// CLEAR TIMEOUT
// FADEIN SUN WITH FLASH


// WAIT FOR CLICK ON SUN
// FADE OUT THESOMMIUM
// FADE IN OCEANS

// SHAKING CAMERA
// MOVE CAMERA TO BOTTOM
// BACKGROUND TO WHITE SLOWLY THEN FAST
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false
})
const interaction = new THREE.Interaction(renderer, scene, camera);

let cylinderRadiusTop = 1
let cylinderRadiusBottom = 1
let cylinderHeight = 20
let cylinderRadiusSegments = 32
let cylinderHeightSegments = 3
let cylinderOpenEnded = true

const texture = new THREE.TextureLoader().load('/images/dark.jpg')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 1)
const geometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderRadiusSegments,
    cylinderHeightSegments,
    cylinderOpenEnded
)
const material = new THREE.MeshPhongMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    map: texture,
    blending: THREE.AdditiveBlending,
    opacity: 0.4
})
const cylinder = new THREE.Mesh(geometry, material)

// second cylinder
const secondTexture = new THREE.TextureLoader().load('/images/colorfull.jpg')
secondTexture.wrapS = THREE.RepeatWrapping
secondTexture.wrapT = THREE.MirroredRepeatWrapping
secondTexture.repeat.set(1, 1)
const secondGeometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderRadiusSegments,
    cylinderHeightSegments,
    cylinderOpenEnded
)
const secondMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    map: secondTexture,
    blending: THREE.AdditiveBlending,
    opacity: 0.4
})
const secondCylinder = new THREE.Mesh(secondGeometry, secondMaterial)

// third cylinder
const thirdTexture = new THREE.TextureLoader().load('/images/meteoritniy-dogd-nebo-meteoriti.jpg')
thirdTexture.wrapS = THREE.RepeatWrapping
thirdTexture.wrapT = THREE.MirroredRepeatWrapping
thirdTexture.repeat.set(1, 1)
const thirdGeometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderRadiusSegments,
    cylinderHeightSegments,
    cylinderOpenEnded
)
const thirdMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    map: thirdTexture,
    blending: THREE.AdditiveBlending,
    opacity: 0.1
})
const thirdCylinder = new THREE.Mesh(thirdGeometry, thirdMaterial)

scene.add(cylinder)
scene.add(secondCylinder)
scene.add(thirdCylinder)

camera.position.x = 0
camera.position.y = 10
camera.position.z = 0
camera.lookAt(0, 0, 0)

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.domElement.id = 'wormhole'
renderer.domElement.className = 'fadeOut'
document.body.appendChild(renderer.domElement)
const color = 0xFFFFFF
const intensity = 1
const light = new THREE.AmbientLight(color, intensity)
scene.add(light)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectMatrix()
})

// horizon
const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    fog: true
});

const sunGeometry = new THREE.SphereBufferGeometry(0.25, 32, 32);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.frustumCulled = false;
sun.matrixAutoUpdate = false;
scene.add(sun)
sun.cursor = 'pointer';
sun.on('click', function(ev) {
    alert('CLICK ON HORIZON')
});

const godRaysEffect = new POSTPROCESSING.GodRaysEffect(camera, sun, {
    height: 480,
    kernelSize: POSTPROCESSING.KernelSize.SMALL,
    density: 1.2,
    decay: 0.92,
    weight: 1,
    exposure: 0.8, // tweak this to make the final effect
    samples: 60,
    clampMax: 1.0
});

const vignetteEffect = new POSTPROCESSING.VignetteEffect({
    darkness: 0.5
})

const depthEffect = new POSTPROCESSING.RealisticBokehEffect({
    blendFunction: POSTPROCESSING.BlendFunction.ADD,
    focus: 2,
    maxBlur: 5
})

const bloomEffect = new POSTPROCESSING.BloomEffect({
    blendFunction: POSTPROCESSING.BlendFunction.ADD,
    kernelSize: POSTPROCESSING.KernelSize.SMALL
});

// tweak this for the bloom effect
bloomEffect.blendMode.opacity.value = 4;

// postprocessing effect pass instance
const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    bloomEffect,
    vignetteEffect,
    depthEffect,
    godRaysEffect
);

// enable effect pass
effectPass.renderToScreen = true;
const composer = new POSTPROCESSING.EffectComposer(renderer);
// postprocessing mandatory first render pass
composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
// postprocessing effect render pass
composer.addPass(effectPass);

//SOUND
var audiosomnium = new Audio('/audio/thesomnium.mp3');
//var audio = document.createElement("AUDIO")
//document.body.appendChild(audio);
//audio.src = "./audio/rain.m4a"
// document.body.addEventListener("click", function() {
//         audiosomnium.play()
//         fadeout()
//     })
// var vol = 0.20;
// var interval = 200; // 200ms interval


function animate() {
    requestAnimationFrame(animate)
    cylinder.rotation.y += 0.001
    texture.offset.y -= 0.0006 // move forward
    texture.offset.x -= 0.0006

    secondCylinder.rotation.y += 0.001
    secondTexture.offset.y -= 0.0016
    secondTexture.offset.x -= 0.0006

    thirdCylinder.rotation.y += 0.001
    thirdTexture.offset.y -= 0.0056
    thirdTexture.offset.x -= 0.0006
        // texture.offset.y %= 1
        // texture.needsUpdate = true
        // TODO => cant change geometry after its created
        // cylinder.geometry.parameters.radiusBottom += 1
    composer.render()
        //renderer.render(scene, camera)
        //renderer.render(scene, camera)
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