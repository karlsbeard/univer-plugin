import type { UniverPluginSettings } from '@/types/setting'
import type { IUniverUIConfig } from '@univerjs/ui'
import { getLanguage, univerLocales } from '@/utils/common'
import { Univer, UserManagerService } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsConditionalFormattingPlugin } from '@univerjs/sheets-conditional-formatting'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsFormulaUIPlugin } from '@univerjs/sheets-formula-ui'
import { UniverSheetsHyperLinkPlugin } from '@univerjs/sheets-hyper-link'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsSortPlugin } from '@univerjs/sheets-sort'
import { UniverSheetsThreadCommentPlugin } from '@univerjs/sheets-thread-comment'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { IThreadCommentMentionDataService, UniverThreadCommentUIPlugin } from '@univerjs/thread-comment-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import { CustomMentionDataService, mockUser } from '../customMentionDataService'

const LOAD_LAZY_PLUGINS_TIMEOUT = 1_000
const LOAD_VERY_LAZY_PLUGINS_TIMEOUT = 3_000

export function sheetInit(option: IUniverUIConfig, settings: UniverPluginSettings) {
  const univer = new Univer({
    theme: defaultTheme,
    locale: getLanguage(settings),
    locales: univerLocales,
  })
  // register the univer core engine
  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverUIPlugin, option)
  // sheets based on doc
  univer.registerPlugin(UniverDocsPlugin)
  univer.registerPlugin(UniverDocsUIPlugin)
  // register the sheets, if no webworker, then set notExecuteFormula to false
  univer.registerPlugin(UniverSheetsPlugin, { notExecuteFormula: false })
  univer.registerPlugin(UniverSheetsUIPlugin)
  //
  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  // zen model
  univer.registerPlugin(UniverSheetsZenEditorPlugin)
  // formula
  univer.registerPlugin(UniverFormulaEnginePlugin, { notExecuteFormula: false })
  univer.registerPlugin(UniverSheetsFormulaPlugin, { notExecuteFormula: false })
  univer.registerPlugin(UniverSheetsFormulaUIPlugin)
  // data validation
  univer.registerPlugin(UniverSheetsDataValidationPlugin)
  // sheets condition
  univer.registerPlugin(UniverSheetsConditionalFormattingPlugin)
  // filter
  univer.registerPlugin(UniverSheetsFilterPlugin)
  // sort
  univer.registerPlugin(UniverSheetsSortPlugin)
  // hyper link
  univer.registerPlugin(UniverSheetsHyperLinkPlugin)
  // comment
  univer.registerPlugin(UniverThreadCommentUIPlugin, {
    overrides: [[IThreadCommentMentionDataService, { useClass: CustomMentionDataService }]],
  })
  univer.registerPlugin(UniverSheetsThreadCommentPlugin)

  const injector = univer.__getInjector()
  const userManagerService = injector.get(UserManagerService)
  userManagerService.setCurrentUser(mockUser)

  setTimeout(() => {
    import('./lazy').then((lazy) => {
      const plugins = lazy.default()
      plugins.forEach(p => univer.registerPlugin(p[0], p[1]))
    })
  }, LOAD_LAZY_PLUGINS_TIMEOUT)

  setTimeout(() => {
    import('./very-lazy').then((lazy) => {
      const plugins = lazy.default()
      plugins.forEach(p => univer.registerPlugin(p[0], p[1]))
    })
  }, LOAD_VERY_LAZY_PLUGINS_TIMEOUT)

  return univer
}
