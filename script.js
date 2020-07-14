
const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled // do the opposite of whatever the state is at the time of clicking the button

}

// Passing Joke to VoiceRSS API - combining the two APIs
function tellMe(joke) {
  // console.log('tell me:', joke)
  VoiceRSS.speech({
    key: '6d631927b0964489b664b894db406fd6',
    src: joke,
    hl: 'en-us',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  })
}

// Get jokes from the Joke API
async function getJokes() {
  let joke = '' // Initial state is an empty string
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data.joke)
    if (data.setup) {
      joke = `${data.setup} ... {${data.delivery}}` // If the joke has a setup and delivery (a 2 part joke), then show both the setup and delivery spaced apart with 3 dots
    } else {
      joke = data.joke // If there is no setup parameter, it must be a single joke so just show the joke
    }
    // console.log(joke)
    // Text-to-Speech
    tellMe(joke)
    // Disable button
    toggleButton()
  } catch (error) {
    // catch errors
    console.log('whoops', error)
  }
}

// getJokes()

// Event Listeners
button.addEventListener('click', getJokes) // This will stop the jokes playing on page load
audioElement.addEventListener('ended', toggleButton)