import diff from './get-diff'
import { readFileSync } from 'fs'

type TLineRange = [number, number]
type TDiffHead = { origin: TLineRange, distance: TLineRange, type: string, raw: string }

const parseDiffHead = (origin: string, type: string, distance: string): TDiffHead => {
    const [oa, ob = oa] = origin.split(',').map(n => parseInt(n))
    const [da, db = da] = distance.split(',').map(n => parseInt(n))
    return { origin: [oa, ob], type, distance: [da, db], raw: `${origin}${type}${distance}` }
}

const linesWithNo = (code: string) => code.split(/\n/).map((text, index) => ({ text, line: index + 1 }))

type TDiffLine = { text: string, no: number }
const HEAD_REG = /^(\d+(\,\d+)?)([a-z]+)(\d+(\,\d+)?)$/
const readDiff = (code: string) => {
    let origin: TDiffLine[] = [], distance: TDiffLine[] = [], head: TDiffHead
    const output: { head: TDiffHead, origin: TDiffLine[], distance: TDiffLine[] }[] = []
    code.split(/\n/).forEach(line => {
        if(HEAD_REG.test(line)) {
            head = parseDiffHead(RegExp.$1, RegExp.$3, RegExp.$4)
            origin = []
            distance = []
            output.push({ head, origin, distance })
        } else if(line.startsWith('< ')) {
            origin.push({ text: line.substring(2), no: origin.length + head.origin[0] })
        } else if(line.startsWith('> ')) {
            distance.push({ text: line.substring(2), no: distance.length + head.distance[0] })
        }
    })
    console.log(output[1])
}

const code = readFileSync('/Users/marvin/git/js-merge/node_modules/typescript/package.json', 'utf-8')
const log = readFileSync('/Users/marvin/git/js-merge/diff.log', 'utf-8')
// console.log(linesWithNo(code))

readDiff(log)