const core = require('@actions/core');
const github = require('@actions/github');
let lint = require('@skywire-london/conventional-changelog-lint');

const payload = github.context.payload;
const token = core.getInput('token');
const octokit = github.getOctokit(token)

octokit.pulls.listCommits({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    pull_number: payload.pull_request.number,
}).then((response) => {
    let errors = [];

    response.data.forEach(function(commit) {

        let sha = commit.sha;
        let message = commit.commit.message.split("\n").shift();

        if (!lint.validateFormat(message)) {
            try {
                lint.lint(message);
            } catch (e) {
                let logMessage = `${sha}: ${message}: ${e.toString()}`;
                errors.push(logMessage);
                core.error(logMessage);
            }
        }
    });

    if(errors.length) {
        core.setFailed(`PR contains ${errors.length} invalid commit messages`);
    }

}).catch((error) => {
    core.error(error);
})