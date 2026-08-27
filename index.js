const core = require("@actions/core");
const github = require("@actions/github");
const lint = require("@skywire-london/conventional-changelog-lint");

const payload = github.context.payload;
const token = core.getInput("token");
const octokit = github.getOctokit(token);

octokit.pulls
	.listCommits({
		owner: payload.repository.owner.login,
		repo: payload.repository.name,
		pull_number: payload.pull_request.number,
	})
	.then((response) => {
		const errors = [];

		response.data.forEach((commit) => {
			const sha = commit.sha;
			const message = commit.commit.message.split("\n").shift();

			if (message.startsWith("Merge pull request")) {
				return;
			}

			if (!lint.validateFormat(message)) {
				try {
					lint.lint(message);
				} catch (e) {
					const logMessage = `${sha}: ${message}: ${e.toString()}`;
					errors.push(logMessage);
					core.error(logMessage);
				}
			}
		});

		if (errors.length) {
			core.setFailed(`PR contains ${errors.length} invalid commit messages`);
		}
	})
	.catch((error) => {
		core.error(error);
	});
