import type { App } from 'vue';

import { setupStore } from "@/store";
import { setupRouter } from "@/router";

export default {
    install(app: App<Element>) {
        setupStore(app);
        setupRouter(app);
    }
}
