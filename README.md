# Conventional changelog lint action

This action validates all of the commit messages in a pull request

## Inputs

### `commit_log`

**Required** A newline separated file of the commit messages to check.

The commit log can be generated with:

```yaml
steps:
    - id: generate_log  
    - run: |
        curl -o out.json \
            --header 'authorization: Bearer ${{ secrets.GITHUB_TOKEN }}' \
            ${{ github.event.pull_request.commits_url }}
    
        cat out.json | jq '.[] .commit .message' > commits.txt
```

## Example usage

```yaml
-   name: Lint PR commit messages 
    uses: skywire/actions-conventional-changelog-lint@master
    with:
        commit_log: commits.txt
```