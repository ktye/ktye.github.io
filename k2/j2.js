let nestedObject = {
  name: 'Thomas Shelby',
  age: 39,
  address: {
    city: 'Birmingham',
    country: 'England'
  },
  dieHardFan:{
    name:''
},
};

// Recursive function to create nested proxies and handle set operations
const createProxy = (obj, onSet) => {
    return new Proxy(obj, {
        set(target, key, value) { console.log("set",target,key,value);
            const updated = Reflect.set(target, key, value); // Update the property

            if (updated) {
                onSet(key, value); // Call the callback to indicate a set operation
            }

            return updated; // Indicate success
        },
        get(target, key) { console.log("get",target,key);
            const value = Reflect.get(target, key); // Get the property value

            if (typeof value === 'object' && value !== null) {
                // If the property value is an object, create a nested proxy for it
                return createProxy(value, onSet);
            }

            return value;
        }
    });
};

const onSet=(key,value)=>{
  console.log(`Setting this value "${value}" to this key "${key}"`);
}

const proxiedObj = createProxy(nestedObject, onSet); 
//proxiedObj.dieHardFan.name='Praveen';
