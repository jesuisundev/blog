// Vanilla JS part

// global variables needed to update event, audio, speed, rotation on the fly
let somniumAudio, oceansAudio, effectPass
let needRender = false

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

document.getElementById('launch').addEventListener('click', async event => entrypointExperience(event))
document.getElementById('callToAction').addEventListener('click', event => prepareLaunchHorizonEvent(event))

init()

async function init() {
    initAudio()
    window.onload = () => {
        document.getElementById('loading').remove()
        document.getElementById('launch').className = 'fadeIn'
    }
}

/**
 * iterate on all the audio and preload them using Howl
 */
function initAudio() {
    somniumAudio = new Howl({
        src: ['/audio/thesomnium.mp3']
    })
    oceansAudio = new Howl({
        src: ['/audio/oceans.mp3']
    })
}

/**
 * Entrypoint of the whole experience
 * Will be trigger by the click on "lauch experience"
 * 
 * @param {Object} event event of the click
 */
async function entrypointExperience(event) {
    event.preventDefault()

    document.getElementById('intro').className = 'fadeOut'
    setTimeout(() => document.getElementById('intro').remove(), 6000)

    somniumAudio.play()

    await introStoryEvent()
    await revealWormhole()
    await horizonAwakeningEvent()
    await revealCallToActionEvent()
}

async function introStoryEvent() {
    await fadeInWaitThenFadeOut('firstStory', 8000)
    await fadeInWaitThenFadeOut('secondStory', 7000)
    await fadeInWaitThenFadeOut('thirdStory', 5000)
}

async function fadeInWaitThenFadeOut(currentIdStory, time = 1000) {
    await new Promise(resolve => setTimeout(resolve, 4000))

    document.getElementById(currentIdStory).className = 'fadeIn'

    return await new Promise(resolve => {
        setTimeout(() => {
            document.getElementById(currentIdStory).className = 'fadeOut'
            resolve()
        }, time)
    })
}

async function revealWormhole() {
    return await new Promise(resolve => {
        setTimeout(() => {
            document.getElementById('base-space').className = 'background-container fadeOut'

            // start rendering the scene now that we need it!
            needRender = true

            document.getElementById('wormhole').className = 'fadeIn'
            resolve()
        }, 3000)
    })
}

async function horizonAwakeningEvent() {
    return await new Promise(resolve => {
        setTimeout(() => {
            const horizonGrowExposureCallToAction = new TWEEN.Tween(
                effectPass.effects[1].godRaysMaterial.uniforms.exposure
            ).to({ value: 4 }, 3000).easing(TWEEN.Easing.Cubic.In)

            const horizonReduceExposureCallToAction = new TWEEN.Tween(
                effectPass.effects[1].godRaysMaterial.uniforms.exposure
            ).to({ value: 0.8 }, 3000).easing(TWEEN.Easing.Cubic.Out)

            horizonGrowExposureCallToAction.start().chain(horizonReduceExposureCallToAction)
            resolve()
        }, 24000)
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

/**
 * Entrypoint of the second phase
 * Will be trigger by the click on the wormhole
 * 
 * @param {Object} event event of the click
 */
function prepareLaunchHorizonEvent(event) {
    event.preventDefault()

    document.getElementById('callToAction').className = 'fadeOut'

    somniumAudio.fade(1, 0, 1500)
    oceansAudio.volume(0)
    oceansAudio.play()
    oceansAudio.fade(0, 1, 5000)

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

    const hideDark = new TWEEN.Tween(darkCylinderMaterial)
        .to({ opacity: 0.1 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const hideColourFull = new TWEEN.Tween(colorFullCylinderMaterial)
        .to({ opacity: 0 }, timeToLaunch)
        .easing(easingHideAndSpeed)

    const hideWater = new TWEEN.Tween(waterCylinderMaterial)
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

    // launch first event at the same time
    firstPhaseEvent()

    // launch long exposure from horizon
    // because of the huge timeout this will be trigger after all the phase event
    horizonExposure.start().onComplete(() => enterParalelUniverse())
}

function firstPhaseEvent() {
    const showDark = new TWEEN.Tween(darkCylinderMaterial)
        .to({ opacity: 1 }, 500)
        .easing(TWEEN.Easing.Circular.Out)

    const showWater = new TWEEN.Tween(waterCylinderMaterial)
        .to({ opacity: 0.3 }, 500)
        .easing(TWEEN.Easing.Circular.Out)

    showWater.start()
    showDark.start().onComplete(() => secondPhaseEvent())
}

async function secondPhaseEvent() {
    await new Promise(resolve => setTimeout(resolve, 6000))

    const hideDark = new TWEEN.Tween(darkCylinderMaterial)
        .to({ opacity: 0 }, 3000)
        .easing(TWEEN.Easing.Circular.Out)

    hideDark.start().onComplete(() => thirdPhaseEvent())
}

async function thirdPhaseEvent() {
    const hideColourFull = new TWEEN.Tween(colorFullCylinderMaterial)
        .to({ opacity: 0 }, 2000)
        .easing(TWEEN.Easing.Circular.Out)

    const showLight = new TWEEN.Tween(lightCylinderMaterial)
        .to({ opacity: 0.6 }, 3000)
        .easing(TWEEN.Easing.Sinusoidal.In)

    const speedUpRotation = new TWEEN.Tween(globalRotation)
        .to({ value: 0.030 }, 3000)
        .easing(TWEEN.Easing.Sinusoidal.In)

    speedUpRotation.start()
    hideColourFull.start()
    showLight.start()
}

async function enterParalelUniverse() {
    scene.remove(waterCylinder)
    scene.remove(lightCylinder)
    scene.remove(light)

    const blueLight = new THREE.AmbientLight(0x000080, 1)
    scene.add(blueLight)

    await new Promise(resolve => setTimeout(resolve, 3000))

    document.getElementById('wormhole').className = 'fadeOut'

    await new Promise(resolve => setTimeout(resolve, 9000))

    scene.remove(horizon)
    horizonMaterial.opacity = 0
    document.getElementById('wormhole').className = 'fadeIn'

    await fadeInWaitThenFadeOut('fourthStory', 8000)
    showTeasingParalelUniverse()
}

async function showTeasingParalelUniverse() {
    globalRotation.value = 0.001
    textureRotationDark.value = -0.0004
    textureRotationColourFull.value = -0.0004
    moveForwardDark.value = 0.0004
    moveForwardColourFull.value = 0.0014

    const showDark = new TWEEN.Tween(darkCylinderMaterial)
        .to({ opacity: 1 }, 10000)
        .easing(TWEEN.Easing.Quadratic.In)

    const showColorFull = new TWEEN.Tween(colorFullCylinderMaterial)
        .to({ opacity: 1 }, 10000)
        .easing(TWEEN.Easing.Quadratic.In)

    showDark.start()
    showColorFull.start().onComplete(async() => showCredits())
}

async function showCredits() {
    await new Promise(resolve => {
        setTimeout(() => {
            document.getElementById('outro').style.zIndex = "9999"
            document.getElementById('outro').className = 'fadeIn'
            resolve()
        }, 4500)
    })
}

// THREE.js part
const scene = new THREE.Scene()
window.scene = scene

const renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", stencil: false, depth: false, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.domElement.id = 'wormhole'
renderer.domElement.className = 'fadeOut' //TO CHANGE -comment
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 0
camera.position.y = 10
camera.position.z = 0
camera.lookAt(0, 0, 0)

const commonCylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 20, 32, 3, true)

// dark space full of stars cylinder
const darkCylinderTexture = new THREE.TextureLoader().load('/images/dark.jpg')
darkCylinderTexture.wrapS = THREE.RepeatWrapping
darkCylinderTexture.wrapT = THREE.RepeatWrapping
darkCylinderTexture.repeat.set(1, 1)
const darkCylinderMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: darkCylinderTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityDark.value
})
const darkCylinder = new THREE.Mesh(commonCylinderGeometry, darkCylinderMaterial)

// colourfull space full of nebulas cylinder
const colorFullCylinderTexture = new THREE.TextureLoader().load('/images/colorfull.jpg')
colorFullCylinderTexture.wrapS = THREE.RepeatWrapping
colorFullCylinderTexture.wrapT = THREE.MirroredRepeatWrapping
colorFullCylinderTexture.repeat.set(1, 1)
const colorFullCylinderMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: colorFullCylinderTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityColorFull.value
})
const colorFullCylinder = new THREE.Mesh(commonCylinderGeometry, colorFullCylinderMaterial)

// water cylinder
const waterCylinderTexture = new THREE.TextureLoader().load('/images/water.jpg')
waterCylinderTexture.wrapS = THREE.RepeatWrapping
waterCylinderTexture.wrapT = THREE.MirroredRepeatWrapping
waterCylinderTexture.repeat.set(1, 1)
const waterCylinderMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: waterCylinderTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityWater.value
})
const waterCylinder = new THREE.Mesh(commonCylinderGeometry, waterCylinderMaterial)

// light cylinder
const lightCylinderTexture = new THREE.TextureLoader().load('/images/light.jpg')
lightCylinderTexture.wrapS = THREE.RepeatWrapping
lightCylinderTexture.wrapT = THREE.MirroredRepeatWrapping
lightCylinderTexture.repeat.set(1, 1)
const lightCylinderMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    needsUpdate: true,
    side: THREE.DoubleSide,
    map: lightCylinderTexture,
    blending: THREE.AdditiveBlending,
    opacity: opacityLight.value
})
const lightCylinder = new THREE.Mesh(commonCylinderGeometry, lightCylinderMaterial)

scene.add(darkCylinder)
scene.add(colorFullCylinder)
scene.add(waterCylinder)
scene.add(lightCylinder)
const light = new THREE.AmbientLight(0xFFFFFF, 1)
scene.add(light)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectMatrix()
})

// handling horizon => this will be highly animated by godrays effect at post processing
const horizonMaterial = new THREE.MeshBasicMaterial({ transparent: true, fog: true, opacity: 1 })
const horizonGeometry = new THREE.SphereBufferGeometry(0.25, 32, 32)
const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial)
horizon.frustumCulled = false
horizon.matrixAutoUpdate = false
scene.add(horizon)

// handling post processing process
// godrays, depth and bloom effects are added to the renderer
const godRaysEffectOptions = {
    height: 480,
    blendFunction: POSTPROCESSING.BlendFunction.ADD,
    color: 0x000000,
    kernelSize: POSTPROCESSING.KernelSize.SMALL,
    density: 1.2,
    decay: 0.92,
    weight: 1,
    exposure: 0.8,
    samples: 60,
    clampMax: 1.0
}
const godRaysEffect = new POSTPROCESSING.GodRaysEffect(camera, horizon, godRaysEffectOptions)
const depthEffect = new POSTPROCESSING.RealisticBokehEffect({ blendFunction: POSTPROCESSING.BlendFunction.ADD, focus: 2, maxBlur: 5, focalLength: 24 })
const bloomEffect = new POSTPROCESSING.BloomEffect({ blendFunction: POSTPROCESSING.BlendFunction.ADD, kernelSize: POSTPROCESSING.KernelSize.SMALL })
bloomEffect.blendMode.opacity.value = 4

// using a global variable because effects will be highly animated during the experience
effectPass = new POSTPROCESSING.EffectPass(camera, bloomEffect, depthEffect, godRaysEffect)
effectPass.renderToScreen = true

const composer = new POSTPROCESSING.EffectComposer(renderer)
composer.addPass(new POSTPROCESSING.RenderPass(scene, camera))
composer.addPass(effectPass)

function animate(time) {
    if (needRender) {
        TWEEN.update(time)

        darkCylinder.rotation.y += globalRotation.value
        darkCylinderTexture.offset.y -= moveForwardDark.value
        darkCylinderTexture.offset.x -= textureRotationDark.value

        colorFullCylinder.rotation.y += globalRotation.value
        colorFullCylinderTexture.offset.y -= moveForwardColourFull.value
        colorFullCylinderTexture.offset.x -= textureRotationColourFull.value

        waterCylinder.rotation.y += globalRotation.value
        waterCylinderTexture.offset.y -= moveForwardWater.value
        waterCylinderTexture.offset.x -= textureRotationWater.value

        lightCylinder.rotation.y += globalRotation.value
        lightCylinderTexture.offset.y -= moveForwardLight.value
        lightCylinderTexture.offset.x -= textureRotationLight.value

        composer.render()
    }
    requestAnimationFrame(animate)
}

animate()