import './assets/styles/styles.scss'
import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.ce.vue'

const App = defineCustomElement(WeatherWidget)

customElements.define('weather-widget', App)
