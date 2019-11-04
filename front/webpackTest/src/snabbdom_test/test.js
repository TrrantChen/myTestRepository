const snabbdom = require('snabbdom');
const patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
const h = require('snabbdom/h').default; // helper function for creating vnodes
//
let container = document.querySelector('#test_container');

let vnode = h(
    'div#container.two.classes',
    {
        on: {
            click: () => { alert('test') }
        }
    },
    [
        h(
            'span',
            {
                style: {
                    fontWeight: 'bold'
                }
            },
            'This is bold'
        ),
        ' and this is just normal text',
        h(
            'a',
            {
                props: {
                    href: '/foo'
                }
            },
            'I\'ll take you places!'
        )
    ]
);

// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

let newVnode = h(
    'div#container.two.classes',
    {
        on: {
                click: () => { alert('another');
            }
        }
    },
    [
        h(
            'span',
            {
                style: {
                    fontWeight: 'normal',
                    fontStyle: 'italic'
                }
            },
            'This is now italic type'
        ),
        ' and this is still just normal text',
        h(
            'a',
            {
                props: {
                    href: '/bar'
                }
            },
            'I\'ll take you places!'
        )
    ]
);

// Second `patch` invocation
patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state

// to unmount from the DOM and clean up, simply pass null
// patch(newVnode, null);

