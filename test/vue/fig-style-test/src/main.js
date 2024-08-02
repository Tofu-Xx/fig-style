import { createApp } from 'vue'
import App from './App.vue'
import { setAttrMap } from 'fig-style'
setAttrMap({
  ta:'text-align'
})

createApp(App).mount('body')
