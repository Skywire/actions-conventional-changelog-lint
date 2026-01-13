# Conventional changelog lint action

This action validates all of the commit messages in a pull request

## Inputs

### `token`

**Required** A newline separated file of the commit messages to check.

## Example usage

```yaml
name: Lint pull request commits
on: pull_request
jobs:
    commit_lint:
        runs-on: ubuntu-slim
        steps:
            - name: Lint PR commit messages
              uses: skywire/actions-conventional-changelog-lint@2.1.0
              with:
                  token: ${{ secrets.GITHUB_TOKEN }}
```
