const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  // `who-to-greet` input defined in action metadata file
  const URL = core.getInput('URL');
  const browser = core.getInput('browser');
  const iterations = core.getInput('iterations');
  const time = (new Date()).toTimeString();
  const url = 'https://performance.haijin666.top/create_job';
  const data = {
    parameters: [URL, "-b", browser, "-n", iterations]
  };
  
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}