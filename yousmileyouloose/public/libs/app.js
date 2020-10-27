document.getElementById('actualshit').addEventListener('click', event => setupFaceDetection(event))

const webcam = document.getElementById("webcam");
webcam.addEventListener("play", refreshState);

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

    await loadModels()
    setupWebcam()
}

/**
 * Load models from faceapi
 * @async
 */
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
        "https://192.168.5.39:8080/models"
    );
    await faceapi.nets.faceExpressionNet.loadFromUri(
        "https://192.168.5.39:8080/models"
    );
}

/**
 * Setup the webcam stream for the user.
 * On success, the stream of the webcam is set to the source of the HTML5 tag.
 * On error, the error is logged and the process continue.
 */
function setupWebcam() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
            webcam.srcObject = stream;
        })
        .catch(err => console.error("can't found your camera :(", err));
}

/**
 * Set an refresh interval where the faceapi will scan the face of the subject
 * and return an object of the most likely expressions.
 * Use this detection data to pick an expression and spread background gifs on divs.
 * @async
 */
async function refreshState() {
    setInterval(async() => {
        // const detections = await faceapi
        //     .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        //     .withFaceExpressions();

        // if (detections && detections[0] && detections[0].expressions) {
        //     spreadByExpression(getCurrentExpression(detections[0].expressions));
        // }
    }, 500);
}