import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.ce.vue'
import './styles/styles.scss'

const App = defineCustomElement(WeatherWidget)

customElements.define('weather-widget', App)
