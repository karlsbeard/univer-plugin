import type { Plugin, PluginCtor } from '@univerjs/core'
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsHyperLinkUIPlugin } from '@univerjs/sheets-hyper-link-ui'
import { UniverSheetsSortUIPlugin } from '@univerjs/sheets-sort-ui'
import { UniverUniscriptPlugin } from '@univerjs/uniscript'
import { UniverWatermarkPlugin } from '@univerjs/watermark'

export default function getVeryLazyPlugins() {
  const plugins: Array<[PluginCtor<Plugin>] | [PluginCtor<Plugin>, unknown]> = [
    // TODO: validate the worker
    [UniverUniscriptPlugin, {
      getWorkerUrl(_: string, label: string) {
        if (label === 'json') {
          return '/vs/language/json/json.worker.js'
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return '/vs/language/css/css.worker.js'
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return '/vs/language/html/html.worker.js'
        }
        if (label === 'typescript' || label === 'javascript') {
          return '/vs/language/typescript/ts.worker.js'
        }
        return '/vs/editor/editor.worker.js'
      },
    }],
    [UniverSheetsHyperLinkUIPlugin],
    [UniverSheetsSortUIPlugin],
    [UniverSheetsCrosshairHighlightPlugin],
    [UniverSheetsFindReplacePlugin],
    [UniverWatermarkPlugin],
  ]

  return plugins
}
