import { getTextLayout, createWidget, widget } from '@zos/ui'

App({
  globalData: {},
  onCreate(options) {
    console.log('app on create invoke')
    // createWidget(widget.TEXT, {
    //   ...EQUIVALENT_MORE_FOOD_NUM,
    //   text: `AABBB`,
    // })
  },

  onDestroy(options) {
    console.log('app on destroy invoke')
  }
})