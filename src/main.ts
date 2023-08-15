import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.vue'

const App = defineCustomElement(WeatherWidget)

customElements.define('weather-widget', App)
