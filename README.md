# bumpp

[![NPM version](https://img.shields.io/npm/v/bumpp?color=a1b858&label=)](https://www.npmjs.com/package/bumpp)


Forked from [`version-bump-prompt`](https://github.com/JS-DevTools/version-bump-prompt)
Forked from [`bumpp`](https://github.com/antfu/bumpp)

###### Changes in this fork

- Change commit message to `🚧 chore(${readPackageSync().name}): release v`
- Change default tag to `${readPackageSync()}@${version}`
- Add a new command `prerun` to execute command just like `pnpm run test` before committing,Commands with `--` or `-` are not supported for now