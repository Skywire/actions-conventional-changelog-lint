const core = require('@actions/core');
let lint = require('@skywire-london/conventional-changelog-lint');

const commit_log = core.getInput('namespaces');
console.log(commit_log);
let contents = fs.readFileSync(commit_log, 'utf8');
let commits = contents.split("\n")
console.log(commits);


