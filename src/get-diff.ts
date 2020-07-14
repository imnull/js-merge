import { spawnSync } from 'child_process'
import { resolve as pathResolve } from 'path'
import { existsSync as fsExistsSync } from 'fs'

const diff = (a: string, b: string) => {
    const pwd = process.env.PWD
    const pathA = pathResolve(pwd, a)
    const pathB = pathResolve(pwd, b)
    if (!fsExistsSync(pathA) || !fsExistsSync(pathB)) {
        return ''
    }
    const { stderr, stdout } = spawnSync('diff', [
        '--ignore-blank-lines',
        // '-c',
        pathA, pathB
    ], { encoding: 'utf-8' })
    if(stderr) {
        // console.log('[get-diff] error:', stderr)
        throw stderr
    }
    return stdout
}

const code = diff('/Users/marvin/git/js-merge/node_modules/typescript/package.json', '/Users/marvin/git/js-merge/package.json')
console.log(code)

export default diff