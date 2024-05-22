const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch').default;


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
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
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
