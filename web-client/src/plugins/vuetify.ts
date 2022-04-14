import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#FFC411",
        secondary: "#5584AC",
        accent: "#444444",
        error: "#FF1818",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#E8630A",
      },
    },
  },
});
