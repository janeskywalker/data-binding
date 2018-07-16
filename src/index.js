// This function needs to find all data-bind elements and keep them up-to-date with data as it is set
export function createStore(storeName) {
    const elementList = Array.from(document.querySelectorAll('[data-bind]'));

    // Saves elements by key name
    const elementsByName = {};
    // Saves watch functions by key name
    const functionsByName = {};

    // Filter out ones that don't belong to this store name
    elementList.forEach((next) => {
        // get values of all the attribute data-binding
        const binding = next.getAttribute('data-bind');
        const [nameKey, valueKey] = binding.split('.');

        if (storeName === nameKey) {
            // Have we encountered this value before -- no need to add key microsoft twice, same value
            if (elementsByName[valueKey] === undefined) {
                // assign value as a key, and the set the value of the key as an array
                elementsByName[valueKey] = [];
            }

            // push the element into the value array
            elementsByName[valueKey].push(next);

            if (next.tagName === 'INPUT') {
                next.addEventListener('input', (evt) => {
                    _set(valueKey, evt.target.value);
                });
            }
        }
    });

    // 2. Store data in an object
    const data = {};

    function _set(key, value) {
        // check if data has changed
        if (data[key] !== value) {
            data[key] = value;
            //console.log(`elements for ${key}: `, elementsByName[key])

            if (elementsByName[key] !== undefined) {
                elementsByName[key].forEach((next) => {
                    // render the view
                    next.innerText = value;
                });
            }

            // when set is called, value is changed, set up function watch to watch the value changing
            // check if the function is saved/defined in the object -- bacause only the function what is saved in the funcitonsByName will run, meaning a wather is set up to that key
            // if (typeof watchers[key] === 'function')

            if (functionsByName[key] !== undefined) {
                // if it is, call the function, passing key value as an argument. You don't call function watch, you call the funciton that user set and you saved in the objects.
                functionsByName[key].forEach((next) => {
                    next(value);
                });
            }
        }
    }

    return {
        // This function needs to set the value in the data store and update any view data-bind values.
        set(key, value) {
            _set(key, value);
        },

        get(key) {
            return data[key];
        },

        watch(key, fn) {
            if (functionsByName[key] === undefined) {
                functionsByName[key] = [];
            }

            functionsByName[key].push(fn);
        },
    };
}
