let somnium, oceans
let effectPass
let revealCallToAction

const globalRotation = { value: 0.001 }

const textureRotationDark = { value: 0.0006 }
const textureRotationColourFull = { value: 0.0006 }
const textureRotationWater = { value: 0.0040 }
const textureRotationLight = { value: 0.0006 }

const moveForwardDark = { value: 0.0006 }
const moveForwardColourFull = { value: 0.0016 }
const moveForwardWater = { value: 0.0056 }
const moveForwardLight = { value: 0.0056 }

const opacityDark = { value: 0.4 }
const opacityColorFull = { value: 0.4 }
const opacityWater = { value: 0 }
const opacityLight = { value: 0 }

preloadTextures()
preloadAudio()
const revealIntro = setTimeout(fadeInIntro, 3000)

/**
 * Iterate on all the texture and preload them 
 * using Image constructor.
 */
function preloadTextures() {
    const listTextures = ['/images/dark.jpg', '/images/light.jpg', '/images/colorfull.jpg', '/images/water.jpg']
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
    })
    oceans = new Howl({
        src: ['/audio/oceans.mp3']
    })
}
document.getElementById('launch').addEventListener('click', async event => entrypointExperience(event))

async function entrypointExperience(event) {
    event.preventDefault()

    document.getElementById('intro').className = 'fadeOut'
    const removeIntro = setTimeout(() => document.getElementById('intro').remove(), 6000)

    somnium.play()

    const revealWormhole = setTimeout(() => {
        document.getElementById('base-space').className = 'background-container fadeOut'
        document.getElementById('wormhole').className = 'fadeIn'
    }, 35000)

    await introStoryEvent()
    await horizonAwakeningEvent()
    await revealCallToActionEvent()
}

function init() {
    setTimeout(fadeInIntro, 3000)
}

function fadeInIntro() {
    document.getElementById('intro').className = 'fadeIn'
}

async function introStoryEvent() {
    await fadeInWaitThenFadeOut('firstStory', 8000)
    await fadeInWaitThenFadeOut('secondStory', 7000)
    await fadeInWaitThenFadeOut('thirdStory', 4000)
}

async function horizonAwakeningEvent() {
    return await new Promise(resolve => {
        setTimeout(() => {
            const horizonGrowExposureCallToAction = new TWEEN.Tween(
                effectPass.effects[1].godRaysMaterial.uniforms.exposure
            ).to({ value: 4 }, 3000).easing(TWEEN.Easing.Cubic.In);
            const horizonReduceExposureCallToAction = new TWEEN.Tween(
                effectPass.effects[1].godRaysMaterial.uniforms.exposure
            ).to({ value: 0.8 }, 3000).easing(TWEEN.Easing.Cubic.Out);
            horizonGrowExposureCallToAction.start().chain(horizonReduceExposureCallToAction);
            resolve()
        }, 28000)
    })
}

async function revealCallToActionEvent() {
    return await new Promise(resolve => {
        setTimeout(() => {
            document.getElementById("callToAction").style.display = "block"
            resolve()
        }, 3000)
    })
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

function prepareLaunchHorizonEvent(event) {
    event.preventDefault()

    document.getElementById('callToAction').className = 'fadeOut'

    somnium.fade(1, 0, 1500)
    oceans.volume(0)
    oceans.play()
    oceans.fade(0, 1, 5000)

    const timeToLaunch = 12500
    const easingHideAndSpeed = TWEEN.Easing.Quintic.In
    const easingRotation = TWEEN.Easing.Quintic.Out

    const slowingTextureRotationDark = new TWEEN.Tween(textureRotationDark)
        .to({ value: 0.0001 }, timeToLaunch)
        .easing(easingRotation)

    const slowingTextureRotationColourFull = new TWEEN.Tween(textureRotationColourFull)
        .to({ value: 0.0001 }, timeToLaunch)
        .easing(easingRotation)

    const slowingTextureRotationLight = new TWEEN.Tween(textureRotationLight)
        .to({ value: 0.0001 }, timeToLaunch)
        .easing(easingRotation)

    const slowingGlobalRotation = new TWEEN.Tween(globalRotation)
        .to({ value: 0 }, timeToLaunch)
        .easing(easingRotation)

    const shutDownBloomEffect = new TWEEN.Tween(bloomEffect.blendMode.opacity)
        .to({ value: 0 }, timeToLaunch)
        .easing(TWEEN.Easing.Elastic.Out)

    const hideDark = new TWEEN.Tween(material)
        .to({ opacity: 0.1 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const hideColourFull = new TWEEN.Tween(secondMaterial)
        .to({ opacity: 0 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const hideWater = new TWEEN.Tween(thirdMaterial)
        .to({ opacity: 0 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const slowingSpeedDark = new TWEEN.Tween(moveForwardDark)
        .to({ value: 0.0001 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const slowingSpeedColourFull = new TWEEN.Tween(moveForwardColourFull)
        .to({ value: 0.0001 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const slowingSpeedWater = new TWEEN.Tween(moveForwardWater)
        .to({ value: 0.0001 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    // leave space
    shutDownBloomEffect.start()
    hideColourFull.start()
    hideDark.start()
    hideWater.start()

    // slowing general rotation
    slowingTextureRotationDark.start()
    slowingTextureRotationColourFull.start()
    slowingTextureRotationLight.start()
    slowingGlobalRotation.start()

    // slowing general speed
    slowingSpeedDark.start()
    slowingSpeedColourFull.start()
    slowingSpeedWater.start().onComplete(() => launchHorizonEvent())
}

function launchHorizonEvent() {
    textureRotationDark.value = 0.0040
    const speedUpDark = new TWEEN.Tween(moveForwardDark)
        .to({ value: 0.0076 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)

    const speedUpWater = new TWEEN.Tween(moveForwardWater)
        .to({ value: 0.0136 }, 2000)
        .easing(TWEEN.Easing.Elastic.Out)

    const horizonExposure = new TWEEN.Tween(effectPass.effects[1].godRaysMaterial.uniforms.exposure)
        .to({ value: 45 }, 35000)
        .easing(TWEEN.Easing.Circular.In)

    // huge speed at launch
    speedUpDark.start()
    speedUpWater.start()

    // launch long exposure from horizon
    horizonExposure.start().onComplete(() => enterParalelUniverse())

    // launch first event at the same time
    firstPhaseEvent()
}

// first phase is dark + Water high speed
function firstPhaseEvent() {
    const showDark = new TWEEN.Tween(material)
        .to({ opacity: 1 }, 500)
        .easing(TWEEN.Easing.Circular.Out)

    const showWater = new TWEEN.Tween(thirdMaterial)
        .to({ opacity: 0.3 }, 500)
        .easing(TWEEN.Easing.Circular.Out)

    showWater.start()
    showDark.start().onComplete(() => secondPhaseEvent())
}

async function secondPhaseEvent() {
    await new Promise(resolve => setTimeout(resolve, 6000))

    const hideDark = new TWEEN.Tween(material)
        .to({ opacity: 0 }, 3000)
        .easing(TWEEN.Easing.Circular.Out)

    hideDark.start().onComplete(() => thirdPhaseEvent())
}

async function thirdPhaseEvent() {
    const hideWater = new TWEEN.Tween(secondMaterial)
        .to({ opacity: 0 }, 2000)
        .easing(TWEEN.Easing.Circular.Out)

    const showLight = new TWEEN.Tween(lightMaterial)
        .to({ opacity: 1 }, 3000)
        .easing(TWEEN.Easing.Sinusoidal.In)

    const speedUpRotation = new TWEEN.Tween(globalRotation)
        .to({ value: 0.030 }, 3000)
        .easing(TWEEN.Easing.Sinusoidal.In)

    speedUpRotation.start()
    hideWater.start()
    showLight.start()
}

async function fourthPhaseEvent() {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const speedUpRotation = new TWEEN.Tween(globalRotation)
        .to({ value: 0.060 }, 3000)
        .easing(TWEEN.Easing.Sinusoidal.In)

    speedUpRotation.start()
}

async function enterParalelUniverse() {
    scene.remove(cylinder)
    scene.remove(secondCylinder)
    scene.remove(thirdCylinder)
    scene.remove(lightCylinder)

    await new Promise(resolve => setTimeout(resolve, 3000))

    document.getElementById('wormhole').className = 'fadeOut'
    document.getElementById('base-space').className = 'background-container fadeIn'
}

// TEXT in black
// some theory suggest that wormhole are leading to parallel universe
// FADEIN SUR PLANET HEARTH
// FADE IN CREDITS
// FADE IN SHARE
// END OF CHAPTER 1

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false,
    alpha: true
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
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: texture,
    blending: THREE.AdditiveBlending,
    opacity: opacityDark.value
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
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: secondTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityColorFull.value
})
const secondCylinder = new THREE.Mesh(secondGeometry, secondMaterial)

// third cylinder
const thirdTexture = new THREE.TextureLoader().load('/images/water.jpg')
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
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: thirdTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityWater.value
})

const thirdCylinder = new THREE.Mesh(thirdGeometry, thirdMaterial)

// light cylinder
const lightTexture = new THREE.TextureLoader().load('/images/light.jpg')
lightTexture.wrapS = THREE.RepeatWrapping
lightTexture.wrapT = THREE.MirroredRepeatWrapping
lightTexture.repeat.set(1, 1)
const lightGeometry = new THREE.CylinderGeometry(
    cylinderRadiusTop,
    cylinderRadiusBottom,
    cylinderHeight,
    cylinderRadiusSegments,
    cylinderHeightSegments,
    cylinderOpenEnded
)
const lightMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: lightTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityLight.value
})
const lightCylinder = new THREE.Mesh(lightGeometry, lightMaterial)

scene.add(cylinder)
scene.add(secondCylinder)
scene.add(thirdCylinder)
scene.add(lightCylinder)

camera.position.x = 0
camera.position.y = 10
camera.position.z = 0
camera.lookAt(0, 0, 0)

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.domElement.id = 'wormhole'
    //TO CHANGE -comment
renderer.domElement.className = 'fadeOut'
document.body.appendChild(renderer.domElement)

const light = new THREE.AmbientLight(0xFFFFFF, 1)
scene.add(light)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectMatrix()
})

// horizon
const sunMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    fog: true,
    opacity: 1
});


const sunGeometry = new THREE.SphereBufferGeometry(0.25, 32, 32);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.frustumCulled = false;
sun.matrixAutoUpdate = false;
scene.add(sun)

document.getElementById('callToAction').addEventListener('click', event => prepareLaunchHorizonEvent(event))

const godRaysEffectOptions = {
    height: 480,
    blendFunction: POSTPROCESSING.BlendFunction.ADD,
    color: 0x000000,
    kernelSize: POSTPROCESSING.KernelSize.SMALL,
    density: 1.2,
    decay: 0.92,
    weight: 1,
    exposure: 0.8, // tweak this to make the final effect
    samples: 60,
    clampMax: 1.0
}

const godRaysEffect = new POSTPROCESSING.GodRaysEffect(camera, sun, godRaysEffectOptions);


const depthEffect = new POSTPROCESSING.RealisticBokehEffect({
    blendFunction: POSTPROCESSING.BlendFunction.ADD,
    focus: 2,
    maxBlur: 5,
    focalLength: 24
})

const bloomEffect = new POSTPROCESSING.BloomEffect({
    blendFunction: POSTPROCESSING.BlendFunction.ADD,
    kernelSize: POSTPROCESSING.KernelSize.SMALL
});

// tweak this for the bloom effect
bloomEffect.blendMode.opacity.value = 4;

// postprocessing effect pass instance
effectPass = new POSTPROCESSING.EffectPass(
    camera,
    bloomEffect,
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

function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)

    cylinder.rotation.y += globalRotation.value
    texture.offset.y -= moveForwardDark.value
    texture.offset.x -= textureRotationDark.value

    secondCylinder.rotation.y += globalRotation.value
    secondTexture.offset.y -= moveForwardColourFull.value
    secondTexture.offset.x -= textureRotationColourFull.value

    thirdCylinder.rotation.y += globalRotation.value
    thirdTexture.offset.y -= moveForwardWater.value
    thirdTexture.offset.x -= textureRotationWater.value

    lightCylinder.rotation.y += globalRotation.value
    lightTexture.offset.y -= moveForwardLight.value
    lightTexture.offset.x -= textureRotationLight.value

    composer.render()
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

var godRayGui = gui.addFolder('godRayGui')
const paramsGodRayGui = {
    'clampMax': effectPass.effects[1].godRaysMaterial.uniforms.clampMax.value,
    'decay': effectPass.effects[1].godRaysMaterial.uniforms.decay.value,
    'density': effectPass.effects[1].godRaysMaterial.uniforms.density.value,
    'exposure': effectPass.effects[1].godRaysMaterial.uniforms.exposure.value,
    'weight': effectPass.effects[1].godRaysMaterial.uniforms.weight.value
}
godRayGui.add(paramsGodRayGui, 'clampMax').onChange(() => {
    effectPass.effects[1].godRaysMaterial.uniforms.clampMax.value = paramsGodRayGui.clampMax
})
godRayGui.add(paramsGodRayGui, 'decay').onChange(() => {
    effectPass.effects[1].godRaysMaterial.uniforms.decay.value = paramsGodRayGui.decay
})
godRayGui.add(paramsGodRayGui, 'density').onChange(() => {
    effectPass.effects[1].godRaysMaterial.uniforms.density.value = paramsGodRayGui.density
})
godRayGui.add(paramsGodRayGui, 'exposure').onChange(() => {
    effectPass.effects[1].godRaysMaterial.uniforms.exposure.value = paramsGodRayGui.exposure
})
godRayGui.add(paramsGodRayGui, 'weight').onChange(() => {
    effectPass.effects[1].godRaysMaterial.uniforms.weight.value = paramsGodRayGui.weight
})
godRayGui.add(sunMaterial, 'opacity')

godRayGui.open()