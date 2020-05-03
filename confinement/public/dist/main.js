let expressionGifs = {};
const expressionSpots = {
  topRight: null,
  bottomRight: null,
  bottomLeft: null
};

const video = document.getElementById("video");
video.addEventListener("play", refreshState);

/**
 * Launch the whole process following thoses steps
 * - Preload models from faceapi
 * - Fetch the data JSON for the gifs
 * - Preload all the gifs
 * - Ask user for the video stream and setup the video
 * @async
 */
async function launch() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(
    "https://1rz6q.sse.codesandbox.io/dist/models"
  );
  await faceapi.nets.faceExpressionNet.loadFromUri(
    "https://1rz6q.sse.codesandbox.io/dist/models"
  );

  expressionGifs = await faceapi.fetchJson(
    "https://1rz6q.sse.codesandbox.io/dist/data/expressions.json"
  );

  preloadImages();
  setupVideo();
}

/**
 * Iterate on all the gifs fetched before and reload all the gifs
 * using Image constructor.
 */
function preloadImages() {
  let fullListOfGifs = [];
  const images = [];
  const expressionGifsKeys = Object.keys(expressionGifs);

  for (const expressionGifsKey of expressionGifsKeys) {
    fullListOfGifs = fullListOfGifs.concat(expressionGifs[expressionGifsKey]);
  }

  for (let i = 0; i < fullListOfGifs.length; i++) {
    images[i] = new Image();
    images[i].src = fullListOfGifs[i];
  }
}

/**
 * Setup the video stream for the user.
 * On success, the stream of the video is set to the source of the HTML5 video.
 * On error, the error is logged and the process continue.
 */
function setupVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => console.error("can't found your camera :(", err));
}

/**
 * Get the most likely current expression using the facepi detection object.
 * Build a array to iterate on each possibility and pick the most likely.
 * @param {Object} expressions object of expressions
 * @return {String}
 */
function getCurrentExpression(expressions) {
  const maxValue = Math.max(
    ...Object.values(expressions).filter(value => value <= 1)
  );
  const expressionsKeys = Object.keys(expressions);
  const mostLikely = expressionsKeys.filter(
    expression => expressions[expression] === maxValue
  );

  return mostLikely[0] ? mostLikely[0] : "Neutral";
}

/**
 * Set the backgound emotion gif on each div related to the current expression.
 * @param {String} expression current expression
 */
function spreadByExpression(expression) {
  const expressionSpotsKeys = Object.keys(expressionSpots);
  const randomGifsByExpression = getRandomGifsByExpression(expression);

  for (const expressionSpotKey of expressionSpotsKeys) {
    if (expressionSpots[expressionSpotKey] !== expression) {
      expressionSpots[expressionSpotKey] = expression;

      const randomGif = randomGifsByExpression.shift();
      document.getElementById(
        expressionSpotKey
      ).style.backgroundImage = `url('${randomGif}')`;
    }
  }
}

/**
 * Get three random gifs from the JSON data by related expression and return an array
 * @param {String} expression current expression
 * @return {Array}
 */
function getRandomGifsByExpression(expression) {
  const randomGifs = [];
  const poolOfGifs = JSON.parse(JSON.stringify(expressionGifs[expression]));

  for (let i = 0; i <= 2; i++) {
    const randomNumber = Math.floor(Math.random() * poolOfGifs.length);
    const randomGif = poolOfGifs.splice(randomNumber, 1);

    randomGifs.push(randomGif);
  }

  return randomGifs;
}

/**
 * Set an refresh interval where the faceapi will scan the face of the subject
 * and return an object of the most likely expressions.
 * Use this detection data to pick an expression and spread background gifs on divs.
 * @async
 */
async function refreshState() {
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections && detections[0] && detections[0].expressions) {
      spreadByExpression(getCurrentExpression(detections[0].expressions));
    }
  }, 500);
}

launch();
