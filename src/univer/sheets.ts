import { legacyLocales } from "~/utils/common";
import { LocaleType, Univer } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { UniverFindReplacePlugin } from '@univerjs/find-replace';
import type { IUniverRPCMainThreadConfig } from '@univerjs/rpc';
import { UniverRPCMainThreadPlugin } from '@univerjs/rpc';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor';
import { UniverUIPlugin } from '@univerjs/ui';
import type { IUniverUIConfig } from "@univerjs/ui/lib/types/ui-plugin";
import { UniverPluginSettings } from "~/types/setting";
import UniverWoker from './worker?worker'

const worker = new UniverWoker();

export function sheetInit(
  option: IUniverUIConfig,
  settings: UniverPluginSettings
) {
  const univer = new Univer({
    theme: defaultTheme,
    locale: settings.language === "EN" ? LocaleType.EN_US : LocaleType.ZH_CN,
    locales: legacyLocales,
  });

  univer.registerPlugin(UniverDocsPlugin, {
    hasScroll: false,
  });
  univer.registerPlugin(UniverRenderEnginePlugin);
  univer.registerPlugin(UniverUIPlugin, option);

  univer.registerPlugin(UniverDocsUIPlugin);

  univer.registerPlugin(UniverSheetsPlugin, {
    notExecuteFormula: true,
  });
  univer.registerPlugin(UniverSheetsUIPlugin);

  // sheet feature plugins
  univer.registerPlugin(UniverSheetsNumfmtPlugin);
  univer.registerPlugin(UniverSheetsZenEditorPlugin);
  univer.registerPlugin(UniverFormulaEnginePlugin, {
    notExecuteFormula: true,
  });
  univer.registerPlugin(UniverSheetsFormulaPlugin);
  univer.registerPlugin(UniverRPCMainThreadPlugin, {
    workerURL: worker,
} as IUniverRPCMainThreadConfig);

  // find replace
  univer.registerPlugin(UniverFindReplacePlugin);
  univer.registerPlugin(UniverSheetsFindReplacePlugin);

  return univer;
}
