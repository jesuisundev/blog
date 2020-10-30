let isFirstRound = true
let currentSmileStatus = false

document.getElementById('actualshit').addEventListener('click', event => setupFaceDetection(event))

// initiate webcam
const webcam = document.getElementById("webcam")
webcam.addEventListener("play", refreshState)

// initiate youtube player and api
let player
const tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"
const firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

/**
 * Launch the whole process following thoses steps
 * - Load models from faceapi
 * - Ask user for the video stream and setup the video
 *
 * @async
 * @param {Object} event event of the click
 */
async function setupFaceDetection(event) {
    event.preventDefault()

    document.getElementById('home').remove()
    document.getElementById("smileStatus").style.display = "block"

    await loadModels()
    setupWebcam()
    setupYoutubePlayer()
}

/**
 * Load models from faceapi
 * @async
 */
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("https://192.168.5.40:8080/models")
    await faceapi.nets.faceExpressionNet.loadFromUri("https://192.168.5.40:8080/models")
}

/**
 * Setup the webcam stream for the user.
 * On success, the stream of the webcam is set to the source of the HTML5 tag.
 * On error, the error is logged and the process continue.
 */
function setupWebcam() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => { webcam.srcObject = stream })
        .catch(() => document.getElementById("smileStatus").textContent = "camera not found")
}

function setupYoutubePlayer() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'G7RgN9ijwE4',
        playerVars: {
            'controls': 0,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'iv_load_policy': 3,
            'disablekb': 1
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    })
}

/**
 * Set an refresh interval where the faceapi will scan the face of the subject
 * and return an object of the most likely expressions.
 * Use this detection data to pick an expression and spread background gifs on divs.
 * @async
 */
async function refreshState() {
    setInterval(async() => {
        const detections = await faceapi
            .detectAllFaces(webcam, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()

        if (detections && detections[0] && detections[0].expressions) {
            if (isFirstRound) startFirstRound()

            if (isSmiling(detections[0].expressions)) {
                currentSmileStatus = true
                document.getElementById("smileStatus").textContent = "YOU SMILE !"
            } else {
                document.getElementById("smileStatus").textContent = "not smiling"
            }
        }
    }, 200)
}

function startFirstRound() {
    isFirstRound = false
    currentSmileStatus = false

    document.getElementById("loading").remove()
    document.getElementById('intermission').className = 'fadeOut'
    player.playVideo()
}

function onPlayerStateChange(event) {
    // if the video is finished
    if (event.data === 0) {
        showIntermission()
    }
}

function showIntermission() {
    if (currentSmileStatus) {
        document.getElementById('resultSmileStatus').textContent = "You SMILED during the video ! YOU LOOSE !"
    } else {
        document.getElementById('resultSmileStatus').textContent = "You didn't smile during the video ! YOU WIN !"
    }

    document.getElementById('intermission').className = 'fadeIn'
}

/**
 * Determine if the user is smiling or not by getting the most likely current expression 
 * using the facepi detection object. Build a array to iterate on each possibility and 
 * pick the most likely.
 * @param {Object} expressions object of expressions
 * @return {Boolean}
 */
function isSmiling(expressions) {
    // filtering false positive
    const maxValue = Math.max(
        ...Object.values(expressions).filter(value => value <= 1)
    )

    const expressionsKeys = Object.keys(expressions)
    const mostLikely = expressionsKeys.filter(
        expression => expressions[expression] === maxValue
    )

    if (mostLikely[0] && mostLikely[0] == 'happy')
        return true

    return false
}