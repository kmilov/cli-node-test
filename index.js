#!/usr/bin/env node
const commander = require('commander')
const inquirer = require('inquirer')
const GithubApi = require('github')
const readline = require('readline')

const github = new GithubApi()
const rl = readline.createInterface({
  input: process.stdin
})

commander
  .version('0.0.1')
  .option('-r --repo <string>', 'Repo to red from')
  .option('-u --username <user>', 'Owner of the repo')
  .parse(process.argv)

const questions = [{
  type: 'input',
  name: 'repo',
  message: 'Which repository you want to read?',
}, {
  type: 'input',
  name:'username',
  message: 'Whats the owner of the repo'
}]

if(commander.repo && commander.username) {
  getRepoIssues(commander.username, commander.repo)
}
else {
  inquirer.prompt([questions])
  .then(answer => {
    if(!!answer.repo) {
      getRepoIssues(answer.repo)
    }
    else {
      console.error("Please give me a valid repo.")
      process.exit(1)
    }
  })
}

rl.on('line', (line)=>getRepoIssues('kmilo', line))

function getRepoIssues(username, repo) {
  github.authenticate({
    type: "token",
    token: "4cd0d6b1b7af6e54e9a8e9ec21f4a80fbf8ba540",
  });

  github.issues.getForRepo({
    user: username,
    repo: repo
  }).then((response) =>{
    console.log("issues ", response)
  })
}
