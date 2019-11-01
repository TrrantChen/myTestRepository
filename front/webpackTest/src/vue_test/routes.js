import Index from './page/index.vue';
import Page1 from './page/page1.vue';
import Page2 from './page/page2.vue';
import ImageTest from './page/ImageTest.vue';
import TestStore from './page/testStore';

const routes = [
    {path: '/', redirect: '/index'},
    {path: '/index', component: Index},
    {path: '/page1', component: Page1},
    {path: '/page2', component: Page2},
    {path: '/testStore', component: TestStore},
    {path: '/imageTest', component: ImageTest},
];

export default routes;
